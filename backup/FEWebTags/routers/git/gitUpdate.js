/**
 * @author fuqiang
 * @date 20151128
 * @fileoverview 用户登陆控制器和权限校验
 */
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var logger = require('../../lib/log').logger;
var loggerError = require('../../lib/log').loggerError;
var config = require("../../config.json");
var projectsPaths = config.projectsPaths;
var webhome = config.webhome;
var constants = require('../../lib/constants');
var request = require("request");
var exec = require('child_process').exec;
var fs = require('fs');
var wss = require('../../lib/ws').ws;
var wsR = null;
wss.on('connection', function connection(ws) {
  wsR = ws;
  ws.on('message', function incoming(signal) {
  });
  ws.on('close', function close() {
  });
  //ws.send('something');
});
module.exports = function(Router) {

  Router.get('/gitUpdate', function(req, res) {
    if(req.session.userInfo && req.session.userInfo.sysType !== 'gitlab'){
            res.redirect('/panel');
            return;
        }
    request.get(constants.GITLABAPI + "/projects?access_token=" +
        req.session.userInfo.access_token + "&per_page=100",
        function(err,httpResponse,body){
          var json = JSON.parse(body);
          if (json.error) {

          }else {
            json = json.sort(function(a, b){
              if (a.name > b.name) {
                return 1;
              }else if (a.name < b.name) {
                return -1;
              }else {
                return 0;
              }
            });
            var arr = [];
            for (i in json) {
              var name_with_namespace = json[i].name_with_namespace.split('/')[0].trim();
              if(json[i].permissions.project_access !== null && name_with_namespace === 'overseasFED'){
                arr.push(json[i]); 
              }
            }
            res.render('update', {
              mods: arr,
              current: 'update',
              sysType: constants.GITLAB,
              projectUrl: constants.GITLABURL,
              userName: req.session.username
            });
          }

        })
  });

  Router.post('/upgit', function(req, res) {
    var project= req.body.project;
    var p = req.body.p;
    async(function() {
      var ret = await(exec("cd " + webhome + p + '/' + project +" && git pull origin develop",function(err,ret){
        var data = {};
        if(err){
          data = {
            type:'err',
            msg : err
          };
        }else{
          data = {
            type:'ret',
            msg : ret
          };
        }
	      if(wsR){
		      wsR.send(JSON.stringify(data));
	      }
      }));
      //res.send('更新成功');
      res.send('更新成功');
      var pr = {
        type:'ret',
        msg:'更新成功'
      };
	    if(wsR){
		    wsR.send(JSON.stringify(pr));
	    }
      logger.info(req.session.userInfo.username + " 成功更新git：" + project);
    })();
  });

  Router.post('/createRelease', function(req, res) {
    var projectUrl = req.body.projectUrl;
    var p = req.body.p;
    var projectName = req.body.projectName;
    var projectId = req.body.projectId;
    try{
      request.get(constants.GITLABAPI + "/projects/"+projectId+
          "/repository/branches/develop?access_token=" +
          req.session.userInfo.access_token,
          function(err,httpResponse,body) {
            var json = JSON.parse(body);
            if (json.message == "404 Branch Not Found") {
              res.send("branch Not Found");
              var pr = {
                type:'ret',
                msg:'branch Not Found'
              };
	            if(wsR){
		            wsR.send(JSON.stringify(pr));
	            }
            }else{
              if (fs.existsSync(webhome + p + '/' + projectName)) {
                res.send("already");
                var pr = {
                  type:'ret',
                  msg:'already'
                };
	              if(wsR){
		              wsR.send(JSON.stringify(pr));
	              }
              }else {
                exec('cd ' + webhome + p + ' && git clone -b develop '+ projectUrl,function(err,ret){
                      var data = {};
                      if(err){
                        loggerError.error(err);
                        data = {
                          type:'err',
                          msg : err
                        };
                        logger.info(projectUrl + '的develop分支下载失败！！！！');
                        res.send('fail');
                        var pr = {
                          type:'err',
                          msg:projectUrl + '的develop分支下载失败！！！！'
                        };
	                      if(wsR){
		                      wsR.send(JSON.stringify(pr));
	                      }
                      }else{
                        data = {
                          type:'ret',
                          msg : ret
                        };
                        logger.info(projectUrl + '的develop分支下载成功！！！！');
                        res.send("创建成功");
                        var pr = {
                          type:'ret',
                          msg:'创建成功'
                        };
	                      if(wsR){
		                      wsR.send(JSON.stringify(pr));
	                      }
                      }
		                if(wsR){
			                wsR.send(JSON.stringify(data));
		                }
                });
              }
            }
      });
    }catch(err){
      if(err){
        loggerError.error(err);
        res.send("fail");
        var pr = {
          type:'err',
          msg:'失败'
        };
	      if(wsR){
		      wsR.send(JSON.stringify(pr));
	      }
      }
    }
  });

  Router.get('/gitversion', function(req, res) {
    var project = req.query.project;
    var p = req.query.p;
    var projectId = req.query.projectId;
    async(function(){
      if(fs.existsSync(webhome+ p +'/' + project + '/.git')){
        res.send('git');
        return false;
	    }
      if(fs.existsSync(webhome + p + '/' + project)){
        var ret = await (req.exec(webhome + p + '/' + project + ' && svn info', {
          precmd: 'cd'
        }));
        if(ret.indexOf('Working Copy Root Path') > -1){
          res.send('svn');
        } else {
          res.send('noRepository');
        }
        return false;
      } else{
        res.send('noRepository');
        return false;
      }
    })()
  });
  Router.get('/checkoutGit',function(req,res){
    var projectUrl = req.query.projectUrl;
    var project = req.query.project;
    var p = req.query.p;
    try{
      if(fs.existsSync(webhome + p + '/' + project)){
        exec('mv ' + webhome + p + '/' + project + ' ' + webhome + p + '/SVN' + project + ' && cd ' + webhome + p + ' && git clone -b develop ' + projectUrl, function (error, stdout, stderr) {
          console.log(error,stdout);
          if (error) {
            status = false;
            res.send(error);
            var pr = {
              type:'err',
              msg:error
            };
	          if(wsR){
		          wsR.send(JSON.stringify(pr));
	          }
            return false
          }
          res.send('success');
          var pr = {
            type:'err',
            msg:'切换git仓库成功'
          };
	        if(wsR){
		        wsR.send(JSON.stringify(pr));
	        }
        });
      }
    }catch(err){
      if(err){
        res.send('切换git仓库失败请重新切换');
        var pr = {
          type:'err',
          msg:'切换git仓库失败请重新切换'
        };
	      if(wsR){
		      wsR.send(JSON.stringify(pr));
	      }
      }
    }
  });
  return Router;
};
