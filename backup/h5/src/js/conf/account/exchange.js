'use strict';

/**
 * 礼品卡兑换 - h5
 * @author 张恩铭
 * @date 20170324
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/account/exchange.js">
 </script>
 */
define('conf/account/exchange.js', function (require, exports, module) {
    var $ = require('$');
    var ajax = require('utils/async/ajax.js');
    var Vue = require('vue');
    var UI = require('UI/dialog/alert');
    var storage = require('mods/storage/storage');

    var commonMod = require('conf/account/_common.js');

    $(bindExchangeEvents);

    function bindExchangeEvents() {

        var states = {
            // 公共方法
            commonMod: commonMod,
            // 首次渲染完成
            renderCompleted: false,
            // 要显示的遮罩层子元素
            shownElementName: '',
            // 要兑换的卡号
            cardId: '',
            // 兑换请求是否已完成
            isExchanging: false,
            // 浮动图标的动画开关
            iconFlySwitch: false,
            // 兑换成功次数，控制右上角礼品卡图标的通知
            successfulExchanges: 0,
            // 通知闪烁开关
            badgeBlinkSwitch: false,
            // toast持续时间
            toastDuration: 2000,
            // 礼品卡数据
            cardListRes: {
                code: 0,
                data: {
                    balance: {
                        amount: 0
                    },
                    giftCards: []
                }
            }
        };

        var vm = new Vue({
            el: 'body',
            data: function data() {
                return states;
            },

            methods: {
                /*
                更新giftcards列表。请求失败则使用现有列表
                */
                fetchGiftcardsList: function fetchGiftcardsList() {
                    ajax.query({
                        url: '/api/trade/giftCards',
                        success: function success(res) {
                            if (res.code === 200) {
                                vm.cardListRes = res;
                            }
                            if (vm.cardId !== '') {
                                vm.$nextTick(function () {
                                    commonMod.scrollIntoTargetSelector('.cards-li');
                                });
                            }
                            vm.renderCompleted = true;
                        },
                        error: function error() {
                            vm.renderCompleted = true;
                        }
                    });
                },

                /*
                取得按钮的card-id属性，显示兑换对话框浮层
                */
                showExchangePrompt: function showExchangePrompt(evt) {
                    if (!this.isExchanging) {
                        this.cardId = $(evt.target).data('card-id');
                        this.shownElementName = 'prompt';
                    }
                },

                /*
                发送兑换请求，请求结束后移除遮罩层
                */
                sendExchangeReq: function sendExchangeReq() {
                    this.shownElementName = 'loading';
                    ajax.post({
                        url: '/api/trade/myGiftCard',
                        data: {
                            id: vm.cardId
                        },
                        success: function success(result) {
                            if (result.code === 200) {
                                vm.removeMaskAndAlert('Exchanged Sucessfully. Check it in My Gift Voucher.', true);
                            } else {
                                vm.removeMaskAndAlert(result.message, false);
                            }
                        },
                        fail: function fail(result) {
                            vm.removeMaskAndAlert('Exchange failed.', false);
                        }
                    });
                    this.checkNetwork();
                },

                /*
                移除遮罩层后，toast提示信息，toast消失后，根据兑换的结果启动动画
                */
                removeMaskAndAlert: function removeMaskAndAlert(msg, exchangeSuccessful) {
                    // 移除遮罩层和子元素
                    this.shownElementName = '';
                    // 提供字符串参数时toast之
                    if (typeof msg === 'string') {
                        // 暂时禁用兑换按钮
                        this.isExchanging = true;
                        // toast消失后，根据兑换结果启动动画
                        UI.alertSecond(msg, null, this.toastDuration);
                        setTimeout(function () {
                            vm.animate(exchangeSuccessful);
                        }, vm.toastDuration);
                    }
                    this.fetchGiftcardsList();
                },

                /*
                超时提示
                */
                checkNetwork: function checkNetwork() {
                    var waitTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;

                    setTimeout(function () {
                        if (!window.navigator.onLine) {
                            vm.removeMaskAndAlert('Please check your network.');
                        };
                    }, waitTime);
                },

                /*
                兑换动画
                */
                animate: function animate(exchangeSuccessful) {
                    // 若兑换成功则在动画结束后启用兑换按钮、增加右上角图标通知
                    if (exchangeSuccessful === true) {
                        ++vm.successfulExchanges;
                        vm.iconFlySwitch = vm.badgeBlinkSwitch = true;
                        setTimeout(function () {
                            vm.iconFlySwitch = vm.isExchanging = vm.badgeBlinkSwitch = false;
                        }, 1100);
                        // 检查ls，判断是否显示红点
                        storage.setItem('showPoint', 'true');
                        // 否则立即启用
                    } else {
                        vm.isExchanging = false;
                    }
                },

                /*
                跳转至礼品卡页，重置小红点相关的数据
                */
                toMyGiftcards: function toMyGiftcards() {
                    // 点击该按钮后修改ls
                    storage.removeItem('showPoint');
                    this.successfulExchanges = 0;
                    this.badgeBlinkSwitch = false;
                    var newRef = window.location.href.replace('/account/exchange', '/account/giftcard');
                    window.location = newRef;
                }
            },
            /*
            注册过滤器
            */
            init: function init() {
                commonMod.setFilters();
            },

            /*
            更新数据，初始化链接的点击状态
            */
            created: function created() {
                this.fetchGiftcardsList();
                // 检查ls，判断是否显示红点
                if (storage.getItem('showPoint') === 'true') {
                    this.successfulExchanges = 1;
                }
            }
        });
    }
});
//# sourceMappingURL=../../../maps/conf/account/exchange.js.map
