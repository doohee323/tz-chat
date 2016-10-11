'use strict';

/**
 * Module dependencies.
 */
module.exports = function(app) {

  var express = require('express');
  var hbs = require('handlebars');
  var config = require('./config');
  var winston = require('winston');
  var expressWinston = require('express-winston');

  var compression = require('compression');
  var cookieSession = require('cookie-session');
  var cookieParser = require('cookie-parser')
  var bodyParser = require('body-parser');
  var session = require('express-session');
  var favicon = require('serve-favicon');
  var fs = require("fs")

  app.set('showStackError', true);
  app.use(compression());
  app.enable("jsonp callback");

  console.log('config.sessionSecret:' + config.sessionSecret);

  app.use(session({
    resave : false,
    saveUninitialized : true,
    secret : config.sessionSecret
  }));

  // CORS
  var allowCrossDomain = function(req, res, next) {
    // res.header('Access-Control-Allow-Credentials', true);
    var oneof = false;
    if (req.headers.origin) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      oneof = true;
    }
    if (req.headers['access-control-request-method']) {
      res.header('Access-Control-Allow-Methods',
          req.headers['access-control-request-method']);
      oneof = true;
    }
    if (req.headers['access-control-request-headers']) {
      res.header('Access-Control-Allow-Headers',
          req.headers['access-control-request-headers']);
      oneof = true;
    }
    if (oneof) {
      res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }
    if (oneof && req.method == 'OPTIONS') {
      res.send(200);
    } else {
      next();
    }
  }
  app.use(allowCrossDomain);

  // access log
  if (process.env.NODE_ENV === 'development') {
    app.use(expressWinston.logger({
      transports : [ new winston.transports.DailyRotateFile({
        json : true,
        filename : config.logs_dir + '/access-',
        datePattern : 'yyyy-MM-dd.log'
      }) ]
    }));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(expressWinston.logger({
      transports : [ new winston.transports.DailyRotateFile({
        json : true,
        filename : config.logs_dir + '/access-',
        datePattern : 'yyyy-MM-dd.log'
      }) ]
    }));
  }

  // access log for error
  if (process.env.NODE_ENV === 'development') {
    app.use(expressWinston.errorLogger({
      transports : [ new winston.transports.Console({
        json : true,
        colorize : true
      }), new winston.transports.DailyRotateFile({
        json : true,
        filename : config.logs_dir + '/access-',
        datePattern : 'yyyy-MM-dd.log'
      }) ]
    }));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(expressWinston.errorLogger({
      transports : [ new winston.transports.Console({
        json : true,
        colorize : true
      }), new winston.transports.DailyRotateFile({
        json : true,
        filename : config.logs_dir + '/access-',
        datePattern : 'yyyy-MM-dd.log'
      }) ]
    }));
  }

  var app_dir = __dirname.substring(0, __dirname.lastIndexOf('/')) + config.app_dir;
  app.use(favicon(app_dir + '/favicon.ico'));

  app.use(function(err, req, res, next) {
    if (~err.message.indexOf('not found'))
      return next();
    console.error(err.stack);
    res.status(500).render('500', {
      error : err.stack
    });
  });

  // app.use(function(req, res, next) {
  // res.status(404).render('404', {
  // url : req.originalUrl,
  // error : 'Not found'
  // });
  // });

  app.set('views', app_dir);
  app.set('view engine', 'ejs');
  app.engine('html', require('ejs').renderFile);

  // Start the app by listening on <port>
  var port = process.env.PORT || config.port;
  console.log("port: " + port)
  
  app.use(express.static('app'));
  var server = app.listen(port, function() {
    console.log("Express server has started on port " + port)
  });

  var router = require('./routes')(app, fs);

};
