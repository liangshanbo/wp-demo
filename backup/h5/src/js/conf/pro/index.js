"use strict";

/**
 * title: 商品列表页
 * author: wangchunpeng
 * time: 2017-02-20 
 */
define('conf/home/index.js', function (require, exports, module) {
    require("$");
    var Ajax = require("utils/async/ajax"),
        Vue = require("vue"),
        UI = require('UI/dialog/alert.js'),
        searchLayer = require('mods/search/layer'),
        laz = require('utils/async/lazyload.js');
    // touchSlide = require('vendors/TouchSlide');
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
        template: "#prolist_tpl"
    });
    var pageNum = 2;
    new Vue({
        el: "body",
        data: {
            moreData: []
        },
        init: function init() {
            var self = this;
            $("body").dropload({
                scrollArea: window,
                domDown: {
                    domClass: 'dropload-down',
                    domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
                    domUpdate: '<div class="dropload-update">↓释放加载</div>',
                    domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
                },
                loadDownFn: function loadDownFn(me) {
                    Ajax.query({
                        url: "/api/ext/recommendation/items?pageType=AaP0001&pageModule=AaP0001M0003&pageNum=" + pageNum++,
                        success: function success(data) {
                            setTimeout(function () {
                                me.resetload();
                            }, 300);
                            if (data.code === 200) {
                                if (!data.data.items.length) {
                                    UI.alertSecond("数据已全部加载完成");
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
        },
        methods: {
            click_show_slayer: function click_show_slayer() {
                searchLayer.layer_show();
            }
        }
    });
});
//# sourceMappingURL=../../src/maps/conf/pro/index.js.map
