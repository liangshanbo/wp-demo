/**
 * Created by zhangmike on 16/8/31.
 */
var path = require('path');
var chlid = require('child_process');
var exec = chlid.exec;
var fs = require('fs');
var gitProjectJsonPath = path.join(__dirname, "./project.json"),
	gitProjectJson = {};
if (fs.existsSync(gitProjectJsonPath)) {
	gitProjectJson = JSON.parse(fs.readFileSync(gitProjectJsonPath).toString());
}
for(var item in gitProjectJson){
	var content = gitProjectJson[item];
	var cmd = '';
	if(content['svn'] && !fs.existsSync(content['diskPath'])){
		cmd = ' svn --username zhangzhao --password 1qaz!QAZ checkout ' + content['svn'] + ' ' + content['diskPath'];
	}
	exec(cmd, function(err, stdout, stderr) {
		console.log(err);
		console.log('成功!')
	});
}