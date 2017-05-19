var request = require('../public/request'),
    Login = require("../../controller/login");

module.exports = function(Router, config) {
    Router.get("/index/popularlist", function(req, res) {
       var static = {
            csspath: 'goods/cateDetail.css',
            jspath: 'index/popularlist.js'
        };
        
        request.get('/ext/item/popular',"", req, function(data) {
       // console.log(JSON.stringify(data))
            res.render('index/popularlist', {
                title: 'HEADLINES',
                config: global.config,
                static: static,
                result: data,
                userId: Login.getUserid(req)
            });
        })
        //banner和推荐位
        
    });
    return Router;

}
