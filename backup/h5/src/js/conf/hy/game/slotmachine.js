"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @title: 老虎机
 * @time:  2017-03-08
 * @author: wangchunpeng
 * 子类需实现方法 [login,get_login,toast]
 */
define("conf/hy/game/slotmachine", function (require, exports, module) {
    require("$");
    require("lib/zeptojs/fx");
    var Ajax = require("utils/async/ajax"),
        Swiper = require('mods/swiper'),
        Mobile = require("mods/check/mobile"),
        Storage = require("mods/storage/storage");

    var internal = {
        WIN: [[1, 0, 1], [0, 0, 1], [0, 1, 1], [0, 1, 0], [1, 0, 0]],
        LOSE: [[0, 0, 0], [1, 1, 1], [1, 1, 0]]
    };
    var $price = $("#main .head .price");

    var Slot = function () {
        function Slot() {
            _classCallCheck(this, Slot);

            this.playing = false;
            this.isToggleing = false;
            this.u = 800 / 5; // 每个奖项占的大小
            this.total_bonus_amount = 0; // 该用户的所有的中奖金额
            this.data = {
                bFirstRule: true, //规则弹框 只第一次的时候初始化
                bFirstReward: true,
                num: 1, // 转动的倍数
                result: {} //中间结果
            };
            this._init();
            this.bindEvent();
        }

        _createClass(Slot, [{
            key: "bindEvent",
            value: function bindEvent() {
                var self = this;
                $(".go").on("click", function () {
                    // GOGO
                    if (self.playing) {
                        return;
                    }
                    self.playing = true;
                    self.get_login(function () {
                        //每次玩都去请求是否是登录状态
                        self._ajax_playing();
                    }, function () {
                        self._go_btn_reset();
                        self.login(function () {});
                    });
                });
                $(".sign").on("click", function () {
                    // 签到
                    if ($(this).hasClass("disable")) {
                        return;
                    }
                    self._sign();
                });
                $(".btn").on("touchstart touchend", function (e) {
                    var self = this,
                        $self = $(this);
                    if ($self.hasClass("go")) {
                        if (e.type == "touchstart" && !self.playing) {
                            $self.addClass("active");
                        }
                    } else {
                        $self.toggleClass("active");
                    }
                });
                $(".btns li").on("click", function () {
                    var type = $(this).attr("type");
                    if (type == "share") {
                        self.get_login(function () {
                            self.share();
                        }, function () {
                            self.login(function () {
                                self.share();
                            });
                        });
                        return;
                    }
                    self._popup(type);
                });
                $(".price").on("click", function () {
                    // 点击获奖数额--弹框
                    self.get_login(function () {
                        self._popup("reward");
                    }, function () {
                        self.login();
                    });
                });
                var $popup = $("#popup");
                $popup.find(".close").on("click", function () {
                    $popup.hide();
                });
                $popup.find(".share img").on("click", function () {
                    self.share();
                });
            }
        }, {
            key: "_init",
            value: function _init() {
                var self = this;
                this.get_login(function (data) {
                    self._get_bonus();
                }, function () {});
                setTimeout(function () {
                    self._pricebeat();
                }, 1000);

                var time = self._get_time();
                if (Storage.getItem("slot_" + time)) {
                    self._set_sign_dis();
                }
            }
        }, {
            key: "_go_btn_reset",
            value: function _go_btn_reset() {
                // Go按钮去除active
                this.playing = false;
                $(".go").removeClass("active");
            }
        }, {
            key: "_pricebeat",
            value: function _pricebeat() {
                var self = this;
                $price.toggleClass("active");
                setTimeout(function () {
                    self._pricebeat();
                }, 1000);
            }
        }, {
            key: "_sign",
            value: function _sign() {
                //签到
                var self = this;
                this.get_login(function (data) {
                    Ajax.post({
                        url: "/api/activity/signing",
                        success: function success(data) {
                            var time = self._get_time();
                            Storage.setItem("slot_" + time, 1);
                            self._set_sign_dis();
                            if (data.code == 200) {
                                self.toast("sign success");
                                self._get_task_data(); //重新获取
                                self._set_bonus_num(5, true);
                            } else {
                                self.toast(data.message);
                            }
                        }
                    });
                }, function () {
                    self.login();
                });
            }
        }, {
            key: "_set_sign_dis",
            value: function _set_sign_dis() {
                $("#main .foot .sign").addClass("disable");
            }
        }, {
            key: "_get_bonus",
            value: function _get_bonus() {
                // 获取该用户的抽奖次数、金额
                var self = this;
                self._get_task_data();
                Ajax.query({
                    url: "/api/activity/slots/bonuses",
                    data: {
                        pageNum: 1,
                        pageSize: 6
                    },
                    success: function success(data) {
                        if (data.code == 200) {
                            var amount = data.data.totalAmount.amount;
                            self._set_bonus_amount(amount);
                            self._set_reward(data.data.bonuses, data.data.totalAmount.symbol);
                        }
                    }
                });
            }
        }, {
            key: "_get_task_data",
            value: function _get_task_data() {
                // 获取该用户任务状态
                var self = this;
                Ajax.query({
                    url: "/api/activity/slots/asset",
                    success: function success(data) {
                        if (data.code == 200) {
                            self._set_bonus_num(data.data.countBalance);
                            self._set_task(data.data);
                        } else {
                            self.toast(data.message);
                        }
                    }
                });
            }
        }, {
            key: "_set_reward",
            value: function _set_reward(bonuses, symbol) {
                // 该用户中奖信息
                var $reward = $("#popup .reward"),
                    $ul = $reward.find("ul"),
                    str = "",
                    self = this,
                    style = "";
                if (symbol) {
                    $reward.find(".title span.symbol").html(symbol);
                }
                if ($ul.find("li").length > 0) {
                    style = $ul.find("li").eq(0).attr("style");
                }
                for (var i = 0, l = bonuses.length; i < l; i++) {
                    var bonus = bonuses[i];
                    str += "<li class='swiper-slide' style='" + style + "'>";
                    str += self._get_time(bonus["bonusTime"]) + " get " + bonus["amount"]["amount"] / 100 + " ₹";
                    str += "</li>";
                }
                $ul.append(str);
            }
        }, {
            key: "_get_time",
            value: function _get_time(timestamp) {
                var date = timestamp ? new Date(timestamp) : new Date(),
                    year = date.getFullYear(),
                    month = date.getMonth() + 1,
                    day = date.getDate();
                month = month > 9 ? month : "0" + month;
                day = day > 9 ? day : "0" + day;
                if (timestamp) {
                    var h = date.getHours(),
                        m = date.getMinutes();
                    h = h > 9 ? h : "0" + h;
                    m = m > 9 ? m : "0" + m;
                    return year + " " + month + "." + day + " " + h + ":" + m;
                } else {
                    return year + "_" + month + "_" + day;
                }
            }
        }, {
            key: "_set_task",
            value: function _set_task(obj) {
                //该用户任务完成情况
                var $task = $("#popup .task");
                for (var key in obj) {
                    if (obj[key] === "COMPLETED") {
                        $task.find("li." + key).addClass("active");
                    }
                }
            }
        }, {
            key: "_set_bonus_amount",
            value: function _set_bonus_amount(amount) {
                // 设置中奖金额
                if (amount <= 0) {
                    return;
                }
                amount = amount / 100;
                this.total_bonus_amount += amount; //加上之前加载出来的
                amount = this.total_bonus_amount;
                $("#popup .reward .amount").html(amount); //设置弹框的总中奖金额
                amount = (amount + "").split("");
                var $dds = $(".head .price dd"),
                    k = amount.length,
                    l = $dds.length;
                for (var i = amount.length; i > 0; i--) {
                    $dds.eq(l - 1 - k + i).html(amount[i - 1]);
                }
            }
        }, {
            key: "_set_bonus_num",
            value: function _set_bonus_num(num, isAdd) {
                //设置剩余抽奖次数
                var $nums = $(".ctls .nums");
                if (isAdd) {
                    num += parseInt($nums.html());
                }
                $nums.html(num);
            }
        }, {
            key: "_ajax_playing",
            value: function _ajax_playing() {
                // 请求接口是否中奖
                var self = this;
                Ajax.post({
                    url: "/api/activity/slots/gamePlaying",
                    success: function success(data) {
                        if (data.code != 200) {
                            self.toast("Your chance is 0, you can get through the task to get more chance to win!");
                            self._go_btn_reset();
                            return;
                        }
                        self.data.result = data;
                        var $lis = $(".content li");
                        $lis.css("backgroundPositionY", 0);
                        self.data.num = 1;
                        self._go();
                    },
                    error: function error() {
                        self._go_btn_reset();
                        self.data.result = {};
                    }
                });
            }
        }, {
            key: "_go",
            value: function _go() {
                //转起来吧
                var self = this,
                    $lis = $(".content li"),
                    num = self.data.num++,
                    result = self.data.result,
                    status = result.data.bonusStatus,
                    //[WIN,LOSE]
                arr = [];
                if (status == "WIN") {
                    arr = internal["WIN"][result.data.bonusLevel - 1]; //根据几等奖显示结果
                } else {
                    var random = Math.floor(Math.random() * 3);
                    arr = internal["LOSE"][random];
                }
                // console.log(arr);
                $lis.each(function (i) {
                    (function (index) {
                        $lis.eq(index).animate({
                            // backgroundPositionY: (self.u * (num * 50 + arr[index]) / 100 + 0.1) + "rem"
                            backgroundPositionY: (num * 10 + arr[index]) * -100 + "%"
                        }, {
                            duration: 3000 + 3000 * index,
                            easing: "easeInOutCirc",
                            complete: function complete() {
                                if (index == 2) {
                                    if (status === "WIN") {
                                        var $popup = $("#popup"),
                                            data = result.data,
                                            amount = data.bonusAmount.amount,
                                            obj = {};
                                        $popup.find(".win").find(".bonus").html(amount / 100);
                                        self._popup("win", true);
                                        self._set_bonus_amount(amount);
                                        obj["bonusTime"] = new Date().valueOf();
                                        obj["amount"] = data.bonusAmount;
                                        self._set_reward([obj]);
                                    }
                                    self._set_bonus_num(result.data.countBalance); //剩余抽奖次数
                                    self._go_btn_reset();
                                }
                            }
                        });
                    })(i);
                });
            }

            /**
             * @title: 弹框
             * @param  {[type]}   type       [description] 弹框类型
             * @param  {Boolean}  isAutoHide [description] 是否是自动隐藏(3秒隐藏)
             */

        }, {
            key: "_popup",
            value: function _popup(type, isAutoHide) {
                var $popup = $("#popup"),
                    self = this;
                if (type == "win") {
                    $popup.find(".win").show().siblings().hide();
                } else if ($popup.find("." + type).length) {
                    $popup.find(".box_head").show();
                    $popup.find(".box_deco").show();
                    $popup.find(".box .close").show();
                    switch (type) {
                        case "rules":
                            $popup.find(".box_deco").hide();
                            $popup.find(".box_head").hide();
                            if (self.data.bFirstRule) {
                                self.data.bFirstRule = false;
                                setTimeout(function () {
                                    new Swiper('.rules .swiper-container', {
                                        pagination: '.swiper-pagination'
                                    });
                                }, 0);
                            }
                            break;
                        case "download":
                            $popup.find(".box_deco").hide();
                            $popup.find(".box_head").hide();
                            if (Mobile.isIOS) {
                                $popup.find(".android").hide();
                            } else {
                                $popup.find(".ios").hide();
                            }
                            $popup.find(".box .close").hide();
                            break;
                        case "reward":
                            if (self.data.bFirstReward && $popup.find(".reward li").length > 1) {
                                self.data.bFirstReward = false;
                                setTimeout(function () {
                                    new Swiper('.reward .swiper-container', {
                                        slidesPerView: 1,
                                        direction: 'vertical'
                                    });
                                }, 0);
                            }
                            break;
                    }
                    $popup.find(".box").show().siblings().hide();
                    $popup.find(".box_head>." + type).show().siblings().hide();
                    $popup.find(".box_content>." + type).show().siblings().hide();
                }
                $popup.show();
                if (isAutoHide) {
                    setTimeout(function () {
                        $popup.hide();
                    }, 3000);
                }
            }
        }]);

        return Slot;
    }();

    module.exports = Slot;
});
//# sourceMappingURL=../../../../maps/conf/hy/game/slotmachine.js.map
