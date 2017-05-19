var request = require('../public/request');
var static = {
    csspath: 'register/index.css',
    jspath: 'register/index.js'
};

module.exports = function(Router, config) {
    Router.get("/register", function(req, res) {
        request.get('/user/countries',"",req,function(data) {
            //console.log(JSON.stringify(data))
            res.render('register/index', {
                title: 'Register',
                config: global.config,
                static: static,
                result:data
            });
        })
    })

    Router.get("/register/agreement", function(req, res) {
        res.render('register/agreement', {
            config: global.config,
            source: req.query.source
        });
    });
    return Router;
};
