/**
 * 礼品卡兑换 - 内嵌
 * @author 张恩铭
 * @date 20170324
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/account/exchange.js">
 </script>
 */
define('conf/account/exchange.js', function(require, exports, module) {
    const $ = require('$');
    const ajax = require('utils/async/ajax.js');
    const Vue = require('vue');
    const appInterface = require("utils/appInterface");
    const Login = require("mods/login/index");

    $(init);

    function init() {
        bindLinkEvent();
        bindExchangeEvents();
    }

    function bindLinkEvent() {
        $('.link-giftcards').click(function() {
            appInterface.callWebView("/account/giftcard", function() {
                // 没时间搞了，下个迭代再优化
                // Login.getLoginStatus(function() {
                //     window.location.reload();
                // }, function(){});
            });
        });
    }

    function bindExchangeEvents() {
        let $totalBalance = $('.actual-amount');
        let exchangeStates = {
            // 要显示的遮罩层子元素
            shownElementName: '',
            // 要兑换的卡号
            cardId: '',
            // 协议接口
            appInterface,
        };
        let vm = new Vue({
            el: 'body',
            data: function() {
                return exchangeStates;
            },
            methods: {
                showExchangePrompt(evt) {
                    this.cardId = $(evt.target).data('card-id');
                    Login.getLoginStatus(function() {
                        vm.appInterface.call(
                            '/common/confirm',
                            { msg : 'Exchange this Gift Voucher?' },
                            function(data) {
                                if (data.code === 200) {
                                    vm.sendExchangeReq();
                                } else {
                                    vm.removeMaskAndAlert();
                                }
                            }
                        );
                    },function(){});
                },
                sendExchangeReq() {
                    this.shownElementName = 'loading';
                    ajax.post({
                        url: '/api/trade/myGiftCard',
                        data: {
                            id: vm.cardId
                        },
                        success: function(result) {
                            if (result.code === 200) {
                                vm.removeMaskAndAlert('Exchanged Sucessfully. Check it in My Gift Voucher.');
                            } else {
                                vm.removeMaskAndAlert(result.message);
                            }
                        },
                        fail: function(result) {
                            vm.removeMaskAndAlert('Exchange failed.');
                        },
                    });
                    this.checkNetwork();
                },
                removeMaskAndAlert(msg) {
                    // 移除遮罩层和子元素
                    this.shownElementName = '';
                    // 刷新顶部的总余额
                    ajax.query({
                        url: '/api/trade/giftCards',
                        success: function(result) {
                            let newAmount = (result.data.balance.amount / 100).toFixed(2);
                            $totalBalance.text(newAmount);
                        },
                    });
                    // 有参数时toast之
                    if (typeof msg === 'string') {
                        this.appInterface.toast(msg, 3000);
                    }
                },
                // 断网超时提示
                checkNetwork(waitTime = 3000) {
                    setTimeout(function() {
                        if (!window.navigator.onLine) {
                            vm.removeMaskAndAlert('Please check your network.');
                        };
                    }, waitTime);
                },
            },
        });
    }

});
