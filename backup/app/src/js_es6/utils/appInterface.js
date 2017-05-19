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
            /**
             * title: 内嵌页面调起另一个内嵌页面
             */
        callWebView(url, callback) {
                let href = location.host,
                    h5url = href.indexOf("-pre") > 0 ? "https://h5-pre.gomeplus.in" : "https://h5.gomeplus.in";
                h5url = encodeURIComponent(h5url + url);
                this.call("/nativeCall", {
                    target: "gomeplusos://os.mx.com/hybrid/webViewOpen?url=" + h5url
                }, callback);
            }
            /**
             * @title: 内嵌页面调起app页面
             */
        callApp(url, callback) {
            this.call("/nativeCall", {
                target: "gomeplusos://os.mx.com" + url
            }, callback);
        }
    }

    let ajaxs = {};
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
            if (ajaxs[url]) {
                ajaxs[url].abort();
                delete ajaxs[url];
            }
            let xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.timeout = 0;
            xhr.responseType = "json";
            ajaxs[url] = xhr;
            xhr.onload = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let res = xhr.response;
                        res = (typeof res == "string") ? JSON.parse(res) : res;
                        callback(res);
                    } else {
                        console.log('request is fail');
                    }
                    delete ajaxs[url];
                }

            }
            xhr.send(null);
        }
    }

    module.exports = new AppInterface();
});
