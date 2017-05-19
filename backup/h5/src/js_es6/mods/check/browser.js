/*
    name:browser_model.js
    description:判断浏览器类型
    anthor:wanglonghai
    data:2016-10-26
 */
define("mods/check/browser_model.js", function(require, exports, module) {
    
    let ua = navigator.userAgent; 

    let isQQ = (() => {return !!ua.match(/Q\//i);})();

    let isWeiBo = (() => {return !!ua.match(/Weibo/i);})();

    let isWeiXin = (() => {return !!ua.match(/MicroMessenger/i);})();

    let isWeiOrQQ = (() => {return isWeiXin || isQQ;})();

    module.exports = {isQQ,isWeiBo,isWeiXin,isWeiOrQQ};
});

