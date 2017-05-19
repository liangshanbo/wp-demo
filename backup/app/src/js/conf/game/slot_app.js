"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @title: 老虎机-调用客户端
 * @time:  2017-03-16
 * @author: wangchunpeng
 */
define("conf/game/slot_app", function (require, exports, module) {
    var Login = require("mods/login/index"),
        appInterface = require("utils/appInterface"),
        Slot = require("conf/game/slotmachine");

    // let Cookie = require("mods/storage/cookie");
    // Cookie.setCookie("gomeplus-userid", "100036421577", 1);
    // Cookie.setCookie("gomeplus-usertoken", "3374950166d14e7a91f13f8ce33dea5d", 1); //TODO

    var SlotApp = function (_Slot) {
        _inherits(SlotApp, _Slot);

        function SlotApp(props) {
            _classCallCheck(this, SlotApp);

            return _possibleConstructorReturn(this, (SlotApp.__proto__ || Object.getPrototypeOf(SlotApp)).call(this, props));
        }

        _createClass(SlotApp, [{
            key: "get_login",
            value: function get_login(callback, errback) {
                Login.getLoginStatus(callback, errback);
            }
        }, {
            key: "login",
            value: function login(callback) {
                var self = this;
                Login.gotoLogin(function (data) {
                    self._get_bonus();
                    callback(data);
                });
            }
        }, {
            key: "share",
            value: function share() {
                var self = this,
                    url = location.hostname;
                if (url.indexOf("dev") > 0) {
                    url = "http://m-dev.gomeplus.in";
                } else if (url.indexOf("pre") > 0) {
                    url = "http://m-pre.gomeplus.in";
                } else {
                    url = "https://m.gomeplus.in";
                }
                url += "/hy/game/slot";
                appInterface.call("/common/share", {
                    title: "SlotMachine",
                    desc: "Slot Machine",
                    imgUrl: wapcsspath + "/images/game/laohuji/share.gif",
                    link: url,
                    // link: wapcsspath + "/images/game/laohuji/share.gif",
                    shareType: "gameShare"
                }, function (data) {
                    if (data.code === 200) {
                        setTimeout(function () {
                            location.reload();
                        }, 200);
                    }
                });
            }
        }, {
            key: "toast",
            value: function toast(msg) {
                appInterface.toast(msg);
            }
        }, {
            key: "callGift",
            value: function callGift() {
                // 调起app的"我的账户"页面
                appInterface.callApp("/member/mineBalanceOpen", function () {});
            }
        }]);

        return SlotApp;
    }(Slot);

    new SlotApp();
});
//# sourceMappingURL=../../src/maps/conf/game/slot_app.js.map
