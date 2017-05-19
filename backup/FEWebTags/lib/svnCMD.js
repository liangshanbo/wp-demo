/**
 * @author fuqiang
 * @date 20160629
 * @fileoverview svn通用操作
 */

var async = require('asyncawait/async');
var await = require('asyncawait/await');
var exec = require('child_process').exec;
var util = require('../lib/util.js');
var Stream = require('stream');
var wss = require('../lib/ws').ws;
var wsR = null;
var connect = false;
wss.on('connection', function connection(ws) {
  //ws.send({666:666});
  console.log('connection');
  connect = true;
  wsR = ws;
  ws.on('message', function incoming(signal) {
    console.log('received: %s', signal);
  });
  ws.on('close', function close() {
    console.log('disconnected')
  });
  //ws.send('something');
});

var auth = function(username, pwd) {
  return '--username ' + username + ' --password ' + pwd + ' ';
};

function cmdStream(child, resolve, reject) {
  var rs = new Stream.Readable();
  rs._read = function() {};
  child.stdout.on('data', function(data) {
    rs.push(data);
  });
  child.stdout.on('end', function() {
    rs.push(null);
    resolve(rs);
  });
  child.stdout.on('error', function(err) {
    reject(err);
  });
}


function svnExecCmd(cmd, username, pwd, hasMsg, precmd, isStream) {
  return new Promise(function(resolve, reject) {
	if(precmd !== 'git'){
	cmd = precmd + ' ' + (precmd === 'svn' ? auth(username, pwd) + ' ' : '') + cmd;
    	cmd = hasMsg ? cmd + ' -m "hit tags by FEwebTags"' : cmd;
	}
    if (isStream) {
      var child = exec(cmd, util.decodeParam, function(err) {
        if (err) {
          //wsR.send(err);
          reject(err);
        }
      });
      cmdStream(child, resolve, reject);
    } else {
      exec(cmd, util.decodeParam, function(err, ret) {
        if (err) {
          var data = {
            type:'err',
            msg:err
          };
          if(connect && wsR){
            wsR.send(JSON.stringify(data));
          }
          reject(err);
        } else {
          var data = {
            type:'ret',
            msg:ret
          };
          if(connect && wsR){
            wsR.send(JSON.stringify(data));
          }
          ret = util.decode(ret);
          resolve(ret);
        }
      });
    }
  });
}

function svnExecCmds(cmds, username, pwd, params, cb) {
  var oneCmd = typeof cmds === 'string';
  cmds = oneCmd ? [cmds] : cmds;
  params = params ? params : {};
  var defaultParams = {
    precmd: 'svn',
    hasMsg: false,
    isStream: false
  };
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      if (params[key]) {
        defaultParams[key] = params[key];
      }
    }
  }
  async(function() {
    var ret = cmds.map(function(cmd) {
      var retult = await (svnExecCmd(cmd, username, pwd, defaultParams.hasMsg, defaultParams.precmd, defaultParams.isStream));
      return retult;
    });
    cb(null, oneCmd ? ret[0] : ret);
  })().catch(function(err) {
    cb(err);
  });
}

function svnExec(cmds, username, pwd, params) {
  return new Promise(function(resolve, reject) {
    svnExecCmds(cmds, username, pwd, params, function(err, ret) {
      if (err) {
        reject(err);
      } else {
        resolve(ret);
      }
    });
  });
}

module.exports = svnExec;
