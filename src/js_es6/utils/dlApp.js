/**
 * [description] H5站 下载APP
 * 2017-04-20
 * author: wangchunpeng    
 */
define("utils/dlApp", function(require, exports, module) {
    let Mobile = require("mods/check/mobile");

    function dl() {
        if (Mobile.isIOS) {
            location.href = "https://itunes.apple.com/us/app/gomeplus-always-smarter-choice/id1225149476";
        } else {
            location.href = "https://play.google.com/store/apps/details?id=com.mx.os.play";
        }
    }
    module.exports = { dl }
});
