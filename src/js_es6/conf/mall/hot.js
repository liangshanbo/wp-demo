/**
 * mall列表 热销
 * @author huangyihai
 * @date 20170216
 * 页面引用 入口在首页
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/mall/hot.js">
 </script>
 */
define('conf/mall/hot.js', function (require, exports, module) {
    require("$");
    let Ajax = require("utils/async/ajax"),
        Vue = require("vue"),
        UI = require('UI/dialog/alert.js'),
        laz = require('utils/async/lazyload.js'),
        BP =  require('mods/buried_point.js'),
        dropload;
    require('mods/filters/com');
    require('vendors/dropload.js');
    Vue.component("listmore", {
        props: {
            items: {
                type: Array,
                default: function() {
                    return []
                }
            }
        },
        template: "#template"
    });
    let sVue = new Vue({
        el: "body",
        data: {
            moreData: [],
            type:0, //0热销 1白菜价
            num:2,
            noMore:0, //1没有更多了
            pType:"5",
            pdPos:"",
            dom:"#good-list"
        },
        created:function(){
            let self = this;
            BP.init({
                dom:self.dom,
                pdPos:self.pdPos,
                pType:self.pType
            });//商品list曝光
        },
        init: function() {
            let self = this;
            dropload = $("#good-list").dropload({
                scrollArea: window,
                domDown: {
                    domClass: 'dropload-down',
                    domRefresh: '<div class="dropload-refresh"><img src="' + wapcsspath + '/images/common/loading.png" alt=""/></div>',
                    domUpdate: '<div class="dropload-update"><img src="' + wapcsspath + '/images/common/loading.png" alt=""/></div>',
                    domLoad: '<div class="dropload-load"><img src="' + wapcsspath + '/images/common/loading.gif" alt=""/></div>'
                },
                domUp: {
                    domClass: 'dropload-up',
                    domRefresh: '<div class="dropload-refresh"><img src="'+wapcsspath+'/images/common/loading.png" alt=""/></div>',
                    domUpdate: '<div class="dropload-update"><img src="'+wapcsspath+'/images/common/loading.png" alt=""/></div>',
                    domLoad: '<div class="dropload-load"><img src="'+wapcsspath+'/images/common/loading.gif" alt=""/></div>'
                },
                loadUpFn: function (me) {
                    setTimeout(function () {
                        me.resetload();
                        location.reload(true);
                    }, 500);
                },
                loadDownFn: function(me) {
                    let str = self.type === 0 ? 'hotSalesItems':'bargainItems';
                    Ajax.query({
                        url: `/api/ext/item/${str}?pageNum=${self.num++}&pageSize=10`,
                        success: function(data) {
                            setTimeout(function() {
                                me.resetload();
                            }, 300);
                            if (data.code === 200) {
                                if (!data.data.items.length) {
                                    UI.alertSecond("Data is loaded");
                                    return;
                                }
                                if(data.data.items.length<10){
                                    self.noMore = 1;
                                    dropload.lock();
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
    });
    function buy(url) {
        let search = /\?/.test(url);
        if (userId !== "0") {
            return url + (search ? "&" : "?") + "affExtParam1=" + userId;
        }
        return "login?redirect=" + encodeURIComponent(url) + "&type=buy";
    }
    module.exports = sVue;
});

