/**
 * title: 验证是否是登录状态
 * ctime: 2017-02-21
 */
module.exports = {
    isAuthenticated: function(req, res, next) {
        if (req.session && req.session.userInfo) {
            return next();
        }
        res.redirect("/login?redirect=" + encodeURIComponent(req.url));
    },
    isApiAuth: function(req, res, next) {
    	if (req.session && req.session.userInfo) {
            return next();
        }
    },
    hasLogin: function(req) {
        if (req.session && req.session.userInfo) {
            return true;
        }
        return false;
    },
    getUserid: function(req) {
        if (req.session && req.session.userInfo) {
            return req.session.userInfo.user.id;
        }
        return 0;
    }
}
