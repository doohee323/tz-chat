'use strict';

/**
 * Module dependencies.
 */
var logger = require('../app.js').winston;
var config = require('../app.js').config;
var utils = require('../app.js').utils;
var socketHelper = require('../app.js').socketHelper;

/**
 */
exports.socket_insert = function(req, res, next) {
  var roomid =  req.params.roomid;
  var rslt = [];
  // node server to client broadcasting!
  var url = config.socket.domain + ':' + config.socket.port + '/tz_socket';
  var socket = require('socket.io-client')(url, {
    forceNew : true
  });
  socket.on('connect', function() {
    rslt[rslt.length] = {
      test : 1
    };
    socket.emit(roomid + 'insert', JSON.stringify(rslt));
    utils.log('debug', 'node server to client broadcasting!');
  });
  return next(0, rslt);
};

exports.talklist = function(req, res, next) {
  return next(0, socketHelper.talklist());
};

exports.socketlist = function(req, res, next) {
  return next(0, socketHelper.socketlist());
};
