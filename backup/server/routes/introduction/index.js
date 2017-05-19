module.exports = function(Router, config) {
    Router.get("/introduction", function(req, res) {
        var static = {
            csspath: "introduction/index.css"
        }
        res.render('introduction/index', {
            static:static,
            config: global.config
        });

    });
    return Router;

}