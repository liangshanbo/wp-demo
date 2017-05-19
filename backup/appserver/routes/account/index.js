/**
 * title: 我的账户
 * ctime: 2017-03-22
   anthor: zhangenming
 */

var request = require('../public/request');

module.exports = function(Router, config) {
    /*
    礼品卡兑换
    */
    Router.get(["/account/exchange"], function(req, res) {
        var static = {
            csspath: "/account/exchange.css",
            jspath: "/account/exchange.js"
        };
        // 手动加登录header，调试用
        // req.headers["id"] = "100036421712"
        // req.headers["logintoken"] = "2037cd3e725346799e5c436b7fc62aeb";
        // req.headers["deviceid"] = "h5/1.0.0/browser/1491791311152";
        if (req.headers.id) {
            request.get('/trade/giftCards', {}, req, function(data) {
                res.render('account/exchange', {
                    title: 'REDEEM',
                    result: data,
                    config: global.config,
                    isApp: true,
                    static: static
                });
            });
        } else {
            request.get('/common/login', {}, req, function(data) {
                console.log(data);
            });
        }
    });

    /*
    我的礼品卡
    */
    Router.get(["/account/giftcard"], function(req, res) {
        var static = {
            csspath: "/account/giftcard.css",
            jspath: "/account/giftcard.js"
        };
        console.log(global.config);
        // 手动加登录header，调试用
        // req.headers["id"] = "100036421712"
        // req.headers["logintoken"] = "2037cd3e725346799e5c436b7fc62aeb";
        // req.headers["deviceid"] = "h5/1.0.0/browser/1491791311152";
        if (req.headers.id) {
            request.get('/trade/myGiftCards', {}, req, function(data) {
                res.render('account/giftcard', {
                    title: 'MY GIFT CARDS',
                    result: data,
                    config: global.config,
                    isApp: true,
                    static: static
                });
            });
        }
    });

    return Router;
}
