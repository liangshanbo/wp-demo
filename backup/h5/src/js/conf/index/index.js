"use strict";

/**
 * title: 商品列表页
 * author: wangchunpeng
 * time: 2017-02-20
 */
define('conf/index/index.js', function (require, exports, module) {
    require("$");
    var Ajax = require("utils/async/ajax"),
        Vue = require("vue"),
        UI = require('UI/dialog/alert.js'),
        searchLayer = require('mods/search/layer'),
        laz = require('utils/async/lazyload.js'),
        Swiper = require('mods/swiper'),
        dlApp = require("utils/dlApp"),
        appCall = require("utils/appCall"),
        getParams = require("mods/getParams"),
        BP = require('mods/buried_point.js');
    // touchSlide = require('vendors/TouchSlide');
    require('mods/filters/com');
    require('vendors/dropload.js');
    //Vue.config.debug=true;
    /**
     * title: 判断是否需要打开app
     * desc: 短信分享的链接需要直接打开app（2017.04.24 wangchunpeng）
     */
    var params = getParams();
    var mine = $(".search-mine");
    var login = $(".search-login"),
        navH = parseFloat($('.nav').height()),
        headerCate = $('#headerCate'),
        downLoadH = parseFloat($('#download').height());
    mine.on("click", function () {
        //埋点

        ga('send', 'event', 'login/sign', 'home_me_click');
    });
    login.on("click", function () {
        //埋点

        ga('send', 'event', 'login/sign', 'home_login_click');
    });
    if (params["type"] == "callapp") {
        appCall.callApp({
            url: "/main/mainOpen?tab=MALL"
        });
    }
    Vue.component("listmore", {
        props: {
            items: {
                type: Array,
                default: function _default() {
                    return [];
                }
            }
        },
        template: "#prolist_tpl"
    });
    var pageNum = 2;
    new Vue({
        el: "body",
        data: {
            moreData: []
        },
        init: function init() {
            //推荐gdy
            new Swiper('.hot', {
                pagination: '.pagination',
                paginationClickable: true,
                slidesPerView: 'auto'
            });

            //banner gdy
            if ($('#swiper-banner').children('.carousel-it').length > 1) {
                new Swiper('.carousel', {
                    loop: true,
                    // 如果需要分页器
                    lazyLoading: true, //解决轮播到最后再划显示默认图
                    pagination: '.swiper-pagination'

                });
            }
            if ($('body').scrollTop() > downLoadH + navH - 10) {
                headerCate.show();
            } else {
                headerCate.hide();
            }
            BP.init({
                dom: "#goodsList",
                pdPos: "0",
                pType: "0"
            }); //商品list曝光
            var self = this;
            if ($('#goodsList').children('li').length > 0) {
                $("#goodsList").dropload({
                    scrollArea: window,
                    domDown: {
                        domClass: 'dropload-down',
                        domRefresh: '<div class="dropload-refresh"><img src="' + wapcsspath + '/images/common/loading.png" alt=""/></div>',
                        domUpdate: '<div class="dropload-update"><img src="' + wapcsspath + '/images/common/loading.png" alt=""/></div>',
                        domLoad: '<div class="dropload-load"><img src="' + wapcsspath + '/images/common/loading.gif" alt=""/></div>'
                    },
                    loadDownFn: function loadDownFn(me) {
                        Ajax.query({
                            url: "/api/ext/recommendation/items?pageType=AaP0001&pageModule=AaP0001M0003&pageNum=" + pageNum++ + "&pageSize=10",
                            success: function success(data) {
                                setTimeout(function () {
                                    me.resetload();
                                }, 300);
                                if (data.code === 200) {
                                    if (!data.data.items.length) {
                                        UI.alertSecond("Data is loaded");
                                        return;
                                    }
                                    self.moreData = self.moreData.concat(data.data.items);
                                    laz.lazyload();
                                } else {
                                    UI.alertSecond(data.message);
                                }
                            }
                        });
                    }
                });
            }
        },
        methods: {
            click_show_slayer: function click_show_slayer() {
                searchLayer.layer_show();
            },
            click_close_down: function click_close_down() {
                $('#download').hide();
            },
            click_down: function click_down(e) {
                var target = e.target || e.srcElement,
                    $target = $(target);
                if ($target.hasClass("download-btn")) {
                    $('#download').hide();
                    return;
                }
                dlApp.dl();
            }
        }
    });
    $(window).on('scroll', function () {
        var scTop = $('body').scrollTop();
        downLoadH = parseFloat($('#download').height());
        if (scTop > downLoadH + navH - 10) {
            headerCate.show();
        } else {
            headerCate.hide();
        }
    });
});
//# sourceMappingURL=../../../maps/conf/index/index.js.map
