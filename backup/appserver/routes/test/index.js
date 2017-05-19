/**
 * @title: 测试 调用app协议页面
 * @author: wangchunpeng
 * @ctime: 2017-04-05
 */
var request = require('../public/request');

module.exports = function(Router) {
    var static = {
        csspath: 'test/callApp.css',
        jspath: 'test/callApp.js'
    };
    Router.get('/test/callApp', function(req, res) {
        res.render('test/callApp', {
            static: static,
            title: "App协议测试"
        });
    });
    return Router;
}
