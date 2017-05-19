var static = {
    csspath: 'notFind/notFind.css',
    jspath: 'notFind/index.js'
};

module.exports = function(Router, config) {
    Router.get("/404", function(req, res) {
        res.render('404', {
            title: '404',
            config: global.config,
            static: static
        });
    })
    return Router;
};
