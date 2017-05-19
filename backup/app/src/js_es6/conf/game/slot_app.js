/**
 * @title: 老虎机-调用客户端
 * @time:  2017-03-16
 * @author: wangchunpeng
 */
define("conf/game/slot_app", function(require, exports, module) {
    let Login = require("mods/login/index"),
        appInterface = require("utils/appInterface"),
        Slot = require("conf/game/slotmachine");

    // let Cookie = require("mods/storage/cookie");
    // Cookie.setCookie("gomeplus-userid", "100036421577", 1);
    // Cookie.setCookie("gomeplus-usertoken", "3374950166d14e7a91f13f8ce33dea5d", 1); //TODO

    class SlotApp extends Slot {
        constructor(props) {
            super(props);
        }
        get_login(callback, errback) {
            Login.getLoginStatus(callback, errback);
        }
        login(callback) {
            let self = this;
            Login.gotoLogin(function(data) {
                self._get_bonus();
                callback(data);
            });
        }
        share() {
            let self = this,
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
            }, function(data) {
                if (data.code === 200) {
                    setTimeout(function() {
                        location.reload();
                    }, 200);
                }
            });
        }
        toast(msg) {
            appInterface.toast(msg);
        }
        callGift() { // 调起app的"我的账户"页面
            appInterface.callApp("/member/mineBalanceOpen",function() {

            });
        }
    }

    new SlotApp();
});
