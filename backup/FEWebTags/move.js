/**
 * Created by zhangmike on 16/8/3.
 */
var config = require('./config.json');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').execSync;
var async = require('asyncawait/async');
var await = require('asyncawait/await');

async(function() {
	await(fs.readdir(config.nginxConfPath, function(err, files) {
		//console.log('扫描目录:' + files);
		var objStr = fs.readFileSync(__dirname + "/project.json").toString();
		var obj = JSON.parse(objStr);
		if (files && files.length) {
			files.forEach(function (file) {
				var matches = file.match(/^conf(\d+).conf$/);
				var port = matches ? matches[1] : null; //获取文件夹名里的端口
				if (port && obj[port]) {
					var fc = fs.readFileSync(config.nginxConfPath + file).toString();
					var c = fc.replace(/root\s+(.*?);/mg,'root ' + config.newProjectPath +'CDN'+ port+';');
					console.log(fc,c);
					fs.writeFileSync(config.nginxConfPath + file,c);
					obj[port].diskPath = config.newProjectPath + 'CDN'+port;
				}
			});
			//console.log(obj);
			fs.writeFileSync(__dirname + "/project.json", JSON.stringify(obj));
			//exec.exec("service nginx restart");
		}
	}));
})();
