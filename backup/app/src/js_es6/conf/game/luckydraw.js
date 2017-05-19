/**
 * @title:幸运大抽奖
 * @time:  2017-04-25
 * @author: wangchunpeng
 */
define("conf/game/luckydraw", function(require, exports, module) {
    require("$");
    let DrawCore = require("conf/game/luckydraw_core"),
        appInterface = require("utils/appInterface"),
        Login = require("mods/login/index");

    class LuckyDraw extends DrawCore {
        constructor(props) {
            super(props);
        }
        getLogin(callback) {
            Login.getLoginStatus(function() {
                callback();
            },function() {
                callback();
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
            url += "/hy/game/luckydraw";
            appInterface.call("/common/share", {
                title: "LuckyDraw",
                desc: "Lucky Draw",
                imgUrl: wapcsspath + "/images/game/luckydraw/share.jpg",
                link: url,
                shareType: "gameShare"
            }, function(data) {});
        }
        toast(msg) {
            appInterface.toast(msg);
        }
    }

    new LuckyDraw();
});
