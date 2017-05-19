"use strict";

/**
 * @title:幸运大抽奖
 * @time:  2017-04-25
 * @author: wangchunpeng
 */
define("conf/game/lucky_app", function (require, exports, module) {
    require("$");
    var appInterface = require("utils/appInterface");

    $("#gohome").on("click", function () {
        appInterface.callApp("/main/mainOpen?tab=MALL", function () {});
    });
    $("#fb").on("click", function () {
        appInterface.call("/common/share", {
            title: "LuckyDraw",
            desc: "LuckyDraw",
            imgUrl: wapcsspath + "/images/game/laohuji/share.gif",
            link: "https://m.gomeplus.in",
            shareType: "activityShare"
        }, function (data) {});
    });
});
//# sourceMappingURL=../../src/maps/conf/game/lucky_app.js.map
