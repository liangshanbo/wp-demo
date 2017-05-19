var fs = require('fs');
var path = require('path');
var version_path = path.join(__dirname, '../config/version.js');
var version_path1 = path.join(__dirname, '../config/version1.js');
var version = '/' + (fs.existsSync(version_path) ? fs.readFileSync(version_path, {
	encoding: 'utf-8'
}) : Date.now());
var cp = require('child_process');

module.exports.getVersion = function(conf, req) {
	if (conf.cdn && !/^m(\-pre)?\.gomeplus\.in/.test(req.headers.host)) {
		var cdn = conf.cdn,
			new_conf = conf,
			distpath = cdn + version.trim() + '/m/dist',
			debugpath = cdn + version.trim() + '/m/src';
		new_conf.build.wapjspath = distpath;
		new_conf.build.wapcsspath = distpath;
		new_conf.debug.wapjspath = debugpath;
		new_conf.debug.wapcsspath = debugpath;
		return new_conf;
	}
	return conf;
};

module.exports.setVersion = function(error,version) {
	// cp.exec('echo ' + version + ' > ' + version_path);
	// console.log(fs.accessSync(version_path));
	// if(error){
	// 	console.log(error);
	// 	return;
	// }
	// fs.writeFileSync(version_path1,version,{encoding:'utf8'});
	// return;
};