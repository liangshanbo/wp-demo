var request = require('../public/request'),
    login = require("../../controller/login");

module.exports = function(Router, config) {
    Router.get(["/user", "/user/index"], login.isAuthenticated, function(req, res) {
        var static = {
            csspath: "mine/index.css",
            jspath: "mine/user.js"
        }
        request.get('/user/user',"",req,function(data){
            //console.log(JSON.stringify(data))
            res.render('user/index', {
                title: 'My GomePlus',
                result: data.data,
                config: global.config,
                static: static
            });
        });
    });

    Router.get("/user/collection", login.isAuthenticated, function(req, res) {
        var static = {
            csspath: "mine/collection.css",
            jspath: "mine/collection.js"
        }
        request.get('/user/items',{pageNum:1,pageSize:10},req,function(data){
            //console.log(JSON.stringify(data));
            res.render('user/collection', {
                title: 'My Wishlist',
                result: data,
                config: global.config,
                static: static,
                userId: login.getUserid(req)
            });
        })
    });

    Router.get("/user/help", function(req, res) {
        res.render('user/help', {
            config: global.config,
            source: req.query.source
        });
    });

    return Router;
}
