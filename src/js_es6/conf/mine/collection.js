/**
 * 收藏列表
 * @author 黄奕海
 * @date 20170308
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/mine/collection.js">
 </script>
 */
define('conf/mine/collection.js', function (require, exports, module) {
    const $ = require('$'),
        ajax = require('utils/async/ajax.js'),
        Vue = require("vue"),
        UI = require('UI/dialog/alert.js'),
        laz = require('utils/async/lazyload.js');
    require('vendors/dropload.js');
    //laz.init();
    let drods;
    Vue.component("listmore", {
        props: {
            items: {
                type: Array,
                default: function() {
                    return []
                }
            }
        },
        template: "#collectionList"
    });
    Vue.filter('buy',function(url){
        var search = /\?/.test(url);
        if(userId!=="0"){
            return url + (search ? "&":"?")+"affExtParam1="+userId;
        }
        return "login?redirect="+encodeURIComponent(url)+"&type=buy";
    });
    new Vue({
        el:'body',
        data: {
            listData:[],
            num :2
        },

        init:function(){
            let self = this;
            drods = $("body").dropload({
                scrollArea: window,
                domDown: {
                    domClass: 'dropload-down',
                    domRefresh: '<div class="dropload-refresh"><img src="'+wapcsspath+'/images/common/loading.png" alt=""/></div>',
                    domUpdate: '<div class="dropload-update"><img src="'+wapcsspath+'/images/common/loading.png" alt=""/></div>',
                    domLoad: '<div class="dropload-load"><img src="'+wapcsspath+'/images/common/loading.gif" alt=""/></div>'
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
                }
            });
            if($('.goods-list').children('li').length>=10){
                drods.loadDownFn = function(me) {
                    ajax.query({
                        url: "/api/user/items?pageNum="+ (self.num++)+"&pageSize=10",
                        success: function(data) {
                            setTimeout(function() {
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
            }
        }
    })
});
