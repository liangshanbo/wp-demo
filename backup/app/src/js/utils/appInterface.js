"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @title: H5与App沟通协议
 * @time:  2017-02-28
 * @author: wangchunpeng
 */
define("utils/appInterface", function (require, exports, module) {
    require("lib/polyfill/string");

    var AppInterface = function () {
        function AppInterface() {
            _classCallCheck(this, AppInterface);
        }

        _createClass(AppInterface, [{
            key: "call",

            /**
             * @title: 客户端通信
             * @param  {[type]}   url      [description] 客户端通信url           [必填]
             * @param  {[type]}   params   [description] 给客户端传递参数        [选填]
             * @param  {Function} callback [description] 客户端触发H5的回调函数  [必填]
             */
            value: function call(url, params, callback) {
                if (arguments.length === 2) {
                    callback = params;
                    params = {};
                }
                url = internal.joinurl(url, params);
                internal.do(url, callback);
            }
        }, {
            key: "toast",
            value: function toast(msg) {
                var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;

                this.call("/common/toast", {
                    msg: msg,
                    timeout: timeout
                }, function () {});
            }
            /**
             * title: 内嵌页面调起另一个内嵌页面
             */

        }, {
            key: "callWebView",
            value: function callWebView(url, callback) {
                var href = location.host,
                    h5url = href.indexOf("-pre") > 0 ? "https://h5-pre.gomeplus.in" : "https://h5.gomeplus.in";
                h5url = encodeURIComponent(h5url + url);
                this.call("/nativeCall", {
                    target: "gomeplusos://os.mx.com/hybrid/webViewOpen?url=" + h5url
                }, callback);
            }
            /**
             * @title: 内嵌页面调起app页面
             */

        }, {
            key: "callApp",
            value: function callApp(url, callback) {
                this.call("/nativeCall", {
                    target: "gomeplusos://os.mx.com" + url
                }, callback);
            }
        }]);

        return AppInterface;
    }();

    var ajaxs = {};
    var internal = {
        joinurl: function joinurl(url, obj) {
            var params = "_mobile_bridge=1";
            for (var item in obj) {
                params += "&" + item + "=" + encodeURIComponent(obj[item]);
            }
            url += (url.includes("?") ? "&" : "?") + params;
            return url;
        },
        do: function _do(url, callback) {
            if (ajaxs[url]) {
                ajaxs[url].abort();
                delete ajaxs[url];
            }
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.timeout = 0;
            xhr.responseType = "json";
            ajaxs[url] = xhr;
            xhr.onload = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var res = xhr.response;
                        res = typeof res == "string" ? JSON.parse(res) : res;
                        callback(res);
                    } else {
                        console.log('request is fail');
                    }
                    delete ajaxs[url];
                }
            };
            xhr.send(null);
        }
    };

    module.exports = new AppInterface();
});
//# sourceMappingURL=../src/maps/utils/appInterface.js.map
