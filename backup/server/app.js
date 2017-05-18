var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var bodyParser = require('body-parser');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var routes = require('./routes/index');
var app = express();
var filter = require('./controller/filters');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('static'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    name: 'overseah5',
    secret: 'overseah5',
    maxAge: 60 * 60 * 1000  // 1 hours
}));
app.use(function(req, res, next) {
    res.locals.session = req.session;
    res.locals.userinfo = req.session.userInfo || null;
    next();
});

routes.forEach(function(router) {
   app.use(router);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  var static = {
      csspath: 'notFind/notFind.css',
      jspath: 'notFind/index.js'
  };
  res.render("404", {
      title: '404',
      config: global.config,
      static: static
  })
  //next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    var status = err.status || 500;
  //res.status(err.status || 500);
    if(status === 500){
        var static = {
            csspath: 'notFind/notFind.css',
            jspath: 'notFind/index.js'
        };
        res.render("500", {
            title: '500',
            config: global.config,
            static: static
        });
    };
});


module.exports = app;
