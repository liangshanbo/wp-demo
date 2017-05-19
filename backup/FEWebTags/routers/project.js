/**
 * @author fuqiang
 * @date 20151128
 * @fileoverview 用户登陆控制器和权限校验
 */
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var path = require('path');
var fs = require('fs');

var config = require('../config.json');
var projectPath = config.projectPath; //'D:/demo/';//
var projectPrefix = config.projectPrefix;
var nginxConfPath = config.nginxConfPath; //'D:/demo/conf.d/';//
var nginxConfPrefix = config.nginxConfPrefix;
var ip = config.serverIp;

var portfinder = require('portfinder');
var logger = require('../lib/log').logger;
var loggerError = require('../lib/log').loggerError;
var constants = require('../lib/constants');
var wss = require('../lib/ws').ws;
var wsR = null;
wss.on('connection', function connection(ws) {
  //ws.send({666:666});
  console.log('connection');
  wsR = ws;
  ws.on('message', function incoming(signal) {

  });
  ws.on('close', function close() {

  });
  //ws.send('something');
});
module.exports = function(Router) {

  /**
   * 入口 页面
   */
  Router.get('/project', function(req, res) {
    if(req.session.userInfo && req.session.userInfo.sysType !== 'svn'){
            res.redirect('/gitPanel');
            return;
        }
    //查询project.json信息
    cleanProjects(req);
    var projectJsonPath = path.join(__dirname, "../project.json"),
      projectJson = {};
    if (fs.existsSync(projectJsonPath)) {
      projectJson = JSON.parse(fs.readFileSync(projectJsonPath).toString());
    } else {
      fs.writeFileSync(projectJsonPath, JSON.stringify(projectJson));
    }
    var results = [];
    for (var key in projectJson) {
      if (projectJson.hasOwnProperty(key)) {
        if(projectJson[key].svn){
          results.push({
            port: key,
            desc: projectJson[key].desc,
            ip: ip,
	          type: projectJson[key].type?projectJson[key].type:'未分类'
          });
        }
      }
    }
    res.render('project', {
      projects: results,
      sysType: constants.SVN,
      projectUrl: constants.SVNURL,
      current: 'project'
    });
  });


  /**
   * 添加服务
   */
  Router.post('/addServer', function(req, res) {
    //获取参数

    portfinder.getPort(function(err, port) {
      var desc = req.body.serverDesc; //描述
      var svn = req.body.serverSvn; //svn库地址
	    var classify = req.body.classify; //分类

      //获取项目配置文件
      console.log('获取project配置文件...');
      var projectJsonPath = path.join(__dirname, "../project.json"),
        projectJson = {};
      if (fs.existsSync(projectJsonPath)) {
        projectJson = JSON.parse(fs.readFileSync(projectJsonPath).toString());
      }
      if (projectJson[port]) {
        res.send('<link rel="stylesheet" href="/css/iframe.css">' + " port " + port + " 已经存在，请先删除");
        logger.error(req.session.userInfo.username + " 在添加服务时发生冲突，因为port " + port + " 已存在");
      }

      projectJson[port] = {
        port: port,
        svn: svn,
        desc: desc,
	      type: classify,
        diskPath: projectPath + projectPrefix + port,
        nginxConfPath: nginxConfPath + nginxConfPrefix + port + '.conf'
      };
      async(function() {
        //检出svn库代码到diskPath目录下
        console.log('检出svn库代码到diskPath目录下...');
        var svnInfo = await (req.exec('checkout ' + svn + ' ' + projectJson[port].diskPath));
		//读取nginx模板文件
        console.log('读取nginx模板文件...');
        var confTemplate = fs.readFileSync(path.join(__dirname, "../nginxconf.txt")).toString();
        //替换模板文件中的占位符
        console.log('替换模板文件中的占位符...');
        var conf = confTemplate.replace(/\$\{PORT\}/gim, port).replace(/\$\{DISKPATH\}/gim, projectJson[port].diskPath);
        //生成nginx配置文件
        console.log('生成nginx配置文件...');
        fs.writeFileSync(projectJson[port].nginxConfPath, conf);
        //保存项目信息到project.json
        console.log('保存项目信息到project.json...');
        fs.writeFileSync(projectJsonPath, JSON.stringify(projectJson));
        console.log('重启nginx让配置生效...');
        await (req.exec('nginx restart', {
          precmd: 'service'
        })); //重启nginx让配置生效
        //res.send('<script>window.parent.refreshServerList();</script>add server success<br>' + svnInfo);
        res.send('add server success<br>' + svnInfo);
        //log 日志
        logger.info(req.session.userInfo.username + " 成功添加服务 " + svnInfo);
      })();
    });


  });

  /**
   * 获取服务列表
   */
  Router.get('/getServerList', function(req, res) {
    //获取项目配置文件
    var projectJsonPath = path.join(__dirname, "../project.json"),
      projectJson = {};
    if (fs.existsSync(projectJsonPath)) {
      projectJson = JSON.parse(fs.readFileSync(projectJsonPath).toString());
    }
    var results = [];
    for (var key in projectJson) {
      if (projectJson.hasOwnProperty(key)) {
        results.push({
          port: key,
          desc: projectJson[key].desc,
          ip: ip
        });
      }
    }
    res.send('<link rel="stylesheet" href="/css/iframe.css">' + results);
    //log 日志
    logger.info(req.session.userInfo.username + " 获取服务列表 " + results);
  });

  Router.post('/modifyServer', function(req, res) {
    var type = req.body.type;
    if (type === 'delete') {
      doDelete(req, res);
    } else {
      doUpdate(req, res);
    }
  });

  Router.get('/oneKeyRecovery', function(req, res) {
    var gitProjectJsonPath = path.join(__dirname, "../project.json"),
        gitProjectJson = {};
    if (fs.existsSync(gitProjectJsonPath)) {
      gitProjectJson = JSON.parse(fs.readFileSync(gitProjectJsonPath).toString());
    }
    async(function() {
      //for(var item in gitProjectJson){}
      var cmds = [];
      for(var item in gitProjectJson){
        var content = gitProjectJson[item];
        var cmd = '';
        if(content['svn'] && !fs.existsSync(content['diskPath'])){
          cmd = 'checkout ' + content['svn'] + ' ' + content['diskPath'];
          cmds.push(cmd);
        }
      }
      cmds.forEach(function(item){
        console.log('item',item);
        req.exec(item);
      });
      res.send("success");
      logger.info(req.session.userInfo.username + " 一键恢复所有svn项目 ");
    })();
  });
	/**
	 * 搜索
	 */
  Router.get('/searchForStaticResource',function(req, res){
    var searchKey = req.query.searchKey;
    var projectJsonPath = path.join(__dirname, "../project.json"),
        projectJson = {};
    var matchedList = [];
    if (fs.existsSync(projectJsonPath)) {
      projectJson = JSON.parse(fs.readFileSync(projectJsonPath).toString());
    }
    for (var key in projectJson) {
      if (projectJson.hasOwnProperty(key)) {
        var desc = projectJson[key]['desc'];
        if(projectJson[key]['svn']){
          if(desc.indexOf(searchKey) > -1){
            matchedList.push({
              port: key,
              desc: projectJson[key].desc,
              ip: ip
            });
          }else if(searchKey == ''){
            matchedList.push({
              port: key,
              desc: projectJson[key].desc,
              ip: ip
            });
          }
        }
      }
    }
    res.send(matchedList);
    //log 日志
    logger.info(req.session.userInfo.username + " 获取服务列表 " + matchedList);

  });

	/**
	 * 根据类型获取列表
	 */
	Router.get('/typeProject', function(req, res) {
		//查询project.json信息
		console.log('req.query.type', req.query.type);
		var projectJsonPath = path.join(__dirname, "../project.json"),
			projectJson = {};
		if (fs.existsSync(projectJsonPath)) {
			projectJson = JSON.parse(fs.readFileSync(projectJsonPath).toString());
		} else {
			fs.writeFileSync(projectJsonPath, JSON.stringify(projectJson));
		}
		var results = [];
		for (var key in projectJson) {
			if(projectJson[key].svn){
				if(req.query.type == '活动' || req.query.type == '内嵌' || req.query.type == 'pc' || req.query.type == 'h5'){
					if(projectJson[key].type == req.query.type){
						results.push({
							port: key,
							desc: projectJson[key].desc,
							ip: ip,
							type: projectJson[key].type?projectJson[key].type:'未分类'
						});
					}
				}else if(req.query.type == '全部'){
					results.push({
						port: key,
						desc: projectJson[key].desc,
						ip: ip,
						type: projectJson[key].type?projectJson[key].type:'未分类'
					});
				}else if(req.query.type == '未分类'){
					if(!projectJson[key].type || projectJson[key].type == '未分类'){
						results.push({
							port: key,
							desc: projectJson[key].desc,
							ip: ip,
							type: projectJson[key].type?projectJson[key].type:'未分类'
						});
					}
				}
			}
		}
		res.send(results);

	});
  /**
   * 更新服务
   * @param req
   * @param res
   */
  function doUpdate(req, res) {
    //获取参数
    var servers = req.body.servers || [];
    if (typeof servers === 'string') {
      servers = [servers];
    }
    if (!servers.length) {
      res.send('<link rel="stylesheet" href="/css/iframe.css">' + "请选择要更新的服务");
      return;
    }

    //获取项目配置文件
    var projectJsonPath = path.join(__dirname, "../project.json"),
      projectJson = {};
    if (fs.existsSync(projectJsonPath)) {
      projectJson = JSON.parse(fs.readFileSync(projectJsonPath).toString());
    }
    async(function() {
      var cmds = servers.map(function(server) {
        return 'up ' + projectJson[server].diskPath;
      });
      await (req.exec(cmds));
      res.send('success');
	    var data = {
		    type:'ret',
		    msg:'更新服务成功'
	    };
	    if(wsR){
		    wsR.send(JSON.stringify(data));
	    }
    })();
  }
  /**
   * 删除服务
   */
  function doDelete(req, res) {
    //获取参数
    var servers = req.body.servers || [];
    if (typeof servers === 'string') {
      servers = [servers];
    }
    if (!servers.length) {
      res.send('<link rel="stylesheet" href="/css/iframe.css">' + "请选择要删除的服务");
      return;
    }

    //获取项目配置文件
    console.log('读取项目配置文件...');
    var projectJsonPath = path.join(__dirname, "../project.json"),
      projectJson = {};
    if (fs.existsSync(projectJsonPath)) {
      projectJson = JSON.parse(fs.readFileSync(projectJsonPath).toString());
    }

    function exec(server) {
      //删除检出svn文件的目录
      console.log('删除检出svn文件的目录...');
      logger.info('删除检出svn文件的目录...');
      await (req.exec('-rf ' + projectJson[server].diskPath, {
        precmd: 'rm'
      }));
      //删除nginx配置文件
      console.log('删除nginx配置文件...');
      logger.info('删除nginx配置文件...');
      await (req.exec('-rf ' + projectJson[server].nginxConfPath, {
        precmd: 'rm'
      }));
      //从project.json中删除项目信息
      console.log('从project配置文件中删除项目信息...');
      logger.info('从project配置文件中删除项目信息...');
      delete projectJson[server];
      console.log('重启nginx让配置生效...');
      logger.info('重启nginx让配置生效...');
      await (req.exec('nginx restart', {
        precmd: 'service'
      })); //重启nginx让配置生效
    }

    async(function() {
      servers.forEach(function(server){
          exec(server);
      });
      fs.writeFileSync(projectJsonPath, JSON.stringify(projectJson));
      res.send('success');
	    var data = {
		    type:'ret',
		    msg:'删除服务成功'
	    };
	    if(wsR){
		    wsR.send(JSON.stringify(data));
	    }
    })();

  }
  return Router;
};



/**
 * 清理项目目录
 */
function cleanProjects(req) {
  //获取项目配置文件
  console.log('清理项目目录...');
  logger.info('清理项目目录...');
  var projectJsonPath = path.join(__dirname, "../project.json"),
    projectJson = {};
  if (fs.existsSync(projectJsonPath)) {
    projectJson = JSON.parse(fs.readFileSync(projectJsonPath).toString());
  }

  //遍历projects目录，查看是否有上次遗留的未删干净的目录，防止下次生成新的同端口目录时报错
  fs.readdir(projectPath, function(err, files) {
    //console.log('扫描目录:' + files);
    if (files && files.length) {
      files.forEach(function(file) {
        var matches = file.match(/^CDN(\d+)$/);
        var port = matches ? matches[1] : null; //获取文件夹名里的端口
        //此端口已不存在于projectJson配置文件中 直接清除目录
        if (port && !projectJson[port]) {
          console.log('删除无用CDN文件夹:' + file);
          logger.info('删除无用CDN文件夹:' + file);
          async(function() {
            await (req.exec('-rf ' + projectPath + file, {
              precmd: 'rm'
            }));
          })();
        }
      });
    }
  });

}
