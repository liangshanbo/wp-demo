'use strict';

/**
 * 我的礼品卡 - h5
 * @author 张恩铭
 * @date 20170324
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/account/giftcard.js">
 </script>
 */
define('conf/account/giftcard.js', function (require, exports, module) {
    var $ = require('$');
    var Vue = require('vue');
    var UI = require('UI/dialog/alert');
    var ajax = require('utils/async/ajax.js');
    var storage = require('mods/storage/storage');

    var commonMod = require('conf/account/_common.js');

    $(function () {

        var states = {
            // 公共方法
            commonMod: commonMod,
            // 复制方法
            bindCopyEvents: bindCopyEvents,
            // 首次渲染完成
            renderCompleted: false,
            // 我的礼品卡列表数据
            cardListRes: {
                data: {
                    totalExchange: {
                        amount: 0
                    },
                    myGiftCards: []
                }
            },
            // 展示帮助浮层
            showHelpLayer: false,
            // 目标卡id
            targetCardId: '',
            // 目标卡使用状态
            targetUseStatus: null
        };

        var vm = new Vue({
            el: 'body',
            data: function data() {
                return states;
            },

            computed: {
                sortedListData: function sortedListData() {
                    var getCompareFunc = function getCompareFunc(tarAttr) {
                        return function (i1, i2) {
                            return -(i1[tarAttr].valueOf() - i2[tarAttr].valueOf());
                        };
                    };
                    /*
                    先去除已解绑的卡和旧版本的卡（后者理论上不会出现）
                    然后按 未使用 > 未激活 > 已使用 排序
                    */
                    var arr = this.cardListRes.data.myGiftCards.filter(function (i) {
                        return i.exchangeStatus !== 'UNBIND' && i.useStatus !== 'NO_USERED';
                    });
                    var r1 = arr.filter(function (i) {
                        return i.useStatus === 'UNUSED' && i.exchangeStatus === 'ALREADY_EXCHANGE';
                    });
                    var r2 = arr.filter(function (i) {
                        return i.exchangeStatus === 'ALREADY_BIND';
                    });
                    var r3 = arr.filter(function (i) {
                        return i.useStatus === 'USED';
                    });
                    // console.log('all\n', this.cardListRes.data.myGiftCards);
                    // console.log('r1\n', r1);
                    // console.log('r2\n', r2);
                    // console.log('r3\n', r3);
                    // console.log('arr', arr);
                    var _r1 = r1.sort(getCompareFunc('exchangeDate')),
                        _r2 = r2.sort(getCompareFunc('distributeDate')),
                        _r3 = r3.sort(getCompareFunc('exchangeDate'));
                    return _r1.concat(_r2).concat(_r3);
                }
            },
            methods: {
                /*
                更新礼品卡列表数据，成功后绑定复制事件，判断是否展示使用说明
                */
                fetchGiftCardsData: function fetchGiftCardsData() {
                    // this.renderCompleted = false;
                    ajax.query({
                        url: '/api/trade/myGiftCards',
                        data: {
                            pageNum: 0,
                            pageSize: 0
                        },
                        success: function success(res) {
                            if (res.code === 200) {
                                vm.cardListRes = res;
                                vm.$nextTick(function () {
                                    vm.checkIfShouldShowTutorial();
                                    vm.bindCopyEvents();
                                });
                            }
                            vm.renderCompleted = true;
                            if (vm.targetCardId !== '') {
                                vm.$nextTick(function () {
                                    commonMod.scrollIntoTargetSelector('[data-is-scroll-target]');
                                });
                            }
                        },
                        error: function error() {
                            vm.renderCompleted = true;
                        }
                    });
                },

                /*
                ‘长按’事件的触发
                */
                attachLongPressEvt: function attachLongPressEvt(fn) {
                    var startTimeStamp = void 0,
                        endTimeStamp = void 0,
                        startX = void 0,
                        startY = void 0;
                    var $body = $('body');
                    $body.on('touchstart', '.cards-li', function (evt) {
                        startX = evt.targetTouches[0].clientX;
                        startY = evt.targetTouches[0].clientY;
                        startTimeStamp = new Date().valueOf();
                        // 如果目标有card-id属性，说明事件发生在改使用状态的按钮上
                        // 保存该id，并设置vm.targetUseStatus与data-use-status相反
                        var $tar = $(evt.target);
                        vm.targetCardId = $tar.data('card-id') || '';
                        vm.targetUseStatus = $tar.data('use-status') === 'USED' ? 'UNUSED' : 'USED';
                    }).on('touchend', '.cards-li', function (evt) {
                        // 如果事件目标的id存在且与已保存的id相同，说明该按钮上产生了点击事件。触发fn；
                        if ($(evt.target).data('card-id') === vm.targetCardId) {
                            fn();
                            // 否则按以下2个条件判断是否发生了‘长按’事件
                        } else {
                            endTimeStamp = new Date().valueOf();
                            // - 水平和垂直的偏移量均小于10
                            var fingerDidNotMove = Math.abs(evt.changedTouches[0].clientY - startY) < 10 && Math.abs(evt.changedTouches[0].clientX - startX) < 10;
                            // - 持续时间大于500
                            var pressedTimeEnough = endTimeStamp - startTimeStamp > 200;
                            if (fingerDidNotMove && pressedTimeEnough) {
                                $(this).children('.mark-wrap').show();
                            } else {
                                $body.find('.mark-wrap').hide();
                            }
                        }
                    });
                },

                /*
                发送更改使用状态的请求。返回成功则更新礼品卡列表数据
                */
                sendSwitchUseStatusReq: function sendSwitchUseStatusReq() {
                    ajax.put({
                        url: '/api/trade/myGiftCard',
                        data: {
                            cardId: vm.targetCardId.toString(),
                            useStatus: vm.targetUseStatus
                        },
                        success: function success(res) {
                            if (res.code === 200) {
                                vm.fetchGiftCardsData();
                            } else {
                                UI.alertSecond("Change use status failed");
                            }
                        },
                        error: function error() {}
                    });
                },

                /*
                初次出现非.disabled的.cards-li元素时展示使用说明，关闭说明后在ls中保存，之后不再出现
                */
                checkIfShouldShowTutorial: function checkIfShouldShowTutorial() {
                    if (storage.getItem('hadSeenTutorial') === null) {
                        if ($('body').find('.cards-li').not('.disabled').length > 0) {
                            document.body.scrollTop = 0;
                            commonMod.showTutorial('.cards-li', 'Long press to mark the usage of Gift Card.', function () {
                                storage.setItem('hadSeenTutorial', true);
                            });
                        };
                    }
                }
            },
            /*
            注册过滤器
            */
            init: function init() {
                commonMod.setFilters();
            },

            /*
            更新数据
            */
            created: function created() {
                this.fetchGiftCardsData();
            },

            /*
            注册长按事件
            */
            ready: function ready() {
                this.attachLongPressEvt(this.sendSwitchUseStatusReq);
            }
        });

        function bindCopyEvents() {
            // H5站暂时用cdn上的clipboard.js
            var script = document.createElement('script');
            script.async = "async";
            script.src = 'https://cdn.jsdelivr.net/clipboard.js/1.6.1/clipboard.min.js';
            document.getElementsByTagName("head")[0].appendChild(script);
            script.onload = function () {
                // require('utils/clipboard.js');
                var copyButtons = document.querySelectorAll('.copy-btn');
                var c = new Clipboard(copyButtons);
                c.on('success', function (e) {
                    UI.alertSecond("Copied");
                    e.clearSelection();
                });
                c.on('error', function (e) {
                    UI.alertSecond("Auto-copy failed. Please copy manually.");
                });
            };
        }
    });
});
//# sourceMappingURL=../../../maps/conf/account/giftcard.js.map
