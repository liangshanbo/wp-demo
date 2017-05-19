/**
 * @author fuqiang
 * @date 20151128
 * @fileoverview 用户登陆控制器和权限校验
 */
var chlid = require('child_process');
//var util = require('util');
var exec = chlid.exec;
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var path = require('path');
var fs = require('fs');
var os = require('os');

var config = require('../../config.json');
var gitProjectPath = config.gitProjectPath; //'D:/demo/';//
var projectPrefix = config.projectPrefix;
var nginxConfPath = config.nginxGitConfPath; //'D:/demo/conf.d/';//
var nginxConfPrefix = config.nginxConfPrefix;
var ip = config.serverIp;

var cmd_nginx_reload = "-s reload";
var pre_nginx_reload = "/usr/local/nginx/sbin/nginx";

var portfinder = require('portfinder');
var logger = require('../../lib/log').logger;
var loggerError = require('../../lib/log').loggerError;
var constants = require('../../lib/constants');
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
    /**
     * 入口 页面
     */
    Router.get('/gitProject', function(req, res) {
        if(req.session.userInfo && req.session.userInfo.sysType !== 'gitlab'){
            res.redirect('/panel');
            return;
        }
        //查询project.json信息
        cleanProjects(req);
        var gitProjectJsonPath = path.join(__dirname, "../../project.json"),
            gitProjectJson = {};
        if (fs.existsSync(gitProjectJsonPath)) {
            gitProjectJson = JSON.parse(fs.readFileSync(gitProjectJsonPath).toString());
        } else {
            fs.writeFileSync(gitProjectJsonPath, JSON.stringify(gitProjectJson));
        }
        var results = [];
            for (var key in gitProjectJson) {
              if (gitProjectJson.hasOwnProperty(key)) {
                if(gitProjectJson[key].git){
                  results.push({
                    port: key,
                    desc: gitProjectJson[key].desc,
                    ip: ip,
                    type: gitProjectJson[key].type?gitProjectJson[key].type:'未分类'
                  });
                }
              }
            }
        res.render('gitProject', {
            projects: results,
            sysType: constants.GITLAB,
            projectUrl: constants.GITLABURL,
            current: 'project'
        });
    });


    /**
     * 添加服务
     */
    Router.post('/gitAddServer', function(req, res) {
        //获取参数

        portfinder.getPort(function(err, port) {
            var desc = req.body.serverDesc; //描述
            var git = req.body.serverSite; //git仓库地址
            var branchName = req.body.serverBranch; //git仓库分值名称
            var projectName = getProjectName(git);
            var classify = req.body.classify; //分类
            if(!desc || !git || !branchName){
                res.send('<link rel="stylesheet" href="/css/iframe.css">' + "请填写完全信息");
                var data = {
                    type:'err',
                    msg:'请填写完全信息'
                };
	            if(wsR){
		            wsR.send(JSON.stringify(data));
	            }
                return
            }
            console.log('描述',desc);
            console.log('git仓库地址',git);
            console.log('分支名称',branchName);
            //获取项目配置文件
            console.log('获取project配置文件...');
            var gitProjectJsonPath = path.join(__dirname, "../../project.json"),
                gitProjectJson = {};
            if (fs.existsSync(gitProjectJsonPath)) {
                gitProjectJson = JSON.parse(fs.readFileSync(gitProjectJsonPath).toString());
            }
            if (gitProjectJson[port]) {         //验证端口是否已经存在
                res.send('<link rel="stylesheet" href="/css/iframe.css">' + " port" + port + " 已经存在，请先删除");
                logger.error(req.session.userInfo.username + " 在添加服务时发生冲突，因为port " + port + " 已存在");
                var data = {
                    type:'err',
                    msg:" port" + port + " 已经存在，请先删除"
                };
	            if(wsR){
		            wsR.send(JSON.stringify(data));
	            }
                return
            }

            gitProjectJson[port] = {
                port: port,
                git: git,
                desc: desc,
                type: classify,
                diskPath: gitProjectPath + projectPrefix + port,    //todo 该路径需要加上项目名称，项目名称下面不同的分支名称+端口号+描述
                nginxConfPath: nginxConfPath + nginxConfPrefix + port + '.conf',
                branchName:branchName
            };
            console.log('文件的桌面路径',gitProjectPath + projectPrefix + port );
            console.log('文件的nginx文件',nginxConfPath + nginxConfPrefix + port + '.conf');
            var gitInfo;
            async(function() {
                //检出svn库代码到diskPath目录下
                console.log('检出git库代码到diskPath目录下...');
                console.log(branchName);
                var gitProjectPathAddPn = git.replace('http://', 'http://' + encodeURIComponent(req.session.userInfo.username.trim() + ':' + req.session.userInfo.password.trim()) + '@');
                exec('git clone -b ' + branchName + ' ' + git + ' ' + gitProjectPath + projectPrefix + port,function(err, stdout, stderr){
                    console.log(gitProjectPath + projectPrefix + port);
	            if (err) {
			console.log('err',err);
                    var data = {
                        type:'err',
                        msg:err
                    };
		            if(wsR){
			            wsR.send(JSON.stringify(data));
		            }
		            logger.info(projectName + "静态资源服务产生失败，目录" + port );
		            res.send('<script>window.parent.refreshServerList();</script>add server failure<br>' + err);
		            var data = {
			            type:'err',
			            msg:'add server failure'
		            };
		            if(wsR){
			            wsR.send(JSON.stringify(data));
		            }
                    } else {
                        gitInfo = stdout + stderr;
                    }
                    return false;
                });
                //读取nginx模板文件
                console.log('读取nginx模板文件...');
                var confTemplate = fs.readFileSync(path.join(__dirname, "../../nginxconf.txt")).toString();
                //替换模板文件中的占位符
                console.log('替换模板文件中的占位符...');
                var conf = confTemplate.replace(/\$\{PORT\}/gim, port).replace(/\$\{DISKPATH\}/gim, gitProjectJson[port].diskPath);
                //生成nginx配置文件
                console.log('生成nginx配置文件...');
                fs.writeFileSync(gitProjectJson[port].nginxConfPath, conf);
                //保存项目信息到project.json
                console.log('保存项目信息到project.json...');
                fs.writeFileSync(gitProjectJsonPath, JSON.stringify(gitProjectJson));
                logger.info('保存项目信息到project.json，端口：' + port);
                console.log('重启nginx让配置生效...');
                await (req.exec(cmd_nginx_reload, {
                    precmd: pre_nginx_reload
                })); //重启nginx让配置生效
                //todo 修改nginx配置
                res.send('<script>window.parent.refreshServerList();</script>add server success<br>');
                var data = {
                    type:'ret',
                    msg:'add server success'
                };
	            if(wsR){
		            wsR.send(JSON.stringify(data));
	            }
                //log 日志
                logger.info(req.session.userInfo.username + " 成功添加服务 " + gitInfo);
            })();
        });


    });

    /**
     * 获取服务列表
     */
    Router.get('/gitGetServerList', function(req, res) {
        //获取项目配置文件
        var gitProjectJsonPath = path.join(__dirname, "../../project.json"),
            gitProjectJson = {};
        if (fs.existsSync(gitProjectJsonPath)) {
            gitProjectJson = JSON.parse(fs.readFileSync(gitProjectJsonPath).toString());
        }
        var results = [];
        for (var key in gitProjectJson) {
            if (gitProjectJson.hasOwnProperty(key)) {
	            if(gitProjectJson[key].git){
                    results.push({
                        port: key,
                        desc: gitProjectJson[key].desc,
                        ip: ip,
                        type: gitProjectJson[key].type?gitProjectJson[key].type:'未分类'
                    });
                }
            }
        }
        res.send('<link rel="stylesheet" href="/css/iframe.css">' + results);
        var data = {
            type:'ret',
            msg:results
        };
	    if(wsR){
		    wsR.send(JSON.stringify(data));
	    }
        //log 日志
        logger.info(req.session.userInfo.username + " 获取服务列表 " + results);
    });

    Router.post('/gitModifyServer', function(req, res) {
        var type = req.body.type;
        if (type === 'delete') {
            doDelete(req, res);
        } else if (type === 'update'){
            doUpdate(req, res);
        }
    });
    Router.get('/gitOneKeyRecovery', function(req, res) {
        var gitProjectJsonPath = path.join(__dirname, "../../project.json"),
            gitProjectJson = {};
        if (fs.existsSync(gitProjectJsonPath)) {
            gitProjectJson = JSON.parse(fs.readFileSync(gitProjectJsonPath).toString());
        }
        async(function() {
            var cmds = [];
            for(var item in gitProjectJson){
                console.log('comming gitProjectJson');
                var content = gitProjectJson[item];
                console.log(gitProjectJson[item]);
                var cmd = '';
                if(content['git'] && !fs.existsSync(content['diskPath'])){
                    cmd = 'git clone -b ' + content['branchName'] + ' ' + content['git'] + ' ' + content['diskPath'];
                }
                console.log(cmd);
                cmds.push(cmd);
            }
            var s =await (req.exec(cmds,{precmd: 'git'}));
            console.log(s)
            res.send("success");
            var data = {
                type:'ret',
                msg:'success'
            };
	        if(wsR){
		        wsR.send(JSON.stringify(data));
	        }
            logger.info(req.session.userInfo.username + " 一键恢复所有git项目 ");
        })();
    });

    Router.get('/gitFindConfig', function(req, res) {
        var gitProjectJsonPath = path.join(__dirname, "../../project.json"),
            gitProjectJson = {};
        if (fs.existsSync(gitProjectJsonPath)) {
            gitProjectJson = JSON.parse(fs.readFileSync(gitProjectJsonPath).toString());
        }
        var serverPort = req.query.serverPort;
        var configInfo = {};
        for(var item in gitProjectJson){
            if (item == serverPort) {
                configInfo[item] = gitProjectJson[item];
                break;
            }
        }
        res.send({
            data: configInfo[item],
            msg: true
        });
    });

    Router.post('/gitEditConfig', function(req, res) {
        var gitProjectJsonPath = path.join(__dirname, "../../project.json"),
            gitProjectJson = {};
        if (fs.existsSync(gitProjectJsonPath)) {
            gitProjectJson = JSON.parse(fs.readFileSync(gitProjectJsonPath).toString());
        }
        async(function() {
            var serverPort = req.body.serverPort;
            var type = req.body.type;
            var info = false;
            for(var item in gitProjectJson){
                if (item == serverPort) {
                    info = true;
                    break;
                }
            }
            if (!info){
                res.send('fail');
            }
            if (type === constants.SVN) {
                gitProjectJson[serverPort].svn = req.body.url;
                gitProjectJson[serverPort].desc = req.body.desc;
                gitProjectJson[serverPort].type = req.body.staticType;
            }else {
                gitProjectJson[serverPort].git = req.body.url;
                gitProjectJson[serverPort].desc = req.body.desc;
                gitProjectJson[serverPort].branchName = req.body.branchName;
                gitProjectJson[serverPort].type = req.body.staticType;
            }
            try {
                fs.writeFileSync(gitProjectJsonPath, JSON.stringify(gitProjectJson));

                var cmd = '';
                if(gitProjectJson[serverPort]['git'] && fs.existsSync(gitProjectJson[serverPort]['diskPath'])){
                    cmd = 'rm -rf ' + gitProjectJson[serverPort]['diskPath']+
                        ' && git clone -b ' + gitProjectJson[serverPort]['branchName'] + ' ' + gitProjectJson[serverPort]['git'] + ' ' + gitProjectJson[serverPort]['diskPath'];
			console.log(cmd);

                }else if (gitProjectJson[serverPort]['svn'] && fs.existsSync(gitProjectJson[serverPort]['diskPath'])) {
                    cmd = 'cd ' + gitProjectJson[serverPort]['diskPath'] + ' && rm -rf ./*  '+
                        ' && svn checkout --username '+ req.session.userInfo.username + ' --password ' + req.session.userInfo.password + ' ' +  gitProjectJson[serverPort]['svn'] + ' ' + gitProjectJson[serverPort]['diskPath'];
                }
                var ls = await (exec(cmd, {maxBuffer: 1024 * 1024 * 50}, function(err, stdout, stderr){
                    if (err) {
                        loggerError.error("修改静态资源error:",err);
                        res.send("fail");
                    }else {
                        res.send("success");
                        logger.info(req.session.userInfo.username + " 编辑静态资源项目 ");
                    }
                }));

            }catch(e){
                loggerError.error(e);
            }
        })();
    });
    // 搜索符合条件的静态资源服务
    Router.get('/gitSearchForStaticResource',function(req, res){
        var searchKey = req.query.searchKey;
        var gitProjectJsonPath = path.join(__dirname, "../../project.json"),
            gitProjectJson = {};
        var matchedList = [];
        if (fs.existsSync(gitProjectJsonPath)) {
            gitProjectJson = JSON.parse(fs.readFileSync(gitProjectJsonPath).toString());
        }
        for (var key in gitProjectJson) {
            if (gitProjectJson.hasOwnProperty(key)) {
                var desc = gitProjectJson[key]['desc'];
                if(gitProjectJson[key]['git']){
                    if(desc.indexOf(searchKey) > -1){
                        matchedList.push({
                            port: key,
                            desc: gitProjectJson[key].desc,
                            ip: ip
                        });
                    }else if(searchKey == ''){
                        matchedList.push({
                            port: key,
                            desc: gitProjectJson[key].desc,
                            ip: ip
                        });
                    }
                }
            }
        }
        res.send(matchedList);
        var data = {
            type:'ret',
            msg:matchedList
        };
	    if(wsR){
		    wsR.send(JSON.stringify(data));
	    }
        //log 日志
        logger.info(req.session.userInfo.username + " 获取服务列表 " + matchedList);

    });

    /**
	 * 根据类型获取列表
	 */
	Router.get('/gitGetTypeProject', function(req, res) {
		//查询project.json信息
		console.log('req.query.type', req.query.type);
		var projectJsonPath = path.join(__dirname, "../../project.json"),
			projectJson = {};
		if (fs.existsSync(projectJsonPath)) {
			projectJson = JSON.parse(fs.readFileSync(projectJsonPath).toString());
		} else {
			fs.writeFileSync(projectJsonPath, JSON.stringify(projectJson));
		}
		var results = [];
		for (var key in projectJson) {
			if(projectJson[key].git){
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
        var servers = req.body.servers || {};
        if (typeof servers === 'string') {
            servers = [servers];
        }
        if (!servers.length) {
            //res.send('<link rel="stylesheet" href="/css/iframe.css">' + "请选择要更新的服务");
            res.send('请选择要更新的服务');
            var data = {
                type:'err',
                msg:'请选择要更新的服务'
            };
	        if(wsR){
		        wsR.send(JSON.stringify(data));
	        }
            return;
        }
        //获取项目配置文件
        var gitProjectJsonPath = path.join(__dirname, "../../project.json"),
                gitProjectJson = {};
        if (fs.existsSync(gitProjectJsonPath)) {
            gitProjectJson = JSON.parse(fs.readFileSync(gitProjectJsonPath).toString());
        }
        async(function() {
          var cmds = servers.map(function(server) {
            // return 'cd ' + gitProjectJson[server].diskPath + ' && git pull origin ' + gitProjectJson[server].branchName;
            return 'rm -rf ' + gitProjectJson[server].diskPath + ' && git clone -b ' + gitProjectJson[server].branchName + ' ' + gitProjectJson[server].git + ' ' + gitProjectJson[server].diskPath;
          });
          await (req.exec(cmds,{precmd: 'git'}));
          //res.send('<script>alert(\'成功更新服务\');</script>');
           var data = {
                type:'ret',
                msg:'成功更新服务'
            };
	        if(wsR){
		        wsR.send(JSON.stringify(data));
	        }
          res.send('<link rel="stylesheet" href="/css/iframe.css">' + "成功更新服务");
          logger.info(req.session.userInfo.username + " 更新服务 " + servers);
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
            var data = {
                type:'err',
                msg:'请选择要删除的服务'
            };
	        if(wsR){
		        wsR.send(JSON.stringify(data));
	        }
            return;
        }

        //获取项目配置文件
        console.log('读取项目配置文件...');
        var gitProjectJsonPath = path.join(__dirname, "../../project.json"),
            gitProjectJson = {};
        if (fs.existsSync(gitProjectJsonPath)) {
            gitProjectJson = JSON.parse(fs.readFileSync(gitProjectJsonPath).toString());
        }

        function exec(server) {
            //删除检出svn文件的目录
            console.log('删除检出git文件的目录...',gitProjectJson[server].diskPath);
            logger.info('删除检出git文件的目录...' + gitProjectJson[server].diskPath);
            await (req.exec('-rf ' + gitProjectJson[server].diskPath, {
                precmd: 'rm'
            }));
            //删除nginx配置文件
            console.log('删除nginx配置文件...',gitProjectJson[server].nginxConfPath);
            logger.info('删除nginx配置文件...' + gitProjectJson[server].nginxConfPath);
            await (req.exec('-rf ' + gitProjectJson[server].nginxConfPath, {
                precmd: 'rm'
            }));
            //从project.json中删除项目信息
            console.log('从project配置文件中删除项目信息...');
            delete gitProjectJson[server];
            logger.info('删除ProjectJson配置文件...' + server);
            console.log('删除ProjectJson配置文件...',gitProjectJson[server]);
            //todo 修改nginx配置
            await (req.exec(cmd_nginx_reload, {
                precmd: pre_nginx_reload
            })); //重启nginx让配置生效
        }

        async(function() {
            servers.forEach(function(server){
                exec(server,function(err,ret,der){
                    var data = {};
                    if(err){
                        data = {
                            type:'err',
                            msg:err
                        };
                    }else{
                        data = {
                            type:'err',
                            msg:ret + der
                        };
                    }
	                if(wsR){
		                wsR.send(JSON.stringify(data));
	                }
                });
            });
            fs.writeFileSync(gitProjectJsonPath, JSON.stringify(gitProjectJson));
            res.send('成功删除服务');
            var data = {
                type:'ret',
                msg:'成功删除服务'
            };
	        if(wsR){
		        wsR.send(JSON.stringify(data));
	        }
            logger.info(req.session.userInfo.username + " 删除服务成功 " + servers);
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
    var gitProjectJsonPath = path.join(__dirname, '../../project.json'),
        gitProjectJson = {};
    if (fs.existsSync(gitProjectJsonPath)) {
        gitProjectJson = JSON.parse(fs.readFileSync(gitProjectJsonPath).toString());
    }

    //TODO 遍历projects目录，查看是否有上次遗留的未删干净的目录，防止下次生成新的同端口目录时报错
    fs.readdir(gitProjectPath, function(err, files) {
        //console.log('扫描目录:' + files);
        if (files && files.length) {
            files.forEach(function(file) {
                fs.readdir(gitProjectPath + file + '/',function(err,fls){
                    fls.forEach(function(fl){
                        var matches = fl.match(/^CDN(\d+)$/);
                        var port = matches ? matches[1] : null; //获取文件夹名里的端口
                        //此端口已不存在于projectJson配置文件中 直接清除目录
                        if (port && !gitProjectJson[port]) {
                            console.log('删除无用CDN文件夹:' + fl);
                            logger.info('删除无用CDN文件夹:' + fl);
                            async(function() {
                                await (req.exec('-rf ' + gitProjectPath + fl, {
                                    precmd: 'rm'
                                }));
                            })();
                        }
                    })
                })
            });
        }
    });
}
function getProjectName(address){
    var address = address;
    var addressArr = address.split('/');
    var last = addressArr[addressArr.length - 1];
    var name = last.substring(0,last.length-4);
    return name;
}
