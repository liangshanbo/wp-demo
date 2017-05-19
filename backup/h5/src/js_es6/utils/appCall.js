/**
 * [description] H5站 callApp
 * 2017-03-30
 * author: wangchunpeng    
 */
define("utils/appCall", function(require, exports, module) {
    /**
     * @title: H5站 callApp
     * @param  {[type]}   params [description] 参数 {url: 打开webview的完整路径, title: 标题 [选填]}
     * 
     */
    require("$");
    let Mobile = require("mods/check/mobile");
    let callH5 = (params) => {
        if (!params || !params["url"]) {
            return;
        }
        params = params || {};
        let url = location.hostname;
        if (url.indexOf("dev") > 0) {
            url = "http://h5-dev.gomeplus.in";
        } else if (url.indexOf("pre") > 0) {
            url = "http://h5-pre.gomeplus.in";
        } else {
            url = "https://h5.gomeplus.in";
        }
        params["url"] = url + params.url;
        let arr = [];
        for (var key in params) {
            arr.push(`${key}=${encodeURIComponent(params[key])}`);
        }
        call("gomeplusos://os.mx.com/hybrid/webViewOpen?" + arr.join("&"));
    }
    let callApp = (params) => {
        if (!params || !params["url"]) {
            return;
        }
        call("gomeplusos://os.mx.com" + params["url"]);
    }

    let call = (src) => {
        if (Mobile.isAndroid) {
            let ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf("samsung") > 0) { //单独处理三星手机
                location.href = src;
            } else {
                var appIframe = document.createElement('iframe');
                appIframe.style.display = 'none';
                appIframe.src = src;
                document.body.appendChild(appIframe);
                window.setTimeout(function () {
                    //document.body.removeChild(appIframe);
                }, 2000);
            }
        } else {
            location.href = src;
        }
    }
    module.exports = { callH5, callApp };
});
