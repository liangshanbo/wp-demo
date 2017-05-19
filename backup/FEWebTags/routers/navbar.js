/**
 * Created by Hao on 2016-06-06.
 */
module.exports = function(Router) {
    Router.get('/navbar', function(req, res) {
        res.render('navbar');
    });
    return Router;
};