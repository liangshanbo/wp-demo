var request = require('../public/request'),
    Login = require("../../controller/login");

module.exports = function(Router, config) {
    Router.get("/", function(req, res) {
        var static = {
            csspath: 'index/index.css',
            jspath: 'index/index.js'
        };
        var params = {
                pageType: "AaP0001",
                pageModule: "AaP0001M0003",
                pageSize: 10,
                pageNum: 1
            }
            // console.log(global.config);
        request.get('/ext/recommendation/items', params, req, function(data) {
            //console.log(JSON.stringify(data));
            request.get('/combo/mall', "", req, function(data1) {
                //console.log(JSON.stringify(data1));
                res.render('index/index', {
                    title: 'Coupons, Promo Codes，Cashback Offers - GOMEPLUS',
                    config: global.config,
                    static: static,
                    result: data,
                    hasLogin: Login.hasLogin(req),
                    userId: Login.getUserid(req),
                    result1: data1
                });
            })
        });
        //banner和推荐位

    });
    return Router;

}