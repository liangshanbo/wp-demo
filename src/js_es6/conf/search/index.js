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
    const $ = require('$'),
        ajax = require('utils/async/ajax.js'),
        slayer = require('mods/search/layer.js'),
        Vue = require("vue"),
        UI = require('UI/dialog/alert.js'),
        BP =  require('mods/buried_point.js'),
        laz = require('utils/async/lazyload.js'),
        cookie = require('mods/storage/cookie.js');
    let dropload;
    require('mods/filters/com');
    require('vendors/dropload.js');
    //laz.init();
    BP.init({
        dom:'#sList',
        pdPos:"",
        pType:"3"
    });//商品list曝光
    Vue.component("listmore", {
        props: {
            items: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        template: "#searchList"
    });
    const sVue = new Vue({
        el: '#s_result',
        data: {
            keyword: keyword,
            input: $('#s_layer_input'),
            listData: [],
            num: 2,
            nav_type: 0,
            sort_type: "",
            sort_criteria:0,
            filter_id: "",
            no_result: 0,  //0  有结果 1 筛选无结果
            scrollTop: 0
        },
        computed: {
            /*sortCriteria: function () {
                return this.sort_type === "" ? 0 : 1;
            }*/
        },
        init: function () {
            let self = this;
            dropload = $("#s_result").dropload({
                scrollArea: window,
                domDown: {
                    domClass: 'dropload-down',
                    domRefresh: '<div class="dropload-refresh"><img src="' + wapcsspath + '/images/common/loading.png" alt=""/></div>',
                    domUpdate: '<div class="dropload-update"><img src="' + wapcsspath + '/images/common/loading.png" alt=""/></div>',
                    domLoad: '<div class="dropload-load"><img src="' + wapcsspath + '/images/common/loading.gif" alt=""/></div>'
                },
                loadDownFn: function (me) {
                    let str = "";
                    if (self.filter_id !== "") {
                        str = "&categoryId=" + self.filter_id + "";
                    }
                    if (self.sort_type !== "") {
                        str += "&sort=" + self.sort_type;
                    }
                    let keyword = self.keyword.length>200?self.keyword.substr(0,200):self.keyword;
                    ajax.query({
                        url: "/api/ext/item/searchItems?keyword=" + keyword + "&pageNum=" + (self.num++) + "&sortCriteria=" + self.sort_criteria + str+"&pageSize=10",
                        success: function (data) {
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
            click_input_focus: function () {
                slayer.keyword = this.keyword;
                slayer.show_text_del = 1;
                slayer.scTop = $('body').scrollTop();
                $("#s_result").hide();
                $('#s_layer').show().find("input").focus();
                this.nav_type = 0;
            },
            click_nav: function (type) {
                if(this.nav_type === type){
                    this.click_close_filter();
                    return ;
                }
                this.nav_type = type;
                this.scrollTop = $('body').scrollTop();
            },
            click_sort: function (sort,type) {
                if(type!==""){
                    if(this.sort_criteria === sort && this.sort_type === type){
                        this.click_close_filter();
                        return ;
                    }
                }else{
                    if(this.sort_criteria === sort){
                        this.click_close_filter();
                        return ;
                    }
                }
                this.sort_type = type;
                this.sort_criteria = sort;
                this.getItem();
                this.click_close_filter();
            },
            click_filter: function (id, target) {
                let dom = $(target.currentTarget);
                this.filter_id = id;
                dom.addClass("active").siblings().removeClass("active");
                this.getItem(id);
                this.click_close_filter();
            },
            getItem: function (id) {
                let sort = this.sort_type,
                    str = "",
                    self = this;
                if (self.filter_id) {
                    str = "&categoryId=" + self.filter_id + "";
                }
                if (self.sort_type !== "") {
                    str += "&sort=" + self.sort_type;
                }
                let keyword = self.keyword.length>200?self.keyword.substr(1,200):self.keyword;
                ajax.query({
                    url: "/api/ext/item/searchItems?keyword=" + keyword + "&pageNum=1&sortCriteria=" + self.sort_criteria + str+"&pageSize=10",
                    success: function (data) {
                        if (data.code === 200) {
                            let str = "";
                            if (data.data && data.data.items && data.data.items.length > 0) {
                                let items = data.data.items;
                                for (let i = 0, len = items.length; i < len; i++) {
                                    var item = items[i].item;
                                    str += `<li class="goods-item" point-data="{ext:'${items[i].ext}',type:'${items[i].type}',id:'${items[i].id}'}">
                                       <a href="/pro/detail?id=${item.id}&pdtype=6">
                                           <span class="goods-item-pic">
                                                <img gome-src="${imgbed(item.mainImage,'180')}" src="${wapcsspath}/images/default_product.png" alt="<%= item.name %>">
                                           </span>
                                           <div class="goods-item-cont">
                                                <h4 class="goods-item-title">${item.name}</h4>
                                               <p class="goods-item-money">`;
                                    if (item.sellingPrice) {
                                        str += `<strong class="current-money">${item.sellingPrice.alternative}. ${Math.round(item.sellingPrice.amount / 100)}</strong>`
                                    }
                                    if (item.originPrice && item.originPrice.amount !== item.sellingPrice.amount) {
                                        str += `<del class="before-money">${item.originPrice.alternative}. ${Math.round(item.originPrice.amount / 100)}</del>`
                                    }
                                    if(item.discountPercentage>0){
                                        str += `<span class="save-money">${item.discountPercentage}% Off</span></p>`;
                                    }
                                    if (item.expectedCashBack.amount > 100) {
                                        str += `<div class="rebate">
                                                <em class="icon-tag"></em>
                                                <p class="rebate-para">Upto ${item.expectedCashBack.alternative}. ${Math.round(item.expectedCashBack.amount / 100)} Cashback</p>
                                            </div>`
                                    }
                                    if(item.source.url){
                                        str += `<div class="from">
                                                <img gome-src="${item.source.url}" src="${wapcsspath}/images/common/default-prolist.png" alt="${item.source.name}" >
                                            </div>`
                                    }
                                    str += `<a class="btn-buy" href="${buy(item.outerUrl)}"></a>
                                            </div>
                                        </a>
                                    </li>`.trim();
                                }
                            } else {
                                str = `<div class='null'><img src='${wapcsspath}/images/search/no_result.png' alt=''/><p>Sorry, no results</p><p class='col9'>Please change the filter conditions</p></div>`
                                $('#s_sort').hide();
                            }
                            $('#good-list').html(str);
                            self.num = 2;
                            self.listData = [];
                            $("body").scrollTop(0);
                            laz.lazyload();
                            BP.init({
                                dom:'#sList',
                                pdPos:"",
                                pType:"3",
                                num:0
                            });//商品list曝光
                        } else {
                            UI.alertSecond(data.message);
                        }
                    }
                });
            },
            click_close_filter: function () {
                this.nav_type = 0;
                setTimeout(()=> {
                    $('body').scrollTop(this.scrollTop);
                }, 50)
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
    function buy(outerUrl,name) {
        var search = /\?/.test(outerUrl),
            third = cookie.getCookie('third_layer');//arr[0] userId  arr[1] cookie
        if (userId != "0") {
            if (third === "") {
                return "/pro/third?name=" + name + "&loc=" + encodeURIComponent(outerUrl + (search ? "&" : "?") + "affExtParam1=" + userId);
            } else {
                return outerUrl + (search ? "&" : "?") + "affExtParam1=" + userId;
            }
        }
        return "/login?redirect=" + encodeURIComponent("/pro/third?name=" + name + "&loc=" + outerUrl + (search ? "&" : "?")) + "&type=buy";
    }
    function imgbed(url,size){
        if(typeof url === 'string' && (/\.(jpg|png|gif)$/i).test(url)){
            var res = url.match(/(.*)(\.(jpg|png|gif))/);
            return res && Array.isArray(res) ? (res[0] + (size ? ('.' +  size) : '') + res[2]) : url;
        }else{
            return url;
        }
    }
    function getParams(url) { //获取url传递的参数*/
        let obj = {};
        url = url || location.search;
        url = /^\?.*/i.test(url) ? url.substr(1) : url;
        let arr = url.split("&");
        for (let i = 0, l = arr.length; i < l; i++) {
            let res = arr[i].split("=");
            obj[res[0]] = res[1]
        }
        return obj;
    }
});
