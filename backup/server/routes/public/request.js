var request = require('request');
var ifConfig = require('./ifconfig');
var config = require('../../config')[process.env.NODE_ENV];
module.exports = {
    get: function(url, params, req, callback, isAjax) {
        url = urlencode(url, params);
        request_interface('get', url, req, callback, "", isAjax);
    },
    put: function(url, params, req, callback, isAjax) {
        params = Object.assign({}, ifConfig.config.com, params);
        request_interface('put', url, req, params, callback, isAjax);
    },
    post: function(url, params, req, callback, isAjax) {
        params = Object.assign({}, ifConfig.config.com, params);
        request_interface('post', url, req, params, callback, isAjax);
    },
    delete: function(url, params, req, callback, isAjax) {
        url = urlencode(url, params);
        request_interface('delete', url, req, callback, "", isAjax);
    }
};

function request_interface(method, url, req, params, callback, isAjax) {
    var obj = Object.assign({}, {
        url: config.url
    }, ifConfig.config);
    obj.headers = Object.assign({}, ifConfig.headers);
    /*  if(method === "get"){
          url = urlencode(url.indexOf('?') > -1 ? url + "&" : url + '?',{pageNum:1,pageSize:10})
      }*/
    obj.url += url;
    obj.method = method;
    if (typeof params === 'function') {
        callback = params;
    } else {
        obj.body = params;
    }
    if (req.session && req.session.userInfo) {
        obj.headers["X-Gomeplus-User-Id"] = req.session.userInfo["user"]["id"];
        obj.headers["X-Gomeplus-Login-Token"] = req.session.userInfo["loginToken"];
    }
    obj.headers["X-Gomeplus-Trace-Id"] = new Date().valueOf() + Math.floor(Math.random() * 10000);
    obj.headers["X-Gomeplus-Device"] = ifConfig.headers["X-Gomeplus-Device"] + req.cookies["gomeplus_wap_device"];
    // console.log('-- 完整请求 --', obj);
    request(obj, function(error, res, data) {
        if (error) {
            filter_error(error, res);
            return;
        }
        if (res.statusCode === 401 && isAjax === undefined) {
            if (!/\/user\/itemCollectVerifyAction\?itemId/.test(url)) {
                req.session = null;
                global.w_response.redirect("/login?redirect=" + encodeURIComponent(req.url));
                return;
            }
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
        return (url.indexOf('?') > -1 ? url : url + '?') + search.slice(0, -1);
    }
    return url;
}

function filter_error(error) {
    console.log(error);
}
