/**
 * @author fuqiang
 * @date 20151128
 * @fileoverview 用户登陆控制器和权限校验
 */

var async = require('asyncawait/async');
var multiStream = require('multistream');
var await = require('asyncawait/await');
var moment = require('moment');
var os = require('os');
var pinyin = require('pinyin');
var Calendar = require('../lib/calendar.js');
var config = require('../config.json');
var projectsPaths = config.projectsPaths;
var basepath = config.basepath;
var targetpath = config.targetpath;
var logger = require('../lib/log').logger;
var loggerError = require('../lib/log').loggerError;
var constants = require('../lib/constants');
var exec = require('child_process').exec;
var path = require('path');
var obj = {}; //记录状态,防止冲突,同步操作  wangchunpeng
var wss = require('../lib/ws').ws;
var wsR = null;
wss.on('connection', function connection(ws) {
  wsR = ws;
  ws.on('message', function incoming(signal) {

  });
  ws.on('close', function close() {

  });
});
exec('wc -l ./publics/logs/logs.log',function(error,stdout,stderr){
	var num = parseInt(stdout.match(/\d+/ig)[0]);
	if (num > 1000){
		var count = num - 1000;
		//var pathName = path.join(__dirname,'./publics/logs/');
		exec("cd publics/logs/  && sed -i '1," + count + " d' logs.log",function(error,stdout,stderr){
			if(error){
				console.log(error);
			}
		})
	}
});
module.exports = function(Router) {

  Router.get('/panel', function(req, res) {
    if(req.session.userInfo && req.session.userInfo.sysType !== 'svn'){
            res.redirect('/gitPanel');
            return;
        }
    res.render('panel', {
      mods: projectsPaths,
      current: 'panel',
	  sysType: constants.SVN,
	  projectUrl: constants.SVNURL
	});
  });

  Router.get('/tags', function(req, res) {
    var type = req.query.type;
    //rmTags("app");
    async(function() {
      var list = await (req.exec('ls ' + basepath + type + '/tags/'));
      list = list.split("/" + os.EOL);
      list.splice(list.length - 1);
      res.send(list.sort(function(a, b) {
        a = a.split("--")[0];
        b = b.split("--")[0];
        return b - a;
      }));
    })();
  });

  Router.get("/updateUI", function(req, res) {
    async(function() {
      var ret = await (req.exec('up /home/fuqiang-ds1/web/UIweb/gomeplusUI'));
      res.send(ret);
    })();
  });

  Router.post('/hitTag', function(req, res) {
    var svnpath = req.body.svnpath;
    if (obj[svnpath]) {
      //log 日志
      logger.warn(req.session.userInfo.username + " 在打Tag时发生冲突，因为有人正在打tag");
      res.send("有人正在打tag,请稍后....");
	    //var data = {
		 //   type:'ret',
		 //   msg:"有人正在打tag,请稍后...."
	    //};
	    //wsR.send(JSON.stringify(data));
      return;
    }
    //obj[svnpath] = 1;

    async(function() {
     var data_msg = await (req.exec('log -l 1 ' + basepath + svnpath + '/trunk'));
     data_msg = data_msg.replace(/\n|\r|-|1 行/gi, '').split('|');
      var tip = data_msg[3].trim();
      var timestamp = moment().format('YYYYMMDDHHmm');
      var version = timestamp + "--" + data_msg[0].trim() + "--" + data_msg[1].trim() + "--" + pinyin(tip).join("_");

      version = encodeURIComponent(version.replace(/\s+|\(|\)|\.|\//gi, '_'));
      /*
      var cmdret = await (req.exec([
        'cp ' + basepath + svnpath + '/trunk ' + targetpath + svnpath + '_temp',
        'cp ' + basepath + svnpath + '/trunk ' + basepath + svnpath + '/tags/' + version,
        'rm ' + targetpath + svnpath,
        'mv ' + targetpath + svnpath + '_temp ' + targetpath + svnpath
      ], {
        hasMsg:true
      }));
      */
      var mystreams = await (req.exec([
        'cp ' + basepath + svnpath + '/trunk ' + targetpath + svnpath + '_temp',
        'cp ' + basepath + svnpath + '/trunk ' + basepath + svnpath + '/tags/' + version,
        'rm ' + targetpath + svnpath,
        'mv ' + targetpath + svnpath + '_temp ' + targetpath + svnpath
      ], {
        hasMsg:true,
        isStream:true
      }));
        
      //delete obj[svnpath];
      //res.send('<link rel="stylesheet" href="/css/iframe.css">' + cmdret.join('<br>'));
      multiStream(mystreams).pipe(res);
      //mystreams.pipe(process.stdout);

      //log 日志
      var logVersion;
      if (data_msg.length > 1) {
        logVersion = data_msg[0].trim();
      } else {
        logVersion = '未知';
      }
      //var logUser = datas[2];
      logger.info(req.session.userInfo.username + " 成功在 " + svnpath + " 打Tag，版本为：" + logVersion);
      //log 日志 end
    })().catch(function(err){
        console.log(err);
        res.send(err);
    });
  });



  Router.post('/rollback', function(req, res) { //回滚
    var target = req.body.target;
    var p = req.body.p;
    if (!p) {
      //log 日志
      logger.warn(req.session.userInfo.username + " 在回滚时未选择版本号");

      res.send("回滚:请选择版本号");
      return;
    }
    p = p.trim();
    async(function() {
      var cmdret = await (req.exec([
        'rm ' + targetpath + target,
        'cp ' + basepath + target + '/tags/' + p + ' ' + targetpath + target
      ], {
        hasMsg:true
      }));
      multiStream(cmdret).pipe(res);
      //res.send('<link rel="stylesheet" href="/css/iframe.css">' + cmdret.join('<br>'));
    })();
  });
  Router.post("/rmtags", function(req, res) { //删除tags
    var tags = req.body.tags || [];
    var target = req.body.target;
    if (typeof tags === 'string') {
      tags = [tags];
    }
    if (!tags.length) {
      //log 日志
      logger.warn(req.session.userInfo.username + " 在删除时未选择版本号");
      res.send("请选择要删除的版本号");
      return;
    }
    async(function() {
      var cmds = tags.map(function(tag) {
        return 'rm -rf ' + basepath + target + '/tags/' + tag;
      });
      console.log(cmds);
      var mystreams = await (req.exec(cmds,{
        hasMsg:true,
        isStream:true
      }));
      //res.send('<script>alert(\'成功删除版本:' + tags + '\');window.top.location.reload();</script>');
      //console.log(mystreams);
      multiStream(mystreams).pipe(res);
      

      //log 日志
      var datas = tags[0].split("--");
      var mVersion;
      if (datas.length > 1) {
        mVersion = datas[1];
      } else {
        mVersion = '版本号未知';
      }
      logger.info(req.session.userInfo.username + " 成功删除版本：" + mVersion);
    })();
  });
  Router.post("/cleantags", function(req, res) { //删除tags
    async(function() {
      var mes = '';
      projectsPaths.forEach(function(key) {
        var list = await (req.exec('ls ' + basepath + key + '/tags/'));
        list = list.split("/" + os.EOL);
        list.splice(list.length - 1);
        var toBeDelArr = [];
        for (var i = 0; i < list.length; i++) {
          var tagTime;
          try {
            tagTime = Calendar.getInstance(list[i].split('--')[0]).getTime();
          } catch (e) {
            continue;
          }
          if (tagTime < Calendar.getInstance().add(Calendar.WEEK, -2).getTime()) {
            toBeDelArr.push(list[i]);
          }
        }
        var cmds = toBeDelArr.map(function(toBeDel) {
          var cmd = 'rm ' + basepath + key + '/tags/' + toBeDel;
          mes = cmd + '<br>';
          return cmd;
        });
        await (req.exec(cmds));
        multiStream(cmds).pipe(res);
      });
      //res.send('<link rel="stylesheet" href="/css/iframe.css">' + mes);
      
      logger.info(req.session.userInfo.username + " 成功清除两周前的Tags");
    })();
  });

  return Router;

};
