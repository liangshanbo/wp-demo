/**
 * title: server内部提供的接口,
 * ctime: 2017-02-21
 */
module.exports = function(Router) {
    Router.get(["/internal/login"], function(req, res) {
        if (req.session && req.session.userInfo) {
            res.send(req.session.userInfo);
        }
        res.send(false);
    });
    return Router;
}
