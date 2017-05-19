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
define("utils/async/ajax", function(require, exports, module) {
    require('lib/polyfill/object.js');
    let alert = require('UI/dialog/alert.js');

    const defaults_xhr = {
        defaults: {
            type: 'post',
            dataType: 'json',
            success: function() {},
            error: function() {},
            data: null
        }
    };

    class Ajax {
        constructor() {
            if (typeof window.fetch !== "undefined") {
                this._ajax = this._fetch;
            } else {
                this._ajax = this._xhr;
            }
        }
        query(params) {
            this._ajax(Object.assign({ type: "GET" }, params));
        }
        post(params) {
            this._ajax(Object.assign({ type: "POST" }, params));
        }
        put(params) {
            this._ajax(Object.assign({ type: "PUT" }, params));
        }
        delete(params) {
            this._ajax(Object.assign({ type: "DELETE" }, params));
        }
        _xhr(options) {
            if (!options.url) {
                alert.alertSecond("url是必填参数");
                return;
            }
            let df = defaults_xhr,
                xmlhttp = new XMLHttpRequest(),
                ops = Object.assign({}, df.defaults, options);

            if (ops.data && ops.type == "GET") {
                ops.url = this._url_get(ops.url, ops.data);
            }
            xmlhttp.open(ops.type, ops.url, true);
            xmlhttp.setRequestHeader("Content-type", "application/json");
            xmlhttp.responseType = ops.dataType;
            // xmlhttp.timeout = 3000;
            xmlhttp.onload = () => {
                if (xmlhttp.status === 200 && xmlhttp.readyState === 4) {
                    // let res = xmlhttp.response || {};
                    // if (typeof res === 'object' && 'code' in res && res['code'] === 401) {
                    //     alert.alertSecond(res.message);
                    // }
                    let res = xmlhttp.response;
                    res = (typeof res == "string") ? JSON.parse(res) : res;
                    ops.success(res);
                } else {
                    console.log('request is fail');
                }
            }
            xmlhttp.ontimeout = () => {
                console.log('请求超时');
            }
            let data = JSON.stringify(ops.data || {})
            xmlhttp.send(data || null);
        }
        _fetch(options) {
            if (!options.url) {
                alert.alertSecond("url是必填参数");
                return;
            }
            let args = {
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

            fetch(options.url, args)
                .then(function(res) {
                    if (res.ok) {
                        //暂时只处理json格式的数据
                        // if (res.headers.get("content-type").indexOf("application/json") >= 0) {
                        res.json().then(function(data) {
                            options.success(data);
                        });
                        // } else {
                        // alert.alertSecond("暂不支持此格式");
                        // }
                    }
                });
        }
        _formatParams(obj) {
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
        _fetchParams(obj) {
            let str = "";
            for (let key in obj) {
                str += key + "=" + obj[key] + "&";
            }
            return str.substr(0, str.length - 1);
        }
        _url_get(url, obj) {
            let arr = [];
            for (let key in obj) {
                arr.push(key + "=" + obj[key]);
            }
            url += (url.includes("?") ? "&" : "?") + arr.join("&");
            return url;
        }
    }

    module.exports = new Ajax();
});
