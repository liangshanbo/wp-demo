var login = require("../../controller/login");
var request = require('../public/request');

module.exports = function(Router, config) {
    Router.get(["/rebate", "/rebate/index"], login.isAuthenticated, function(req, res) {
        var static = {
            csspath: "rebate/index.css",
            jspath: "rebate/index.js"
        }
        var params = {
            status: "ALL",
            pageNum: 1,
            pageSize: 10
        }
        request.get('/ext/trade/orders', params, req, function(data) {
            // console.log(global.config);
            // console.log('--- 订单列表返回 ---', data);
            // data.data.orders = [];
            res.render('rebate/index', {
                title: 'Order list',
                config: global.config,
                static: static,
                result: data
            });
        });
    });
    Router.get("/rebate/detail", function(req, res) {
        var static = {
            csspath: '/rebate/detail.css',
            jspath: '/rebate/detail.js'
        };
        var params2 = {
            orderId: req.query.orderId
        }
        request.get('/ext/trade/orderDetail', params2, req, function(data) {
            // console.log('--- 订单详情返回 ---', data.data);
            res.render('rebate/detail', {
                title: 'Order details',
                config: global.config,
                static: static,
                result: data
            });
        });
    });

    Router.get(["/rebate/introduction"], function(req, res) {
        var static = {
            csspath: 'goods/goodintroduction.css',
            jspath:""
        }
        res.render('rebate/introduction', {
            title: 'Order Description',
            config: global.config,
            static: static
        });
    });
    return Router;
 }
