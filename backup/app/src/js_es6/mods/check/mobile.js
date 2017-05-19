/*
    name:mobile_model.js
    description:手机型号判断
    anthor:wanglonghai
    data:2016-10-26
 */
define("mods/check/mobile", function(require, exports, module) {
    require("lib/polyfill/string");
    let ua = navigator.userAgent; 

    let isAndroid = (() => { return ua.includes('Android');})();
    let isIOS = (() => { return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);})();
    let isIOSegt9 = (() => {
        return isIOS?Boolean(ua.match(/OS ([9]|\d{2,})_\d[_\d]* like Mac OS X/i)):false;
    })();

    module.exports = {isIOS,isIOSegt9,isAndroid};
});

