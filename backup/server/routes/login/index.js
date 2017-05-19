var request = require('../public/request');
module.exports = function(Router, config) {
    Router.get("/login", function(req, res) {
        var static = {
            csspath: 'login/index.css',
            jspath: 'login/index.js'
        };
        request.get('/user/countries',"",req,function(data){
            //console.log(req.query["phone"])
            res.render('login/index', {
                title: 'Login',
                config: global.config,
                static: static,
                phone: req.query["phone"]?req.query["phone"]:"",
                result:data,
                area:req.query["area"]
            });
        })
    });
    Router.get("/login/associated", function(req, res){
        var static = {
            csspath: 'login/associated.css',
            jspath: 'login/associated.js'
        };
        request.get('/user/countries',"",req,function(data) {
            //console.log(JSON.stringify(data))
            res.render('login/associated', {
                title: 'ASSOCIATED PHONE',
                config: global.config,
                static: static,
                result:data,
                phone: req.query["phone"]
            });
        })
    });
    return Router;
};
