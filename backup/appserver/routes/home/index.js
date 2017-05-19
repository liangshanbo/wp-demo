var static = {
    csspath: 'style.css',
    jspath: 'home/index.js'
};

module.exports = function(Router) {
    Router.get('/', function(req, res) {
        res.render('index', {
            title: 'Index',
            static: static
        });
    });
    return Router;
}
