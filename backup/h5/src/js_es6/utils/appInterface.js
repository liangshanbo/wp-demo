/**
 * @title: H5与App沟通协议
 * @time:  2017-02-28
 * @author: wangchunpeng
 */
define("utils/appInterface", function(require, exports, module) {
    require("lib/polyfill/string");
    
    class AppInterface {
        /**
         * @title: 客户端通信
         * @param  {[type]}   url      [description] 客户端通信url           [必填]
         * @param  {[type]}   params   [description] 给客户端传递参数        [选填]
         * @param  {Function} callback [description] 客户端触发H5的回调函数  [必填]
         */
        call(url, params, callback) {
            if (arguments.length === 2) {
                callback = params;
                params = {};
            }
            url = internal.joinurl(url, params);
            internal.do(url, callback);
        }
        toast(msg, timeout = 2000) {
            this.call("/common/toast", {
                msg: msg,
                timeout: timeout
            }, function() {})
        }
    }

    let internal = {
        joinurl(url, obj) {
            let params = "_mobile_bridge=1";
            for (let item in obj) {
                params += `&${item}=${encodeURIComponent(obj[item])}`;
            }
            url += (url.includes("?") ? "&" : "?") + params;
            return url;
        },
        do(url, callback) {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.timeout = 0;
            xhr.responseType = "json";
            xhr.onload = () => {
                if (xhr.status === 200 && xhr.readyState === 4) {
                    let res = xhr.response;
                    res = (typeof res == "string") ? JSON.parse(res) : res;
                    callback(res);
                } else {
                    console.log('request is fail');
                }
            }
            xhr.send(null);
        }
    }

    module.exports = new AppInterface();
});
