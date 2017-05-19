/**
 * @title: 幸运大抽奖
 * @time:  2017-04-26
 * @author: wangchunpeng
 */
define("conf/hy/game/luckydraw", function(require, exports, module) {
    let DrawCore = require("conf/hy/game/luckydraw_core"),
        Share = require('mods/share/shareDialog'),
        UI = require('UI/dialog/alert.js'),
        userId = "",
        hasLogin = false;
    if (window.userinfo) {
        userId = userinfo.user.id;
        hasLogin = true;
    }
    window.userId = userId;
    window.hasLogin = hasLogin;

    let shareFB = new Share({
        picture: wapcsspath + "/images/game/luckydraw/share.jpg",
        shareType: "gameShare",
        type: "gif"
    });
    class LuckyDraw extends DrawCore {
        constructor(props) {
            super(props);
        }
        share() {
            shareFB.layer_show();
        }
        toast(msg) {
            UI.alertSecond(msg);
        }
    }

    new LuckyDraw();
});
