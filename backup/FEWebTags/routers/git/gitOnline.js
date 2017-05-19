var async = require('asyncawait/async');
var await = require('asyncawait/await');
var logger = require('../../lib/log').logger;
var loggerError = require('../../lib/log').loggerError;
var config = require("../../config.json");
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

  Router.get('/gitOnline', function(req, res) {
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
              // if(json[i].permissions.project_access !== null){
                arr.push(json[i]); 
              }
            }
            res.render('gitOnline', {
              mods: arr,
              current: 'gitOnline',
              sysType: constants.GITLAB,
              projectUrl: constants.GITLABURL,
              userName: req.session.username
            });
          }

        })
  });

  function delayResponse(res) {
    setTimeout(function(){
      res.send("success");
      var data = {
        type:'ret',
        msg:'updateOnline success'
      };
	    if(wsR){
		    wsR.send(JSON.stringify(data));
	    }
    }, 0);
  };

  Router.post('/gitUpdateOnline', function(req, res) { //上线
    var projectId = req.body.projectId;
    var projectName = req.body.projectName;
    try{
      request.get(constants.GITLABAPI + "/projects/"+projectId+
          "/repository/branches/develop?access_token=" +
          req.session.userInfo.access_token,
          function(err,httpResponse,body) {
            var json = JSON.parse(body);
            if (json.message == "404 Branch Not Found") {
              res.send("branch Not Found");
              var pr = {
                type: 'ret',
                msg: 'branch Not Found'
              };
	            if(wsR){
		            wsR.send(JSON.stringify(pr));
	            }
            }else {
              request.delete(constants.GITLABAPI +
                  '/projects/' + projectId +
                  '/repository/branches/' +constants.RELEASE +
                  "?access_token=" +
                  req.session.userInfo.access_token, function(err, resp, body){
                    loggerError.error("删除release分支:",err);
                    request.post(constants.GITLABAPI +
                        '/projects/' + projectId +
                        '/repository/branches?branch_name=' + constants.RELEASE +
                        '&ref=' + constants.DEVELOP +
                        "&access_token=" +
                        req.session.userInfo.access_token, function (err, resp, body) {
                          loggerError.error("根据develop分支创建release分支:",err);
                          logger.info(req.session.userInfo.username + " 准备上线 "
                              +projectName + " 更新release分支 ");
                          delayResponse(res);
                    });
              });
            }
      });
    }catch(err){
      loggerError.error("/gitUpdateOnline ", err);
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

  return Router;
};
