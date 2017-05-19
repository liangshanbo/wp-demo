var express = require('express');
var router = express.Router();

module.exports = [];

function addRouter(path) {
  module.exports.push(require(path)(router));
}

addRouter('./login');
// addRouter('./panel');
addRouter('./git/gitPanel');
// addRouter('./update');
addRouter('./git/gitUpdate');
// addRouter('./project');
addRouter('./git/gitProject');
addRouter('./git/gitOnline');
// addRouter('./navbar');
// addRouter('./autoTest');