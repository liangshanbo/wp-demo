/**
 * Created by Hao on 2016-06-03.
 */

var exec = require('child_process').exec;
var await = require('asyncawait/await');
var async = require('asyncawait/async');
var request = require('request');
var constants = require('../lib/constants');
module.exports = function(Router) {

  Router.get('/login', function(req, res) {
    res.render('login');
  });

  Router.post('/logout', function(req, res) {
    req.session = null;
    res.redirect('/login');
  });

  function saveLogin(req, res, email, pwd, userInfo) {
    var maxAge = 1000 * 60 * 60 * 24 * 1; // 一天
    req.sessionOptions.maxAge = new Date(Date.now() + maxAge);
    req.session.userInfo = userInfo;
    req.session.isLogin = true;
  }

  function svnLogin (req, res, email, pwd) {
    exec("svn --non-interactive --username " + email + " --password " + pwd + " ls https://svn.gomeo2o.cn:8443/gomeo2o_H5/",
        function(err) {
          if (err) {
            var regFail = new RegExp("Authentication failed", "gim");
            var regFail2 = new RegExp("Authentication realm", "gim");
            var regFail3 = new RegExp("authorization failed", "gim");
            var regForb = new RegExp("forbidden", "gim");
            var errMsg = err.toString();
            if (regFail.test(errMsg) || regFail2.test(errMsg) || regFail3.test(errMsg)) {
              req.flash('用户名或密码不正确');
              res.redirect('back');
            } else if (regForb.test(errMsg)) {
              req.flash('用户没有权限');
              res.redirect('back');
            } else {
              req.flash(errMsg);
              res.redirect('back');
            }
          } else {
            saveLogin(req, res, email, pwd, {
              username: email,
              password: pwd,
              sysType: constants.SVN,
              auth: '--username' + email + ' --password ' + pwd + ' '
            });
            res.redirect('/');
          }
        });
  }

  function gitLogin (req, res, username, pwd) {
    request.post(constants.GITAUTH,
        {
          form: {
            grant_type: 'password',
            username: username,
            password: pwd
          }
        },function (err,httpResponse,body){
          /*request.get("http://gitlab.intra.gomeplus.com/api/v3/projects?access_token="+JSON.parse(body).access_token, function(err,httpResponse,body){
            console.log(body)
          })*/
          console.log(body)
          try {
            var json = JSON.parse(body);
            if (json.error) {
              //console.log("我就是个错误...",body, json.error_description);
              var regFail = new RegExp("invalid_grant", "gim");
              console.log(json);
              if (regFail.test(json.error)) {
                req.flash('用户没有权限');
              }
              res.redirect('back');
            }else {
              saveLogin(req, null, username, pwd, {
                username: username,
                password: pwd,
                sysType: constants.GITLAB,
                access_token: json.access_token,
                auth: '--username' + username + ' --password ' + pwd + ' '
              });
              res.redirect('/');
            }
          }catch (e) {
            req.flash('请求出错,请重试');
            res.redirect('back');
          }
        }
    );
  }
  Router.post('/login', function(req, res) {
    if (req.session.isLogin) {
      res.redirect('/');
    } else {
      var email = req.body.username,
        pwd = req.body.pwd,
        sysType = req.body.sysType;
        console.log(sysType = req.body.sysType,constants.GITLAB);
      if (!email || !pwd) {
        console.log('用户名或密码不正确');
        res.redirect('back');
        return;
      }

      if (sysType === constants.SVN) {
        svnLogin(req, res, email, pwd);
      }else if (sysType === constants.GITLAB){
        gitLogin(req, res, email, pwd);
      }
    }
  });

  Router.all('/', function(req, res) {
    if (req.session) {
      if (req.session.userInfo) {
        if (req.session.userInfo.sysType === constants.SVN) {
          res.redirect('/panel');
        }else if (req.session && req.session.userInfo.sysType === constants.GITLAB) {
          res.redirect('/gitPanel');
        }
      }else {
        res.redirect('/login');
      }
    }
  });

  Router.get(/^((?!\/css|\/img|\/mods|\/js).)*$/, function(req, res, next) {
    if (req.session.isLogin) {
      /*用户输入浏览器地址栏URL路由权限控制*/
      next();
    } else {
      res.redirect('/login');
    }
  });

  return Router;
};
