/**
 * Created by zhangmike on 16/7/21.
 */
var async = require('asyncawait/async');
var multiStream = require('multistream');
var await = require('asyncawait/await');
var moment = require('moment');
var os = require('os');
var pinyin = require('pinyin');
var Calendar = require('../../lib/calendar.js');
var config = require('../../config.json');
var projectsPaths = config.projectsPaths;
var basepath = config.basepath;
var targetpath = config.targetpath;
var logger = require('../../lib/log').logger;
var loggerError = require('../../lib/log').loggerError;
var constants = require('../../lib/constants');
var request = require("request");
var exec = require('child_process').exec;
var path = require('path');
var obj = {}; //记录状态,防止冲突,同步操作  wangchunpeng
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
exec('wc -l ./publics/logs/logs.log',function(error,stdout,stderr){
	var num = parseInt(stdout.match(/\d+/ig)[0]);
	if (num > 1000){
		var count = num - 1000;
		//var pathName = path.join(__dirname,'./publics/logs/');
		exec("cd ./publics/logs/  && sed -i '1," + count + " d' logs.log",function(error,stdout,stderr){
			if(error){
				console.log(error);
			}
		})
	}
});
module.exports = function(Router) {

	Router.get('/gitPanel', function(req, res) {
		if(req.session.userInfo && req.session.userInfo.sysType !== 'gitlab'){
            res.redirect('/panel');
			return;
        }
        var url = constants.GITLABAPI + "/projects?access_token=" +
			req.session.userInfo.access_token + "&per_page=100";
		// console.log(url);
		request.get(url,function(err,httpResponse,body){
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
							// console.log(json[i]); 
						}
					}
					res.render('gitPanel', {
						mods: arr,
						current: 'panel',
						sysType: constants.GITLAB,
						projectUrl: constants.GITLABURL
					});
				}

		})
	});

	Router.get('/gitTags', function(req, res) {
		var type = req.query.type;
		request.get(constants.GITLABAPI + "/projects/" + type + "/repository/branches?access_token=" +
				req.session.userInfo.access_token,
				function (err, resp, body) {
					//console.log(body);
					var json = JSON.parse(body);
					if (json.message === '404 Project Not Found') {
						res.send([]);
						var par = {
							type:'err',
							msg:'404 Project Not Found'
						};
						if(wsR){
							wsR.send(JSON.stringify(par));
						}
					} else {
						//console.log("json.length===", json.length);
						var reg = /^develop\w+$/i;
						var data = json.filter(function (current) {
							//console.log(current.name, reg.test(current.name));
							return reg.test(current.name);
						});
						data = data.sort(function(a, b){
							if (a.name < b.name) {
								return 1;
							}else if (a.name > b.name) {
								return -1;
							}else {
								return 0;
							}
						});
						res.send(data);
						var par = {
							type:'ret',
							msg:data
						};
						if(wsR){
							wsR.send(JSON.stringify(par));
						}
					}
				}
		)
	});

	Router.get("/updateUI", function(req, res) {
		async(function() {
			var ret = await (req.exec('up /home/fuqiang-ds1/web/UIweb/gomeplusUI'));
			res.send(ret);
			var data = {
				type:'ret',
				msg:ret
			};
			if(wsR){
				wsR.send(JSON.stringify(data));
			}
		})();
	});

	function delayResponse(res) {
		setTimeout(function(){
			res.send("success");
			var data = {
				type:'ret',
				msg:'updateUI success'
			};
			if(wsR){
				wsR.send(JSON.stringify(data));
			}
		}, 0);
	};
	Router.post('/gitHitTag', function(req, res) {
		var projectId = req.body.projectId;
		var projectName = req.body.projectName;
		//async(function() {
		try {
			var version = moment(new Date()).format("YYYY_MM_DD_HH_mm_ss");
			console.log("version-", version);
			//await(
			request.post(constants.GITLABAPI +
					'/projects/' + projectId +
					'/repository/branches?branch_name=' + constants.DEVELOP + version +
					'&ref=' + constants.DEVELOP +
					"&access_token=" +
					req.session.userInfo.access_token, function(err, resp, body) {
				var json = JSON.parse(body);
				if (json.message && json.message === 'Invalid reference name') {
					res.send("请先创建develop分支");
					var data = {
						type:'err',
						msg:'请先创建develop分支'
					};
					if(wsR){
						wsR.send(JSON.stringify(data));
					}
				}else {
					logger.info(req.session.userInfo.username + " gitHitTag 项目:" + projectName +
							" 备份 成功 分支名称:" + constants.DEVELOP + version);
					delayResponse(res);
				}
			});
		}catch(err){
			console.log(err);
			loggerError.error("/gitHitTag 备份 develop 失败 ",err);
			res.send("fail");
			var data = {
				type:'err',
				msg:'/gitHitTag 备份 develop 失败 '
			};
			if(wsR){
				wsR.send(JSON.stringify(data));
			}
		}
			//}));
		/*})().catch(function(err){
			console.log(err);
			loggerError.error("/gitHitTag 备份 develop 失败 ",err);
			res.send("fail");
		});*/
	});



	Router.post('/gitRollback', function(req, res) { //回滚
		var projectId = req.body.projectId;
		var branchName = req.body.branchName;
		var projectName = req.body.projectName;
		try{
			request.delete(constants.GITLABAPI +
					'/projects/' + projectId +
					'/repository/branches/' +constants.DEVELOP +
					"?access_token=" +
					req.session.userInfo.access_token, function(err, resp, body){
				var json = JSON.parse(body);
				if (json.branch_name){
					request.post(constants.GITLABAPI +
							'/projects/' + projectId +
							'/repository/branches?branch_name=' + constants.DEVELOP +
							'&ref=' + branchName +
							"&access_token=" +
							req.session.userInfo.access_token, function (err, resp, body) {
						logger.info(req.session.userInfo.username + " 回滚 "
								+projectName + " 分支 "+branchName);
						delayResponse(res);
					});
				}
			});
		}catch(err){
			loggerError.error("/gitRollback ", err);
			res.send("fail");
			var data = {
				type:'err',
				msg:'fail'
			};
			if(wsR){
				wsR.send(JSON.stringify(data));
			}
		}
	});
	Router.post("/gitRmtags", function(req, res) { //删除tags
		var projectId = req.body.projectId;
		var branchName = req.body.branchName;
		var projectName = req.body.projectName;
		try{
			async(function() {
				await(
						request.delete(constants.GITLABAPI +
								'/projects/' + projectId +
								'/repository/branches/' + branchName +
								"?access_token=" +
								req.session.userInfo.access_token, function(err, resp, body){
							var json = JSON.parse(body);
							if (json.branch_name){
								logger.info(req.session.userInfo.username + " 删除: " +projectName +
									" 分支:" + branchName);
								delayResponse(res);
							}else {
								loggerError("/gitRmtags 接口出错!");
								res.send("fail");
								var data = {
									type:'err',
									msg:'fail'
								};
								if(wsR){
									wsR.send(JSON.stringify(data));
								}
							}
						}));
			})();
		}catch(err){
			res.send("fail");
			var data = {
				type:'err',
				msg:'删除tags失败'
			};
			if(wsR){
				wsR.send(JSON.stringify(data));
			}
			loggerError.error("/gitRmtags ",err);
		}

	});
	Router.post("/gitCleantags", function(req, res) { //删除tags
		try {
			async(function() {
				var projectId = req.body.projectId;
				var projectName = req.body.projectName;
				request.get(constants.GITLABAPI + "/projects/" + projectId + "/repository/branches?access_token=" +
						req.session.userInfo.access_token,
						function (err, resp, body) {
							//console.log(body);
							var json = JSON.parse(body);
							if (json.message === '404 Project Not Found') {
								res.send([]);
								var pr = {
									type:'err',
									msg:'404 Project Not Found'
								};
								if(wsR){
									wsR.send(JSON.stringify(pr));
								}
							} else {
								var reg = /^develop\w+$/i;
								var data = json.filter(function (current) {
									if (reg.test(current.name)){
										if (moment(current.commit.authored_date)._d < Calendar.getInstance().add(Calendar.WEEK, -2).getTime()) {
											return true;
										}
									}
									return false;
								});
								if (data.length === 0) {
									res.send("success");
									var pr = {
										type:'err',
										msg:'success'
									};
									if(wsR){
										wsR.send(JSON.stringify(pr));
									}
								}else {
									var flagArr = [];
									var promise = new Promise(function(resolve, reject) {
										flagArr.push(resolve());
									});
									data.forEach(function(c){
										promise.then(function() {
											request.delete(constants.GITLABAPI +
													'/projects/' + projectId +
													'/repository/branches/' + c.name +
													"?access_token=" +
													req.session.userInfo.access_token,
													function (err, resp, body) {
														var json = JSON.parse(body);
														if (!json.branch_name) {
															return c;
														}
													}
											);
										});
									});
									promise.then(function () {
										logger.info(req.session.userInfo.username + " 异步清除" +
												projectName+"两周前的Tags");
										res.send("success");
										var pr = {
											type:'err',
											msg:req.session.userInfo.username + " 异步清除" +
											projectName+"两周前的Tags"
										};
										if(wsR){
											wsR.send(JSON.stringify(pr));
										}
									});
								}
							}
						}
				)

			})();
		}catch(err) {
			loggerError.error("/gitCleantags" ,err);
		}
	});

	return Router;

};
