/**
 * @title: 活动页面 
 * @time:  2017-03-22
 */
var request = require('../public/request');

module.exports = function (Router, config) {
    Router.get("/f", function (req, res) {
        res.redirect(301,'/invite/regist' + (req._parsedUrl.search || ''));
    });
    return Router;
}