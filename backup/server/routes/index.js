var express = require('express');
var router = express.Router();
var config = require('../config')[process.env.NODE_ENV]["static"];
var request = require('./public/request');
var vmanager = require('../config/version_manager');

module.exports = [];

/**
 * title: 统一处理response header(禁止缓存)
 */
router.get("*", function(req, res, next) {
    let url = req.url;
    global.w_response = res;
    var new_config = vmanager.getVersion(config, req);
    global.config = /debug/.test(url) ? new_config.debug : new_config.build;
    res.header("Cache-Control", "no-store,must-revalidate");
    if (url.indexOf("/api") < 0) { // device设备号
        if (!req.cookies["gomeplus_wap_device"]) {
            let device = new Date().valueOf() + Math.floor(Math.random() * 10);
            res.cookie('gomeplus_wap_device', device, {
                expires: new Date("2027")
            });
        }
    }
    next();
});

function addRouter(path) {
    module.exports.push(require(path)(router, config));
}

addRouter("./api");
addRouter("./internal");
addRouter("./login");
addRouter("./register");
addRouter("./pro");
addRouter("./index/index");
addRouter("./index/popularlist");
addRouter("./forgot");
addRouter("./user");
addRouter("./search");
addRouter("./goods");
addRouter("./rebate");
addRouter("./404");
addRouter("./500");
addRouter("./invite");
addRouter("./hy");
addRouter("./f");
addRouter("./account");
addRouter("./introduction");