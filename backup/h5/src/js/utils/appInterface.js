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
        }]);

        return AppInterface;
    }();

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
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.timeout = 0;
            xhr.responseType = "json";
            xhr.onload = function () {
                if (xhr.status === 200 && xhr.readyState === 4) {
                    var res = xhr.response;
                    res = typeof res == "string" ? JSON.parse(res) : res;
                    callback(res);
                } else {
                    console.log('request is fail');
                }
            };
            xhr.send(null);
        }
    };

    module.exports = new AppInterface();
});
//# sourceMappingURL=../../maps/utils/appInterface.js.map
