/**
 * @author fuqiang
 * @date 20160629
 * @fileoverview svnexec 中间件
 */

var exec = require('../lib/svnCMD');

module.exports = function(app) {
  app.use(function(req, res, next) {
    var userInfo = req.session.userInfo;
    if (userInfo) {
      var username = userInfo.username;
      var pwd = userInfo.password;
      req.exec = function(cmd, params) {
        return exec(cmd, username, pwd, params);
      };
    }
    next();
  });
};
