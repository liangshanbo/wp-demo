/**
 * 返利订单列表
 * @author 张恩铭
 * @date 20170301
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/rebate/index.js">
 </script>
 */
define('conf/rebate/index.js', function(require, exports, module) {
    const $ = require('$');
    const ajax = require('utils/async/ajax.js');
    const UI = require('UI/dialog/alert');
    const Vue = require('vue');
    require('mods/filters/com');
    // 这个插件的文档 https://github.com/ximan/dropload
    require('vendors/dropload.js');
    const laz = require('utils/async/lazyload.js');

    let $orderList = $('.orders');
    let $noOrders = $('.no-orders');
    let pageSize = 10;

    init();

    function init() {
        addListeners();
        setFilters();
        Vue.component('order-list-more', {
            props: {
                orders: {
                    type: Array,
                },
            },
            template: '#order-list-more-template',
        });
        let vm = new Vue({
            el: 'body',
            data: {
                currentPageNum: 1,
                orderListData: [],
                currentStatus: 'ALL',
                pageSize,
                reqDisabled: false,
            },
            init() {
                $orderList.dropload({
                    scrollArea: window,
                    //domUp: {
                    //domClass: 'dropload-up',
                    //domRefresh: '<div class="dropload-refresh"><img src="'+wapcsspath+'/images/common/loading.png" alt=""/></div>',
                    //domUpdate: '<div class="dropload-update"><img src="'+wapcsspath+'/images/common/loading.png" alt=""/></div>',
                    //domLoad: '<div class="dropload-load"><img src="'+wapcsspath+'/images/common/loading.gif" alt=""/></div>'
                    //},
                    domDown: {
                        domClass: 'dropload-down',
                        domRefresh: '<div class="dropload-refresh"><img src="'+wapcsspath+'/images/common/loading.png" alt=""/></div>',
                        domUpdate: '<div class="dropload-update"><img src="'+wapcsspath+'/images/common/loading.png" alt=""/></div>',
                        domLoad: '<div class="dropload-load"><img src="'+wapcsspath+'/images/common/loading.gif" alt=""/></div>'
                    },
                    // loadUpFn(me) {
                    //     refreshCurrentTab(me);
                    // },
                    loadDownFn(me) {
                        if (vm.reqDisabled) {
                            UI.alertSecond('No More Orders');
                            me.resetload();
                        } else {
                            ajax.query({
                                url: `/api/ext/trade/orders?status=${vm.currentStatus}&pageNum=${++vm.currentPageNum}&pageSize=${vm.pageSize}`,
                                success(res) {
                                    if (res.code === 200) {
                                        if (res.data.orders.length > 0) {
                                            vm.orderListData = vm.orderListData.concat(res.data.orders);
                                            laz.lazyload();
                                        } else {
                                            UI.alertSecond('No More Orders');
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
            methods: {
                filterOrders(evt) {
                    let $this = $(evt.target);
                    let type = $this.data('anchor');
                    if (type !== undefined) {
                        this.currentStatus = type;
                        refreshCurrentTab();
                    }
                },
            },
        });

        /*
        刷新当前页面的数据，提供参数时重置 dropload
        */
        function refreshCurrentTab(me) {
            vm.reqDisabled = false;
            $orderList.children('[data-first-screen]').remove();
            vm.orderListData = [];
            vm.currentPageNum = 0;
            ajax.query({
                url: `/api/ext/trade/orders?status=${vm.currentStatus}&pageNum=${++vm.currentPageNum}&pageSize=${vm.pageSize}`,
                success(res) {
                    if (res.code === 200) {
                        if (res.data.orders.length > 0) {
                            $noOrders.addClass('hide');
                            vm.orderListData = res.data.orders;
                            laz.lazyload();
                        } else {
                            $noOrders.removeClass('hide');
                        }
                    } else {
                        UI.alertSecond(res.message);
                    }
                    // 插件文档规定每次数据加载完必须通过 resetload 重置
                    me !== undefined && me.resetload();
                },
            });
        }
    }

    function setFilters() {
        Vue.filter('time', function(time, separator) {
            var date = new Date(time);
            var year = date.getFullYear();
        	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
        	var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
        	var dateStr = '';
        	if (separator) {
        		dateStr += day + separator + month + separator + year;
        	} else {
        		dateStr += day + '/' + month + '/' + year;
        	}
        	return dateStr;
        });
        Vue.filter('addFullStop', function(string) {
            return string += '. ';
        });
        Vue.filter('to2DigitFloat', function(amount) {
            return (amount / 100).toFixed(2);
        });
    }

    function addListeners() {
        let $body = $('body');
        let $helpButton = $('.help-btn');
        let $helpArea = $('.mask');
        let $closeHelpButton = $helpArea.find('.close-btn');
        $helpButton.click(function() {
            $helpArea.css('display', 'block');
            $body.css('overflow-y', 'hidden');
        });
        $closeHelpButton.click(function() {
            $helpArea.css('display', 'none');
            $body.css('overflow-y', 'auto');
        });
    }

});
