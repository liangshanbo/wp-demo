var request = require('request');
var ifConfig = require('./ifconfig');
var config = require('../../config')["config"][process.env.NODE_ENV];
console.log(config);

module.exports = {
    get: function(url, params, req, callback) {
        // url = urlencode(url, params);
        request_interface('get', url, req, callback);
    },
    put: function(url, params, req, callback) {
        params = Object.assign(ifConfig.config.com, params);
        request_interface('put', url, req, params, callback);
    },
    post: function(url, params, req, callback) {
        params = Object.assign(ifConfig.config.com, params);
        request_interface('post', url, req, params, callback);
    },
    delete: function(url, params, req, callback) {
        url = urlencode(url, params);
        request_interface('delete', url, req, callback);
    }
};

function request_interface(method, url, req, params, callback) {
    var obj = Object.assign({}, {
        url: config.url
    }, ifConfig.config);
    obj.headers = Object.assign({}, ifConfig.headers);

    obj.url += url;
    obj.method = method;
    if (typeof params === 'function') {
        callback = params;
    } else {
        obj.body = params;
    }
    var headers = req.headers;
    console.log("test:")
    if (headers.id) {
        console.log("test:headers.id")
        obj.headers["X-Gomeplus-User-Id"] = headers.id || '';
        obj.headers["X-Gomeplus-Login-Token"] = headers.logintoken || headers.loginToken || '';
        obj.headers["X-Gomeplus-Device"] = headers.deviceid || headers.deviceId || '';
    } else if (req.cookies["gomeplus-userid"]) {
        console.log("test:cookies")
        obj.headers["X-Gomeplus-User-Id"] = req.cookies["gomeplus-userid"];
        obj.headers["X-Gomeplus-Login-Token"] = req.cookies["gomeplus-usertoken"];
        obj.headers["X-Gomeplus-Device"] = req.cookies["gomeplus-deviceid"] || obj.headers["X-Gomeplus-Device"];
    }
    console.log('-- 完整请求 --', obj);
    request(obj, function(error, res, data) {
        if (error) {
            filter_error(error, res);
        }
        data instanceof Object ? data.code = res.statusCode : data;
        callback && callback(data, res);
    });
}

function urlencode(url, params) {
    if (typeof params === 'object') {
        var search = '';
        for (var p in params) {
            search += p + '=' + params[p].toString() + '&';
        }
        // for(var c in ifConfig.com){
        //  search += c + '=' + ifConfig.com[c].toString() + '&';
        // }
        return (url.indexOf('?') > -1 ? url : url + '?') + search.slice(0, -1);
    }
    return url;
}

function filter_error(error) {
    console.log(error);
}
