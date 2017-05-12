'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * [description] ajax
 * 2017-02-08
 * query 查询get方法
 * post  post
 *
 * params:  {
    url: "", // 必填
    type: "", // 选填 [get,post]
    success: function() {}, //选填 成功的回调
    error: function(){}, // 选填 失败的回调
    data: null, // 选填
    dataType: "" //选填
}
 */
define("utils/async/ajax", function (require, exports, module) {
    require('lib/polyfill/object.js');
    require('lib/polyfill/string.js');
    var alert = require('UI/dialog/alert.js');

    var defaults_xhr = {
        xmlhttp: new XMLHttpRequest(),
        defaults: {
            type: 'post',
            dataType: 'json',
            success: function success() {},
            error: function error() {},
            data: null
        }
    };

    var Ajax = function () {
        function Ajax() {
            _classCallCheck(this, Ajax);

            if (typeof window.fetch !== "undefined") {
                this._ajax = this._fetch;
            } else {
                this._ajax = this._xhr;
            }
        }

        _createClass(Ajax, [{
            key: 'query',
            value: function query(params) {
                this._ajax(Object.assign({ type: "GET" }, params));
            }
        }, {
            key: 'post',
            value: function post(params) {
                this._ajax(Object.assign({ type: "POST" }, params));
            }
        }, {
            key: 'put',
            value: function put(params) {
                this._ajax(Object.assign({ type: "PUT" }, params));
            }
        }, {
            key: 'delete',
            value: function _delete(params) {
                this._ajax(Object.assign({ type: "DELETE" }, params));
            }
        }, {
            key: '_xhr',
            value: function _xhr(options) {
                if (!options.url) {
                    alert.alertSecond("url是必填参数");
                    return;
                }
                var df = defaults_xhr,
                    xmlhttp = new XMLHttpRequest(),
                    ops = Object.assign({}, df.defaults, options);

                if (ops.data && ops.type == "GET") {
                    ops.url = this._url_get(ops.url, ops.data);
                }
                xmlhttp.open(ops.type, ops.url, true);
                xmlhttp.setRequestHeader("Content-type", "application/json");
                xmlhttp.responseType = ops.dataType;
                // xmlhttp.timeout = 3000;
                xmlhttp.onload = function () {
                    if (xmlhttp.status === 200 && xmlhttp.readyState === 4) {
                        // let res = xmlhttp.response || {};
                        // if (typeof res === 'object' && 'code' in res && res['code'] === 401) {
                        //     alert.alertSecond(res.message);
                        // }
                        var res = xmlhttp.response,
                            text = "Your login status has expired, please log in again";
                        if (res.code === 401) {
                            if (res.error.code === "US-10013") {
                                text = "Your account has been logged in elsewhere";
                            }
                            alert.alertBox({
                                text: text,
                                cancelCallback: function cancelCallback() {
                                    location.assign("/");
                                },
                                callback: function callback() {
                                    var url = location.pathname + location.search;
                                    location.assign('/login?redirect=' + encodeURIComponent(url));
                                }
                            });
                        } else {
                            res = typeof res == "string" ? JSON.parse(res) : res;
                            ops.success(res);
                        }
                    } else {
                        console.log('request is fail');
                    }
                };
                xmlhttp.ontimeout = function () {
                    console.log('请求超时');
                };
                var data = JSON.stringify(ops.data || {});
                xmlhttp.send(data || null);
            }
        }, {
            key: '_fetch',
            value: function _fetch(options) {
                if (!options.url) {
                    alert.alertSecond("url是必填参数");
                    return;
                }
                var args = {
                    method: options.type,
                    mode: 'cors',
                    cache: 'default',
                    credentials: 'include', // 请求带上cookies，是每次请求保持会话一直
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                if (options.data) {
                    if (options.type == "GET") {
                        options.url = this._url_get(options.url, options.data);
                    } else {
                        args.body = JSON.stringify(options.data || {});
                    }
                }
                fetch(options.url, args).then(function (res) {
                    if (res.ok) {
                        //暂时只处理json格式的数据
                        // if (res.headers.get("content-type").indexOf("application/json") >= 0) {
                        res.json().then(function (data) {
                            var text = "Your login status has expired, please log in again";
                            if (data.code === 401) {
                                if (data.error.code === "US-10013") {
                                    text = "Your account has been logged in elsewhere";
                                }
                                alert.alertBox({
                                    text: text,
                                    cancelCallback: function cancelCallback() {
                                        location.assign("/");
                                    },
                                    callback: function callback() {
                                        var url = location.pathname + location.search;
                                        location.assign('/login?redirect=' + encodeURIComponent(url));
                                    }
                                });
                            }
                            options.success(data);
                        });
                        // } else {
                        // alert.alertSecond("暂不支持此格式");
                        // }
                    }
                });
            }
        }, {
            key: '_formatParams',
            value: function _formatParams(obj) {
                // let formdata = new FormData();
                // for (let key in obj) {
                //     formdata.append(key, obj[key]);
                // }
                // return formdata;
                // var arr = new Array();
                // var i = 0;
                // for (var attr in obj) {
                //     arr[i] = encodeURIComponent(attr) + "=" + encodeURIComponent(obj[attr]);
                //     i++;
                // }
                // return arr.join("&");
                var data = new FormData();
                data.append("json", JSON.stringify(obj));
                return data;
            }
        }, {
            key: '_fetchParams',
            value: function _fetchParams(obj) {
                var str = "";
                for (var key in obj) {
                    str += key + "=" + obj[key] + "&";
                }
                return str.substr(0, str.length - 1);
            }
        }, {
            key: '_url_get',
            value: function _url_get(url, obj) {
                var arr = [];
                for (var key in obj) {
                    arr.push(key + "=" + obj[key]);
                }
                url += (url.includes("?") ? "&" : "?") + arr.join("&");
                return url;
            }
        }]);

        return Ajax;
    }();

    module.exports = new Ajax();
});
//# sourceMappingURL=../../../maps/utils/async/ajax.js.map
