/**
 * @author fuqiang
 * @fileoverview main app.js
 * @date 20151201
 */
var express = require('express');
var middlewareCommon = require('./middleware/common');
var app = express();
var PORT = process.env.FEwebTags_PORT || 3344;

middlewareCommon(app);
app.listen(PORT);
console.log('the server is listen on %s',PORT);
