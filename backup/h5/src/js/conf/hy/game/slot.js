"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @title: 老虎机
 * @time:  2017-03-08
 * @author: wangchunpeng
 * 子类需实现方法 [login,get_login,toast]
 */
define("conf/hy/game/slot", function (require, exports, module) {
    var userId = "",
        hasLogin = false;
    if (window.userinfo) {
        userId = userinfo.user.id;
        hasLogin = true;
    }
    window.userId = userId;
    window.hasLogin = hasLogin;
    var Slot = require("conf/hy/game/slotmachine"),
        UI = require('UI/dialog/alert.js'),
        _login = require('mods/login'),
        Share = require('mods/share/shareDialog'),
        appCall = require("utils/appCall"),
        Mobile = require("mods/check/mobile"),
        dlApp = require("utils/dlApp");

    var shareFB = new Share({
        title: "SlotMachine",
        description: "Slot Machine",
        picture: wapcsspath + "/images/game/laohuji/share.gif",
        shareType: "gameShare",
        type: "gif",
        success: function success() {
            UI.alertSecond("share success");
            setTimeout(function () {
                location.reload();
            }, 200);
        },
        failed: function failed() {
            UI.alertSecond("share failed");
        }
    });

    var SlotH5 = function (_Slot) {
        _inherits(SlotH5, _Slot);

        function SlotH5(props) {
            _classCallCheck(this, SlotH5);

            var _this = _possibleConstructorReturn(this, (SlotH5.__proto__ || Object.getPrototypeOf(SlotH5)).call(this, props));

            var self = _this;
            _this._superinit();
            appCall.callH5({
                url: "/game/slotmachine"
            });
            setTimeout(function () {
                self._share_init();
            }, 0);
            return _this;
        }

        _createClass(SlotH5, [{
            key: "_superinit",
            value: function _superinit() {
                var hasLogin = false,
                    $popup = $("#popup"),
                    self = this,
                    $download = $("#download");

                self.get_login(function () {
                    $(".btns .btn_download").show();
                    $download.show();
                    hasLogin = true;
                }, function () {});

                if (hasLogin) {
                    if (Mobile.isIOS) {
                        $download.find(".down_android").hide();
                        $download.find(".down_ios").show();
                    }
                    $(window).scroll(function () {
                        if (document.body.scrollTop > 0) {
                            $download.hide();
                        } else {
                            $download.show();
                        }
                    });
                    $popup.find(".download li.no").on("click", function () {
                        $popup.hide();
                    });
                    $popup.find(".download li.yes").on("click", function () {
                        self.download();
                    });
                    $download.on("click", function () {
                        self.download();
                    });
                }
            }
        }, {
            key: "_share_init",
            value: function _share_init() {
                window.fbAsyncInit = function () {
                    FB.init({
                        appId: '125552021295455',
                        xfbml: true,
                        version: 'v2.8'
                    });
                    FB.AppEvents.logPageView();
                };
                (function (d, s, id) {
                    var js,
                        fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {
                        return;
                    }
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6";
                    fjs.parentNode.insertBefore(js, fjs);
                })(document, 'script', 'facebook-jssdk');
            }
        }, {
            key: "get_login",
            value: function get_login(callback, errback) {
                if (userinfo) {
                    callback();
                } else {
                    errback();
                }
            }
        }, {
            key: "login",
            value: function login(callback) {
                _login.login();
            }
        }, {
            key: "share",
            value: function share() {
                shareFB.layer_show();
            }
        }, {
            key: "toast",
            value: function toast(msg) {
                UI.alertSecond(msg);
            }
        }, {
            key: "download",
            value: function download() {
                dlApp.dl();
            }
        }]);

        return SlotH5;
    }(Slot);

    new SlotH5();
});
//# sourceMappingURL=../../../../maps/conf/hy/game/slot.js.map
