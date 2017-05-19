'use strict';

/**
 * 搜索
 * @author 黄奕海
 * @date 20170222
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/search/index.js">
 </script>
 */
define('conf/search/index.js', function (require, exports, module) {
    var $ = require('$'),
        ajax = require('utils/async/ajax.js'),
        slayer = require('mods/search/layer.js'),
        Vue = require("vue"),
        UI = require('UI/dialog/alert.js'),
        BP = require('mods/buried_point.js'),
        laz = require('utils/async/lazyload.js'),
        cookie = require('mods/storage/cookie.js');
    var dropload = void 0;
    require('mods/filters/com');
    require('vendors/dropload.js');
    //laz.init();
    BP.init({
        dom: '#sList',
        pdPos: "",
        pType: "3"
    }); //商品list曝光
    Vue.component("listmore", {
        props: {
            items: {
                type: Array,
                default: function _default() {
                    return [];
                }
            }
        },
        template: "#searchList"
    });
    var sVue = new Vue({
        el: '#s_result',
        data: {
            keyword: keyword,
            input: $('#s_layer_input'),
            listData: [],
            num: 2,
            nav_type: 0,
            sort_type: "",
            sort_criteria: 0,
            filter_id: "",
            no_result: 0, //0  有结果 1 筛选无结果
            scrollTop: 0
        },
        computed: {
            /*sortCriteria: function () {
                return this.sort_type === "" ? 0 : 1;
            }*/
        },
        init: function init() {
            var self = this;
            dropload = $("#s_result").dropload({
                scrollArea: window,
                domDown: {
                    domClass: 'dropload-down',
                    domRefresh: '<div class="dropload-refresh"><img src="' + wapcsspath + '/images/common/loading.png" alt=""/></div>',
                    domUpdate: '<div class="dropload-update"><img src="' + wapcsspath + '/images/common/loading.png" alt=""/></div>',
                    domLoad: '<div class="dropload-load"><img src="' + wapcsspath + '/images/common/loading.gif" alt=""/></div>'
                },
                loadDownFn: function loadDownFn(me) {
                    var str = "";
                    if (self.filter_id !== "") {
                        str = "&categoryId=" + self.filter_id + "";
                    }
                    if (self.sort_type !== "") {
                        str += "&sort=" + self.sort_type;
                    }
                    var keyword = self.keyword.length > 200 ? self.keyword.substr(0, 200) : self.keyword;
                    ajax.query({
                        url: "/api/ext/item/searchItems?keyword=" + keyword + "&pageNum=" + self.num++ + "&sortCriteria=" + self.sort_criteria + str + "&pageSize=10",
                        success: function success(data) {
                            setTimeout(function () {
                                me.resetload();
                            }, 300);
                            if (data.code === 200) {
                                if (!data.data.items.length) {
                                    UI.alertSecond("Data is loaded");
                                    return;
                                }
                                self.listData = self.listData.concat(data.data.items);
                                laz.lazyload();
                            } else {
                                UI.alertSecond(data.message);
                            }
                        }
                    });
                }
            });
            if ($('#null').length > 0) {
                dropload.lock();
            }
        },
        methods: {
            click_input_focus: function click_input_focus() {
                slayer.keyword = this.keyword;
                slayer.show_text_del = 1;
                slayer.scTop = $('body').scrollTop();
                $("#s_result").hide();
                $('#s_layer').show().find("input").focus();
                this.nav_type = 0;
            },
            click_nav: function click_nav(type) {
                if (this.nav_type === type) {
                    this.click_close_filter();
                    return;
                }
                this.nav_type = type;
                this.scrollTop = $('body').scrollTop();
            },
            click_sort: function click_sort(sort, type) {
                if (type !== "") {
                    if (this.sort_criteria === sort && this.sort_type === type) {
                        this.click_close_filter();
                        return;
                    }
                } else {
                    if (this.sort_criteria === sort) {
                        this.click_close_filter();
                        return;
                    }
                }
                this.sort_type = type;
                this.sort_criteria = sort;
                this.getItem();
                this.click_close_filter();
            },
            click_filter: function click_filter(id, target) {
                var dom = $(target.currentTarget);
                this.filter_id = id;
                dom.addClass("active").siblings().removeClass("active");
                this.getItem(id);
                this.click_close_filter();
            },
            getItem: function getItem(id) {
                var sort = this.sort_type,
                    str = "",
                    self = this;
                if (self.filter_id) {
                    str = "&categoryId=" + self.filter_id + "";
                }
                if (self.sort_type !== "") {
                    str += "&sort=" + self.sort_type;
                }
                var keyword = self.keyword.length > 200 ? self.keyword.substr(1, 200) : self.keyword;
                ajax.query({
                    url: "/api/ext/item/searchItems?keyword=" + keyword + "&pageNum=1&sortCriteria=" + self.sort_criteria + str + "&pageSize=10",
                    success: function success(data) {
                        if (data.code === 200) {
                            var _str = "";
                            if (data.data && data.data.items && data.data.items.length > 0) {
                                var items = data.data.items;
                                for (var i = 0, len = items.length; i < len; i++) {
                                    var item = items[i].item;
                                    _str += '<li class="goods-item" point-data="{ext:\'' + items[i].ext + '\',type:\'' + items[i].type + '\',id:\'' + items[i].id + '\'}">\n                                       <a href="/pro/detail?id=' + item.id + '&pdtype=6">\n                                           <span class="goods-item-pic">\n                                                <img gome-src="' + imgbed(item.mainImage, '180') + '" src="' + wapcsspath + '/images/default_product.png" alt="<%= item.name %>">\n                                           </span>\n                                           <div class="goods-item-cont">\n                                                <h4 class="goods-item-title">' + item.name + '</h4>\n                                               <p class="goods-item-money">';
                                    if (item.sellingPrice) {
                                        _str += '<strong class="current-money">' + item.sellingPrice.alternative + '. ' + Math.round(item.sellingPrice.amount / 100) + '</strong>';
                                    }
                                    if (item.originPrice && item.originPrice.amount !== item.sellingPrice.amount) {
                                        _str += '<del class="before-money">' + item.originPrice.alternative + '. ' + Math.round(item.originPrice.amount / 100) + '</del>';
                                    }
                                    if (item.discountPercentage > 0) {
                                        _str += '<span class="save-money">' + item.discountPercentage + '% Off</span></p>';
                                    }
                                    if (item.expectedCashBack.amount > 100) {
                                        _str += '<div class="rebate">\n                                                <em class="icon-tag"></em>\n                                                <p class="rebate-para">Upto ' + item.expectedCashBack.alternative + '. ' + Math.round(item.expectedCashBack.amount / 100) + ' Cashback</p>\n                                            </div>';
                                    }
                                    if (item.source.url) {
                                        _str += '<div class="from">\n                                                <img gome-src="' + item.source.url + '" src="' + wapcsspath + '/images/common/default-prolist.png" alt="' + item.source.name + '" >\n                                            </div>';
                                    }
                                    _str += ('<a class="btn-buy" href="' + buy(item.outerUrl) + '"></a>\n                                            </div>\n                                        </a>\n                                    </li>').trim();
                                }
                            } else {
                                _str = '<div class=\'null\'><img src=\'' + wapcsspath + '/images/search/no_result.png\' alt=\'\'/><p>Sorry, no results</p><p class=\'col9\'>Please change the filter conditions</p></div>';
                                $('#s_sort').hide();
                            }
                            $('#good-list').html(_str);
                            self.num = 2;
                            self.listData = [];
                            $("body").scrollTop(0);
                            laz.lazyload();
                            BP.init({
                                dom: '#sList',
                                pdPos: "",
                                pType: "3",
                                num: 0
                            }); //商品list曝光
                        } else {
                            UI.alertSecond(data.message);
                        }
                    }
                });
            },
            click_close_filter: function click_close_filter() {
                var _this = this;

                this.nav_type = 0;
                setTimeout(function () {
                    $('body').scrollTop(_this.scrollTop);
                }, 50);
            }
        }
    });
    sVue.$watch('nav_type', function (newVal) {
        if (newVal === 0) {
            $('body,html').removeClass('over');
            dropload.unlock();
        } else {
            $('body,html').addClass('over');
            dropload.lock();
        }
    });
    function buy(outerUrl, name) {
        var search = /\?/.test(outerUrl),
            third = cookie.getCookie('third_layer'); //arr[0] userId  arr[1] cookie
        if (userId != "0") {
            if (third === "") {
                return "/pro/third?name=" + name + "&loc=" + encodeURIComponent(outerUrl + (search ? "&" : "?") + "affExtParam1=" + userId);
            } else {
                return outerUrl + (search ? "&" : "?") + "affExtParam1=" + userId;
            }
        }
        return "/login?redirect=" + encodeURIComponent("/pro/third?name=" + name + "&loc=" + outerUrl + (search ? "&" : "?")) + "&type=buy";
    }
    function imgbed(url, size) {
        if (typeof url === 'string' && /\.(jpg|png|gif)$/i.test(url)) {
            var res = url.match(/(.*)(\.(jpg|png|gif))/);
            return res && Array.isArray(res) ? res[0] + (size ? '.' + size : '') + res[2] : url;
        } else {
            return url;
        }
    }
    function getParams(url) {
        //获取url传递的参数*/
        var obj = {};
        url = url || location.search;
        url = /^\?.*/i.test(url) ? url.substr(1) : url;
        var arr = url.split("&");
        for (var i = 0, l = arr.length; i < l; i++) {
            var res = arr[i].split("=");
            obj[res[0]] = res[1];
        }
        return obj;
    }
});
//# sourceMappingURL=../../../maps/conf/search/index.js.map
