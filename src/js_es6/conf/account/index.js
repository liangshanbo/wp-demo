/**
 * 账户余额明细
 * @author 张恩铭
 * @date 20170323
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/account/index.js">
 </script>
 */
define('conf/account/index.js', function(require, exports, module) {
    const $ = require('$');
    const ajax = require('utils/async/ajax.js');
    const UI = require('UI/dialog/alert');
    require('mods/filters/com');
    const Vue = require('vue');
    // 这个插件的文档 https://github.com/ximan/dropload
    require('vendors/dropload.js');
    const laz = require('utils/async/lazyload.js');

    let pageSize = 10;
    let $accountList = $('.accountlist');

    init();

    function init() {
        bindEvents();
        // setFilters();
        Vue.component('account-list-more', {
            props: {
                details: {
                    type: Array,
                },
            },
            template: '#account-list-more-template',
        });
        let vm = new Vue({
            el: 'body',
            data: {
                currentPageNum: 1,
                accountDetailsData: [],
                pageSize,
                reqDisabled: false,
            },
            init() {
                $accountList.dropload({
                    scrollArea: window,
                    domDown: {
                        domClass: 'dropload-down',
                        domRefresh: '<div class="dropload-refresh"><img src="'+wapcsspath+'/images/common/loading.png" alt=""/></div>',
                        domUpdate: '<div class="dropload-update"><img src="'+wapcsspath+'/images/common/loading.png" alt=""/></div>',
                        domLoad: '<div class="dropload-load"><img src="'+wapcsspath+'/images/common/loading.gif" alt=""/></div>'
                    },
                    loadDownFn(me) {
                        if (vm.reqDisabled) {
                            UI.alertSecond('No More Transactions.');
                            me.resetload();
                        } else {
                            ajax.query({
                                url: `/api/account/balance?&pageNum=${++vm.currentPageNum}&pageSize=${vm.pageSize}`,
                                success(res) {
                                    if (res.code === 200) {
                                        if (res.data.details.length > 0) {
                                            vm.accountDetailsData = vm.accountDetailsData.concat(res.data.details);
                                            laz.lazyload();
                                        } else {
                                            UI.alertSecond('No More Transactions.');
                                            vm.reqDisabled = true;
                                        }
                                    } else {
                                        UI.alertSecond(res.message);
                                    }
                                    me.resetload();
                                },
                            });
                        }
                    },
                });
            },
        });
    }

    // function setFilters() {
    //     Vue.filter('time', function(time, separator) {
    //         var date = new Date(time);
    //         var year = date.getFullYear();
    //         var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
    //         var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    //         var dateStr = '';
    //         if (separator) {
    //            dateStr += day + separator + month + separator + year;
    //         } else {
    //            dateStr += day + '/' + month + '/' + year;
    //         }
    //         return dateStr;
    //     });
    //     Vue.filter('toInt', function(string){
    //         return Math.round(num / 100);
    //     });
    //     Vue.filter('to2digitFloat', function(money){
    //         return (num / 100).toFixed(2);
    //     });
    // }


    function bindEvents() {
        // let threshold = $('.hmoney').height();
        // $(window).on('scroll', function() {
        //     let sc = document.body.scrollTop;
        //     $('.header-title').text(sc > threshold ? 'Transactions' : 'My Balance');
        // });
    }

});
