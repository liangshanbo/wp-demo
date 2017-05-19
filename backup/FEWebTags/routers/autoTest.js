/**
 * Created by Hao on 2016-06-27.
 */

var formidable = require('formidable'),
  fs = require('fs'),
  path = require('path'),
  UPLOAD_FOLDER = './publics/testScripts/';
  async = require('asyncawait/async');
  await = require('asyncawait/await');
  multiStream = require('multistream');
var constants = require('../lib/constants');

module.exports = function(Router) {
  Router.get('/autoTest', function(req, res) {
    var username = req.session.userInfo.username;
    var jsonpath = path.join(__dirname, '../testScript.json');
    var scriptJson = JSON.parse(fs.readFileSync(jsonpath).toString());
    if (!scriptJson.hasOwnProperty(username)) {
      scriptJson[username] = {
        "scripts": []
      };
    }
    var userData = scriptJson[username].scripts;

    res.render('autoTest', {
      current: 'autoTest',
      userData: userData,
      sysType: constants.ALL,
      projectUrl: constants.GITLABURL
    });
  });

  Router.post('/addScript', function(req, res) {

    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = UPLOAD_FOLDER; //设置上传目录
    form.keepExtensions = true; //保留后缀

    form.parse(req, function(err, fields, files) {
      if (err) {
        req.flash(err.toString());
        res.redirect('/autoTest');
        return;
      }

      var extName = '';

      if (files.fulAvatar.type) {
        extName = 'js';
      }

      if (extName.length === 0) {
        req.flash('只支持上传JavaScript文件');
        res.redirect('/autoTest');
        return;
      }

      var d = new Date();
      var yr = d.getFullYear() % 100,
        mon = d.getMonth() + 1,
        day = d.getDay(),
        h = d.getHours(),
        min = d.getMinutes(),
        s = d.getSeconds();

      function pad(d) {
        return (d < 10 ? "0" : "") + d;
      }
      var timestamp = '' + pad(yr) + pad(mon) + pad(day) + '_' + pad(h) + pad(min) + pad(s);

      var avatarName = timestamp + '.' + extName;
      var newPath = form.uploadDir + avatarName;

      console.log(newPath);
      fs.renameSync(files.fulAvatar.path, newPath); //重命名

      //获取参数
      var desc = fields.scriptDesc; //脚本描述
      var username = req.session.userInfo.username;


      var scriptJson = {};
      var currScript = {
        desc: desc,
        filePath: newPath
      };
      //console.log(fields,req.body,currScript);

      var jsonpath = path.join(__dirname, '../testScript.json');

      if (fs.existsSync(jsonpath)) {
        scriptJson = JSON.parse(fs.readFileSync(jsonpath).toString());
      }


      if (!scriptJson.hasOwnProperty(username)) {
        scriptJson[username] = {
          "scripts": []
        };
      }

      scriptJson[username].scripts.push(currScript);

      fs.writeFileSync(jsonpath, JSON.stringify(scriptJson));

      req.flash('上传成功');
      res.redirect('/autoTest');
    });

  });

  Router.post('/delScript', function(req, res) {

    var jsonpath = path.join(__dirname, '../testScript.json');
    var scriptJson = {};
    var delPath = req.body.path;
    //var desc = req.body.desc;
    var userName = req.session.userInfo.username;

    if (fs.existsSync(jsonpath)) {
      scriptJson = JSON.parse(fs.readFileSync(jsonpath).toString());
    }

    var files = scriptJson[userName].scripts;

    files = files.filter(function(item) {
      return item.filePath !== delPath;
    }).map(function(item) {
      return {
        desc: item.desc,
        filePath: item.filePath
      };
    });

    scriptJson[userName].scripts = files;

    fs.writeFileSync(jsonpath, JSON.stringify(scriptJson));

    fs.stat(delPath, function(err, stats) {
      console.log(stats);
      if (err) {
        return console.error(err);
      }
      fs.unlinkSync(delPath);
    });

    req.flash('删除成功');
    res.redirect('/autoTest');
  });

  
  Router.post('/runScript', function(req, res) {
    var runPath = req.body.path;
    async(function() {
      var cmdret = await (req.exec(runPath, {
        precmd:'casperjs',
        isStream:true
      }));
      //console.log(runPath)
      // console.log(cmdret);
      multiStream([cmdret]).pipe(res);
      // var mystreams = await (req.exec('casperjs '+runPath, {
      //   isStream:true
      // }));
      //console.log(typeof(cmdret));
      //fs.writeFile("123.txt",cmdret);
      //res.send('<link rel="stylesheet" href="/css/iframe.css">' + cmdret);
      //multiStream(mystreams).pipe(res);
      
    })();

  });
    
  return Router;
};
