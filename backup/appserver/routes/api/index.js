var request = require('../public/request');

function get_url(url) {
    return url.substr(4);
}

function save_session(req, url, data) {
    if (url == "/user/login" && data.code == "200") {
        req.session.userInfo = data.data;
    }
    if (url == "/user/loginout") {
        req.session = null;
    }
    if (url == "/user/user" && data.code == "200") {
        req.session.userInfo = data.data;
    }
}

module.exports = function(Router) {
    Router.get('/api/*', function(req, res) {
        var url = get_url(req.originalUrl);
        request.get(url, req.query, req, function(data) {
            res.status(200).send(JSON.stringify(data));
        });
    });

    Router.post('/api/*', function(req, res) {
        var url = get_url(req.originalUrl);
        request.post(url, req.body, req, function(data) {
            save_session(req, url, data);
            res.status(200).send(JSON.stringify(data));
        });
    });

    Router.put('/api/*', function(req, res) {
        var url = get_url(req.originalUrl);
        request.put(url, req.body, req, function(data) {
            res.status(200).send(JSON.stringify(data));
        });
    });

    Router.delete('/api/*', function(req, res) {
        var url = get_url(req.originalUrl);
        request.delete(url, req.body, req, function(data) {
            res.status(200).send(JSON.stringify(data));
        });
    });
    return Router;
}
