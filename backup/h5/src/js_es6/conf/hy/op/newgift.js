/**
 * @title:新人礼
 * @time:  2017-05-04
 */
define("conf/hy/op/newgift", function(require, exports, module) {
    require("$");
    let dlApp = require("utils/dlApp"),
        Share = require('mods/share/shareDialog'),
        Ajax = require("utils/async/ajax"),
        Login = require("mods/login");

    let $mask = $(".mask"),
        $modal = $(".modal");
    let userId = "",
        hasLogin = false;
    if (userinfo) {
        userId = userinfo["user"]["id"];
        hasLogin = true;
    }
    window.userId = userId;
    window.hasLogin = hasLogin;
    let shareFB = new Share({
        picture: wapcsspath + "/images/game/luckydraw/share.jpg",
        href: location.href.replace(location.pathname, "/invite/regist"),
        shareType: "gameShare",
        type: "gif"
    });
    class NewGift {
        constructor() {
            this.bindEvents();
            this._init();
        }
        _init() {
            let self = this;
            self._getRed();
        }
        bindEvents() {
            let self = this;
            $(".btn01").on("click", function() {
                internal.isLogin(function() {
                    internal.share();
                }, function() {
                    Login.login();
                });
            });
            $(".btn02").on("click", function() {
                dlApp.dl();
            });
            $(".view a").on("click", function() {
                $modal.show();
            });
            $modal.find(".close").on("click", function() {
                $modal.hide();
            });
            $mask.find(".close").on("click", function() {
                $mask.hide();
            });
            $mask.find(".red-close").on("click", function() {
                self.showRedPacket();
            });
            $mask.find(".btn-more").on("click", function() {
                $mask.hide();
                internal.share();
            });
        }
        _getRed() {
            let self = this;
            internal.isLogin(function() {
                let url = location.href;
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
                    success: function(data) {
                        if (data.code === 200 && data.data.orders) {
                            let orders = data.data.orders;
                            if (orders && orders.length) {
                                let cashback = orders[0]["cashBackAmount"];
                                $mask.find(".money").html(cashback["symbol"] + cashback["amount"] / 100);
                            }
                        }
                    }
                });
            }, function() {});
        }

        /**
         * @title: 打开红包弹框
         * @param: flag 是否直接是打开的状态
         */
        showRedPacket(flag) {
            let $redclose = $mask.find(".red-close");
            if (flag) {
                $mask.find(".close").hide();
                $redclose.show().siblings().hide();
            } else {
                $mask.find(".close").show();
                $redclose.hide().siblings().show();
            }
            $mask.show();
        }
    }
    let internal = {
        isLogin: function(callback, errback) {
            if (userinfo) {
                callback();
            } else {
                errback();
            }
        },
        share: function() {
            shareFB.layer_show();
        }
    }

    new NewGift();
});
