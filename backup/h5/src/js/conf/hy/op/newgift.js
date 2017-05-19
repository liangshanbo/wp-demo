"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @title:新人礼
 * @time:  2017-05-04
 */
define("conf/hy/op/newgift", function (require, exports, module) {
    require("$");
    var dlApp = require("utils/dlApp"),
        Share = require('mods/share/shareDialog'),
        Ajax = require("utils/async/ajax"),
        Login = require("mods/login");

    var $mask = $(".mask"),
        $modal = $(".modal");
    var userId = "",
        hasLogin = false;
    if (userinfo) {
        userId = userinfo["user"]["id"];
        hasLogin = true;
    }
    window.userId = userId;
    window.hasLogin = hasLogin;
    var shareFB = new Share({
        picture: wapcsspath + "/images/game/luckydraw/share.jpg",
        href: location.href.replace(location.pathname, "/invite/regist"),
        shareType: "gameShare",
        type: "gif"
    });

    var NewGift = function () {
        function NewGift() {
            _classCallCheck(this, NewGift);

            this.bindEvents();
            this._init();
        }

        _createClass(NewGift, [{
            key: "_init",
            value: function _init() {
                var self = this;
                self._getRed();
            }
        }, {
            key: "bindEvents",
            value: function bindEvents() {
                var self = this;
                $(".btn01").on("click", function () {
                    internal.isLogin(function () {
                        internal.share();
                    }, function () {
                        Login.login();
                    });
                });
                $(".btn02").on("click", function () {
                    dlApp.dl();
                });
                $(".view a").on("click", function () {
                    $modal.show();
                });
                $modal.find(".close").on("click", function () {
                    $modal.hide();
                });
                $mask.find(".close").on("click", function () {
                    $mask.hide();
                });
                $mask.find(".red-close").on("click", function () {
                    self.showRedPacket();
                });
                $mask.find(".btn-more").on("click", function () {
                    $mask.hide();
                    internal.share();
                });
            }
        }, {
            key: "_getRed",
            value: function _getRed() {
                var self = this;
                internal.isLogin(function () {
                    var url = location.href;
                    if (url.indexOf("source=banner") < 0) {
                        self.showRedPacket(1);
                    }
                    Ajax.query({
                        url: "/api/ext/cashback/details",
                        data: {
                            status: "ALL",
                            pageNum: 1,
                            pageSize: 10,
                            type: "USERREGISTER"
                        },
                        success: function success(data) {
                            if (data.code === 200 && data.data.orders) {
                                var orders = data.data.orders;
                                if (orders && orders.length) {
                                    var cashback = orders[0]["cashBackAmount"];
                                    $mask.find(".money").html(cashback["symbol"] + cashback["amount"] / 100);
                                }
                            }
                        }
                    });
                }, function () {});
            }

            /**
             * @title: 打开红包弹框
             * @param: flag 是否直接是打开的状态
             */

        }, {
            key: "showRedPacket",
            value: function showRedPacket(flag) {
                var $redclose = $mask.find(".red-close");
                if (flag) {
                    $mask.find(".close").hide();
                    $redclose.show().siblings().hide();
                } else {
                    $mask.find(".close").show();
                    $redclose.hide().siblings().show();
                }
                $mask.show();
            }
        }]);

        return NewGift;
    }();

    var internal = {
        isLogin: function isLogin(callback, errback) {
            if (userinfo) {
                callback();
            } else {
                errback();
            }
        },
        share: function share() {
            shareFB.layer_show();
        }
    };

    new NewGift();
});
//# sourceMappingURL=../../../../maps/conf/hy/op/newgift.js.map
