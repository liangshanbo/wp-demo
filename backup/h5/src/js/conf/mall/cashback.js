'use strict';

/**
 * mall列表 超级返利
 * @author huangyihai
 * @date 20170216
 * 页面引用 入口在首页
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/mall/super.js">
 </script>
 */
define('conf/mall/cashback.js', function (require, exports, module) {
    var $ = require('$'),
        ajax = require('utils/async/ajax.js'),
        Vue = require("vue"),
        UI = require('UI/dialog/alert.js'),
        BP = require('mods/buried_point.js'),
        laz = require('utils/async/lazyload.js'),
        cookie = require('mods/storage/cookie.js');
    var dropload = void 0,
        supList = $('#supList'),
        menuMore = $('#menu_more'),
        menu = $('#menu'),
        CateName = $('#CateName');
    require('mods/filters/com');
    require('vendors/dropload.js');
    Vue.component("listmore", {
        props: {
            items: {
                type: Array,
                default: function _default() {
                    return [];
                }
            }
        },
        template: "#template"
    });
    var sVue = new Vue({
        el: "#s_result",
        data: {
            type: 0, //0超级返利 1折扣专区
            num: 2,
            cateId: cateId,
            listData: [],
            isMore: 0, //0 不显示 1显示
            scTop: 0,
            cacheData: {},
            noMore: 0, //1没有更多了
            pType: "6",
            dom: '#supList'
        },
        created: function created() {
            var self = this;
            BP.init({
                dom: self.dom,
                pdPos: "",
                pType: self.pType
            }); //商品list曝光
        },
        init: function init() {
            var self = this;
            dropload = $("#supList").dropload({
                scrollArea: window,
                domDown: {
                    domClass: 'dropload-down',
                    domRefresh: '<div class="dropload-refresh"><img src="' + wapcsspath + '/images/common/loading.png" alt=""/></div>',
                    domUpdate: '<div class="dropload-update"><img src="' + wapcsspath + '/images/common/loading.png" alt=""/></div>',
                    domLoad: '<div class="dropload-load"><img src="' + wapcsspath + '/images/common/loading.gif" alt=""/></div>'
                },
                loadDownFn: function loadDownFn(me) {
                    var str = self.type === 0 ? '/cashbackItems' : '/discountItems';
                    ajax.query({
                        url: '/api/ext/item' + str + '?pageSize=10&pageNum=' + self.num + '&categoryId=' + self.cateId,
                        success: function success(data) {
                            setTimeout(function () {
                                me.resetload();
                            }, 300);
                            if (data.code === 200) {
                                if (!data.data.items.length) {
                                    UI.alertSecond("Data is loaded");
                                    return;
                                }
                                if (data.data.items.length < 10) {
                                    self.noMore = 1;
                                    dropload.lock();
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
            click_more_cate: function click_more_cate() {
                this.scTop = $('body').scrollTop();
                this.close_layer("1");
            },
            click_hide_more: function click_hide_more() {
                var _this = this;

                this.close_layer("");
                setTimeout(function () {
                    $('body').scrollTop(_this.scTop);
                }, 50);
            },
            close_layer: function close_layer(type) {
                if (type !== "") {
                    supList.hide();
                    this.isMore = 1;
                    menuMore.hide();
                    menu.show();
                    return;
                }
                this.isMore = 0;
                menu.hide();
                menuMore.show();
                supList.show();
                $('body').scrollTop(0);
            },
            click_render_cate: function click_render_cate(obj) {
                var _this2 = this;

                var self = this;
                setTimeout(function () {
                    _this2.close_layer("");
                }, 50);
                if (self.cateId === obj.id) {
                    return;
                }
                self.cateId = parseInt(obj.id);
                CateName.html(obj.name);
                if (self.cacheData[obj.id]) {
                    self.render(self.cacheData[obj.id]);
                    return;
                }
                var str = self.type === 0 ? '/cashbackItems' : '/discountItems';
                ajax.query({
                    url: '/api/ext/item' + str + '?pageSize=10&pageNum=1&categoryId=' + self.cateId,
                    success: function success(data) {
                        if (data.code === 200) {
                            if (data.data && data.data.items && data.data.items.length > 0) {
                                var items = data.data.items;
                                self.cacheData[obj.id] = items;
                                self.render(items);
                            } else {
                                self.render([]);
                            }
                        } else {
                            UI.alertSecond(data.message);
                        }
                    }
                });
            },
            render: function render(items) {
                var str = "",
                    self = this;
                if (items.length > 0) {
                    for (var i = 0, len = items.length; i < len; i++) {
                        var item = items[i].item;
                        str += '<li class="goods-item" point-data="{ext:\'' + items[i].ext + '\',type:\'' + items[i].type + '\',id:\'' + items[i].id + '\'}">\n                                       <a href="/pro/detail?id=' + item.id + '&pdtype=6">\n                                           <span class="goods-item-pic">\n                                                <img gome-src="' + imgbed(item.mainImage, '180') + '" src="' + wapcsspath + '/images/default_product.png" alt="<%= item.name %>">\n                                           </span>\n                                           <div class="goods-item-cont">\n                                                <h4 class="goods-item-title">' + item.name + '</h4>\n                                               <p class="goods-item-money">';
                        if (item.sellingPrice) {
                            str += '<strong class="current-money">' + item.sellingPrice.alternative + '. ' + Math.round(item.sellingPrice.amount / 100) + '</strong>';
                        }
                        if (item.originPrice && item.originPrice.amount !== item.sellingPrice.amount) {
                            str += '<del class="before-money">' + item.originPrice.alternative + '. ' + Math.round(item.originPrice.amount / 100) + '</del>';
                        }
                        if (item.discountPercentage > 0) {
                            str += '<span class="save-money">' + item.discountPercentage + '% Off</span></p>';
                        }
                        if (item.expectedCashBack.amount > 100) {
                            str += '<div class="rebate">\n                                            <em class="icon-tag"></em>\n                                            <p class="rebate-para">Upto ' + item.expectedCashBack.alternative + '. ' + Math.round(item.expectedCashBack.amount / 100) + ' Cashback</p>\n                                        </div>';
                        }
                        if (item.source.url) {
                            str += '<div class="from">\n                                            <img gome-src="' + item.source.url + '" src="' + wapcsspath + '/images/common/default-prolist.png" alt="' + item.source.name + '" >\n                                        </div>';
                        }
                        str += ('<a class="btn-buy" href="' + buy(item.outerUrl, item.name) + '"></a>\n                                        </div>\n                                    </a>\n                                    </li>').trim();
                    }
                } else {
                    str = '<div class=\'null\'><img src=\'' + wapcsspath + '/images/search/no_result.png\' alt=\'\'/><p>Sorry, no results</p><p class=\'col9\'>Please change the filter conditions</p></div>';
                    //$('#s_sort').hide();
                }
                $('#good-list').html(str);
                if (items.length < 10) {
                    dropload.lock();
                } else {
                    dropload.unlock();
                }
                self.num = 2;
                self.listData = [];
                $("body").scrollTop(0);
                laz.lazyload();
                BP.init({
                    dom: self.dom,
                    pdPos: "",
                    pType: self.pType,
                    num: 0
                }); //商品list曝光
            }
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

    module.exports = sVue;
});
//# sourceMappingURL=../../../maps/conf/mall/cashback.js.map
