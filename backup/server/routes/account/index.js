/**
 * title: 我的账户
 * ctime: 2017-03-22
   anthor: zhangenming
 */

var request = require('../public/request');
var login = require("../../controller/login");

module.exports = function(Router, config) {
    /*
    账户余额明细
    */
    Router.get(["/account", "/account/index"], login.isAuthenticated, function(req, res) {
        var static = {
            csspath: "/account/index.css",
            jspath: "/account/index.js"
        };
        var params = {
            pageNum: 1,
            pageSize: 10
        };
        request.get('/account/balance', params, req, function(data) {
            //console.log('\n-- 账户余额 --\n\n', data.data);
            // data.data.details = [];
            res.render('account/index', {
                title: 'ACCOUNT',
                result: data,
                config: global.config,
                static: static
            });
        });

    });


    /*
    礼品卡兑换
    */
    Router.get(["/account/exchange"], login.isAuthenticated, function(req, res) {
        var static = {
            csspath: "/account/exchange.css",
            jspath: "/account/exchange.js"
        };
        var params = {

        };
        request.get('/trade/giftCards', params, req, function(data) {
            // console.log('\n-- 礼品卡兑换 --\n\n', data);
            // data.data.giftCards = [];
            res.render('account/exchange', {
                title: 'EXCHANGE',
                result: data,
                config: global.config,
                isApp: false,
                static: static
            });
        });
    });

    /*
    我的礼品卡
    */
    Router.get(["/account/giftcard"], login.isAuthenticated, function(req, res) {
        var static = {
            csspath: "/account/giftcard.css",
            jspath: "/account/giftcard.js"
        };
        var params = {

        };
        request.get('/trade/myGiftCards', "", req, function(data) {
            //console.log('\n-- 我的礼品卡列表 --\n\n', data);
            // data.data.myGiftCards = [];
            res.render('account/giftcard', {
                title: 'My gift card',
                result: data,
                config: global.config,
                isApp: false,
                static: static
            });
        });
    });

    return Router;
}
