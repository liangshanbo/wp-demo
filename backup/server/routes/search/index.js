var request = require('../public/request'),
    Login = require("../../controller/login");
var static = {
    csspath: 'search/index.css',
    jspath: 'search/index.js'
};

module.exports = function(Router, config) {
    Router.get("/search", function(req, res) {
        var keyword = req.query['keyword'] ? req.query['keyword'] : "",
            params = req.query;
        params.isFacetsIncluded = true;
        params.pageNum = 1;
        params.pageSize = 10;
        request.get('/ext/item/searchItems', params, req, function(data) {
            //console.log(JSON.stringify(data))
            res.render('search/index', {
                title: keyword+'- GOMEPLUS',
                config: global.config,
                static: static,
                result: data,
                keyword: keyword,
                userId: Login.getUserid(req)
            });
        })
    })
    return Router;
};