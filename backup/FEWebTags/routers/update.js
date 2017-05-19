/**
 * @author fuqiang
 * @date 20151128
 * @fileoverview 用户登陆控制器和权限校验
 */
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var fs = require('fs');
var exec = require('child_process').exec;
var spawnSync = require('child_process').spawnSync;
var logger = require('../lib/log').logger;
var loggerError = require('../lib/log').loggerError;
var config = require("../config.json");
var projectsPaths = config.projectsPaths;
var webhome = config.webhome;
var constants = require('../lib/constants');
var wss = require('../lib/ws').ws;
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
  Router.get('/update', function(req, res) {
    if(req.session.userInfo && req.session.userInfo.sysType !== 'svn'){
            res.redirect('/gitPanel');
            return;
        }
    res.render('update', {
      mods: projectsPaths,
      current: 'update',
      sysType: constants.SVN,
      projectUrl: constants.SVNURL,
      userName: req.session.userName
    });
  });

  Router.post('/upsvn', function(req, res) { //这是更新哪里的？？？？
    var type = req.body.type;
    var p = req.body.p;
    async(function() {
      var ret = await (req.exec('up '+ webhome + p + '/m/' + type));
      //res.send('<link href="/css/iframe.css" rel="stylesheet">' + ret);
      res.send(ret);
      logger.info(req.session.userInfo.username + " 成功更新svn：" + type);
    })();
  });

  Router.get('/svnversion', function(req, res) {
    var type = req.query.type;
    var p = req.query.p;
    async(function() {
	    if(fs.existsSync(webhome+ p +'/m/' + type + '/.git')){
		    res.send('git');
		    return false;
	    }
	    if(fs.existsSync(webhome + p + '/m/' + type)){
		    var ret = await (req.exec(webhome + p + '/m/' + type + ' && svn info', {
			    precmd: 'cd'
		    }));
		    if(ret.indexOf('Working Copy Root Path') > -1){
			    res.send(ret.replace(/\n/g, '<br>'));
		    } else {
			    res.send('noRepository');
		    }
		    return false;
	    } else{
		    res.send('noRepository');
		    return false;
	    }
    })();
  });
  Router.get('/checkoutSvn',function(req,res){
    var project = req.query.project;
    var p = req.query.p;
    if(fs.existsSync(webhome + p + '/m/SVN' + project) && fs.existsSync(webhome + p + '/m/' + project)){
      exec('rm -rf ' + webhome + p + '/m/' + project + ' && mv '+ webhome + p + '/m/SVN' + project + ' ' + webhome + p + '/m/' + project,function(err,ret){
        var data = {};
        if(err){
          data = {
            type:'err',
            msg:err
          };
        }else{
          data = {
            type:'ret',
            msg:ret
          };
        }
	      if(wsR){
		      wsR.send(JSON.stringify(data));
	      }
      }).on('exit',function(){
        logger.info(project + '将git仓库切换为svn仓库成功');
        res.send("success");
      })
    }else if(fs.existsSync(webhome + p + '/m/SVN' + project)){
      exec('mv '+ webhome + p + '/m/SVN' + project + ' ' + webhome + p + '/m/' + project).on('exit',function(){
        var data = {};
        if(err){
          data = {
            type:'err',
            msg:err
          };
        }else{
          data = {
            type:'ret',
            msg:ret
          };
        }
	      if(wsR){
		      wsR.send(JSON.stringify(data));
	      }
        logger.info(project + '将git仓库切换为svn仓库成功');
        res.send("success");
      })
    }else{
      logger.info(project + '没有已存在的svn仓库');
      res.send("没有已存在的svn仓库");
    }
  });
  return Router;
};
