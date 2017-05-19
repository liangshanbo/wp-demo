var request = require('../public/request');
module.exports = function(Router, config) {

    Router.get("/invite/regist", function(req, res) {
        var static = {
            csspath: 'invite/regist.css',
            jspath: 'invite/regist.js'
        };
        /*res.render('invite/regist', {
            title: 'Invite Friends',
            config: global.config,
            static: static
        });*/
        request.get('/user/countries',"",req,function(data){
            res.render('invite/regist', {
                title: 'Invite Friends',
                config: global.config,
                static: static,
                result:data
            });
        })
    })
    
    Router.get("/invite/setPassword", function(req, res) {
        var static = {
            csspath: 'invite/setPassword.css',
            jspath: 'invite/setPassword.js'
        };
        res.render('invite/setPassword', {
            title: 'Invite Friends',
            config: global.config,
            static: static
        });
    })
    return Router;
};
