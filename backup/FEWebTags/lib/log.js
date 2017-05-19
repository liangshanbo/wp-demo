/**
 * @author fuqiang
 * @date 20160701
 * @fileoverview log4js
 */
var log4js = require('log4js');
/*log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('./publics/logs/logs.log'), 'logs');*/

log4js.configure({
	"appenders": [
		{
			"type": "file",
			"filename": "./publics/logs/logs.log",
			"maxLogSize": 1024 * 1024 * 5,
			"backups": 10,
			"category": "logs"
		},
		{
			"type": "file",
			"filename": "./publics/logs/logerror.log",
			"maxLogSize": 1024 * 1024 * 5,
			"backups": 10,
			"category": "logserror"
		}
	]
});
var logger = log4js.getLogger('logs');
logger.setLevel("INFO");

var loggerError = log4js.getLogger('logserror');
loggerError.setLevel("ERROR");

exports.logger =module.exports.logger = logger;
exports.loggerError =module.exports.loggerError = loggerError;
