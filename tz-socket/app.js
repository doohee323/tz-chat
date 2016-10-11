'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var winston = require('winston');
//var prototype = require('./app/scripts/common/utils/prototype');
var util = require('util');
var utils = require('./helpers/utils');
var socketHelper = require('./config/socket.js');
	
/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// Set the node enviornment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 3000;

// Initializing system variables 
var config = require('./config/config');
var auth = require('./config/authorization');

console.log('process.env.NODE_ENV:' + process.env.NODE_ENV);
process.argv.forEach(function (val, index, array) {
  //console.log(index + ': ' + val);
//  if(index == 2 && val.indexOf('=') > -1) {
//  	config.app.instance_no = val.split('=')[1];
//  }
});
//console.log('config.app.instance_no:' + config.app.instance_no);
//process.env.PORT = parseInt(process.env.PORT) + parseInt(config.app.instance_no);
console.log('process.env.PORT:' + process.env.PORT);

// server crash block
process.on('uncaughtException', function (err) {
	console.log('Caught exception: ' + err);
});

fs.exists(config.logs_dir, function (exists) {
	if(!exists) {
		fs.mkdir(config.logs_dir);
	}
});

var app = express();

winston.add( winston.transports.DailyRotateFile, {
  level: 'debug',
  json: false,
  filename: config.logs_dir + '/debug-',
  datePattern: 'yyyy-MM-dd.log'
});

var appExports = module.exports = {};
appExports.config = config;
appExports.utils = utils;
appExports.winston = winston;
appExports.socketHelper = socketHelper;

// Express settings
require('./config/express')(app);

//// redis subscribe
//var redis, redis_helpers, subClient;
//if(config.redis.useYn == 'Y') {
//	redis = require("redis");
//console.log('~~~~~~~');
//	redis_helpers = require('./helpers/redis_helpers.js');
//	subClient = redis.createClient(config.redis.port, config.redis.host);
//	subClient.on("subscribe", function (channel, count) {
//		console.log('subscribe: ' + channel);
//		//debugger;
//	});
//	subClient.on("message", function(channel, message) {
//		debugger;
//		redis_helpers(message);
//	    //subClient.unsubscribe();
//	    //subClient.end();
//	});
//	subClient.subscribe("pubChannel");
//}

socketHelper.init(app);

console.log('started!!!!');
