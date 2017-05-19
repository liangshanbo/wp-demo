var express = require('express');
var router = express.Router();
var Config = require('../config');
var request = require('./public/request');

var config = Config["config"][process.env.NODE_ENV]["static"];
var vmanager = require('../config/version_manager');
global.timestamp = Config.timestamp;

module.exports = [];

/**
 * title: 统一处理response header(禁止缓存)
 */
router.get("*", function(req, res, next) {
	var new_config = vmanager.getVersion(config, req);
	global.config = /debug/.test(req.url) ? new_config.debug : new_config.build;
	// console.log(global.config);
	res.header("Cache-Control", "no-store,must-revalidate");
	next();
});

function addRouter(path) {
	module.exports.push(require(path)(router));
}

addRouter("./api");
addRouter("./test");
addRouter("./internal");
addRouter("./home");
addRouter("./game");
addRouter("./headline");
addRouter("./account");