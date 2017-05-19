var static = {
    csspath: 'notFind/notFind.css',
    jspath: 'notFind/index.js'
};

module.exports = function(Router, config) {
    Router.get("/500", function(req, res) {
        res.render('500', {
            title: '500',
            config: global.config,
            static: static
        });
    })
    return Router;
};
