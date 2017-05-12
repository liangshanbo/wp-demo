"use strict";

/*
    name:mobile_model.js
    description:手机型号判断
    anthor:wanglonghai
    data:2016-10-26
 */
define("mods/check/mobile.js", function (require, exports, module) {
    require("lib/polyfill/string");
    var ua = navigator.userAgent;

    var isAndroid = function () {
        return ua.includes('Android');
    }();
    var isIOS = function () {
        return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    }();
    var isIOSegt9 = function () {
        return isIOS ? Boolean(ua.match(/OS ([9]|\d{2,})_\d[_\d]* like Mac OS X/i)) : false;
    }();

    module.exports = { isIOS: isIOS, isIOSegt9: isIOSegt9, isAndroid: isAndroid };
});
//# sourceMappingURL=../../../maps/mods/check/mobile.js.map
