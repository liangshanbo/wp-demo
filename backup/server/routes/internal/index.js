/**
 * title: server内部提供的接口,
 * ctime: 2017-02-21
 */
module.exports = function(Router, config) {
    Router.get(["/internal/login"], function(req, res) {
        if (req.session && req.session.userInfo) {
            res.send(req.session.userInfo);
            return;
        }
        res.send(false);
    });
    Router.get(["/internal/rmsession"], function(req, res) {
        if (req.session && req.session.userInfo) {
            req.session = null;
        }
    });
    return Router;
}
