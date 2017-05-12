"use strict";

/*
    name:browser_model.js
    description:判断浏览器类型
    anthor:wanglonghai
    data:2016-10-26
 */
define("mods/check/browser_model.js", function (require, exports, module) {

    var ua = navigator.userAgent;

    var isQQ = function () {
        return !!ua.match(/Q\//i);
    }();

    var isWeiBo = function () {
        return !!ua.match(/Weibo/i);
    }();

    var isWeiXin = function () {
        return !!ua.match(/MicroMessenger/i);
    }();

    var isWeiOrQQ = function () {
        return isWeiXin || isQQ;
    }();

    module.exports = { isQQ: isQQ, isWeiBo: isWeiBo, isWeiXin: isWeiXin, isWeiOrQQ: isWeiOrQQ };
});
//# sourceMappingURL=../../../maps/mods/check/browser.js.map
