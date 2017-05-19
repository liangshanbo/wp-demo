var request = require('../public/request');
module.exports = function(Router, config) {
    Router.get("/forgot", function(req, res) {
        var static = {
            csspath: 'forgot/index.css',
            jspath: 'forgot/index.js'
        };
        request.get('/user/countries',"",req,function(data) {
            //console.log(JSON.stringify(data))
            res.render('forgot/index', {
                title: 'RESET PASSWORD',
                config: global.config,
                static: static,
                result:data
            });
        })
    })
    
    Router.get("/forgot/setpwd", function(req, res) {
        var static = {
            csspath: 'forgot/setpwd.css',
            jspath: 'forgot/setpwd.js'
        };
        res.render('forgot/setpwd', {
            title: 'Create a new password',
            config: global.config,
            static: static
        });
    })
    return Router;
};
