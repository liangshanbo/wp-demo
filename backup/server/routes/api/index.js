var request = require('../public/request');

function get_url(url) {
    return url.substr(4);
}

function save_session(req, url, data) {
    if (url == "/user/login" && data.code == "200") {
        req.session.userInfo = data.data;
    }
    if (url == "/user/logout") {
        req.session = null;
    }
    if (url == "/user/user" && data.code == "200") {
        req.session.userInfo = data.data;
    }
    if (url == "/user/thirdPartyAccountRegister" && data.code == 200) {
        req.session.userInfo = data.data;
    }
    if (url == "/user/register" && data.code == 200) {
        req.session.userInfo = data.data;
    }
}

function save_session_get(req, url, data) {
    if (url.indexOf("/user/thirdPartyAccountLogin") >= 0 && data.code == 200) {
        if (data.data.isBound) {
            req.session.userInfo = data.data;
        }
    }
}

module.exports = function(Router, config) {
    var isAjax = true;//判断是否是从前端请求
    Router.get('/api/*', function(req, res) {
        var url = get_url(req.originalUrl),
            end = url.indexOf("?");
        end = end > 0 ? end : url.length;
        url = url.substr(0, end);
        request.get(url, req.query, req, function(data) {
            save_session_get(req, url, data);
            res.status(200).send(JSON.stringify(data));
        },isAjax);
    });

    Router.post('/api/*', function(req, res) {
        var url = get_url(req.originalUrl),
            body = req.body;
        // for(var key in req.body){
        //     break;
        // }
        // console.log(JSON.parse(key));
        request.post(url, req.body, req, function(data) {
            save_session(req, url, data);
            res.status(200).send(JSON.stringify(data));
        },isAjax);
    });

    Router.put('/api/*', function(req, res) {
        var url = get_url(req.originalUrl);
        request.put(url, req.body, req, function(data) {
            res.status(200).send(JSON.stringify(data));
        },isAjax);
    });

    Router.delete('/api/*', function(req, res) {
        var url = get_url(req.originalUrl);
        request.delete(url, req.body, req, function(data) {
            res.status(200).send(JSON.stringify(data));
        },isAjax);
    });
    return Router;
}
