/**
 * @title: 老虎机
 * @time:  2017-03-08
 * @author: wangchunpeng
 * 子类需实现方法 [login,get_login,toast]
 */
define("conf/hy/game/slot", function(require, exports, module) {
    let userId = "",
        hasLogin = false;
    if (window.userinfo) {
        userId = userinfo.user.id;
        hasLogin = true;
    }
    window.userId = userId;
    window.hasLogin = hasLogin;
    let Slot = require("conf/hy/game/slotmachine"),
        UI = require('UI/dialog/alert.js'),
        login = require('mods/login'),
        Share = require('mods/share/shareDialog'),
        appCall = require("utils/appCall"),
        Mobile = require("mods/check/mobile"),
        dlApp = require("utils/dlApp");

    let shareFB = new Share({
        title: "SlotMachine",
        description: "Slot Machine",
        picture: wapcsspath + "/images/game/laohuji/share.gif",
        shareType: "gameShare",
        type: "gif",
        success: function() {
            UI.alertSecond("share success");
            setTimeout(function() {
                location.reload();
            }, 200);
        },
        failed: function() {
            UI.alertSecond("share failed");
        }
    });
    class SlotH5 extends Slot {
        constructor(props) {
            super(props);
            let self = this;
            this._superinit();
            appCall.callH5({
                url: "/game/slotmachine"
            });
            setTimeout(function() {
                self._share_init();
            }, 0);
        }
        _superinit() {
            let hasLogin = false,
                $popup = $("#popup"),
                self = this,
                $download = $("#download");

            self.get_login(function() {
                $(".btns .btn_download").show();
                $download.show();
                hasLogin = true;
            }, function() {});

            if (hasLogin) {
                if (Mobile.isIOS) {
                    $download.find(".down_android").hide();
                    $download.find(".down_ios").show();
                }
                $(window).scroll(function() {
                    if (document.body.scrollTop > 0) {
                        $download.hide();
                    } else {
                        $download.show();
                    }
                });
                $popup.find(".download li.no").on("click", function() {
                    $popup.hide();
                });
                $popup.find(".download li.yes").on("click", function() {
                    self.download();
                });
                $download.on("click", function() {
                    self.download();
                });
            }
        }
        _share_init() {
            window.fbAsyncInit = function() {
                FB.init({
                    appId: '125552021295455',
                    xfbml: true,
                    version: 'v2.8'
                });
                FB.AppEvents.logPageView();
            };
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }
        get_login(callback, errback) {
            if (userinfo) {
                callback();
            } else {
                errback();
            }
        }
        login(callback) {
            login.login();
        }
        share() {
            shareFB.layer_show();
        }
        toast(msg) {
            UI.alertSecond(msg);
        }
        download() {
            dlApp.dl();
        }
    }

    new SlotH5();
});
