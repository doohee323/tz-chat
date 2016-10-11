'use strict';

var _this;

var express = require('express');
var config = require('./config');
var io;

exports.init = function(app) {
  _this = this;

  var socket_port = parseInt(config.socket.port);
  socket_port = socket_port + parseInt(config.app.instance_no);

  var server = require('http').createServer(app);
  io = require('socket.io').listen(socket_port, server);
  // io.set('heartbeat timeout', 4000);
  // io.set('heartbeat interval', 2000);
  console.log("socket server has started on port!!!! " + socket_port)
  var logger = require('../app.js').winston;

  var Room = io.of('/s_talk').on('connection', function(socket) {
    _this.on(socket, 's_talk');
  });
  
  io.of('/s_talk').on('disconnection', function(socket) {
    console.log('s_talk disconnected');
  });

  var Room2 = io.of('/tz_socket').on('connection', function(socket) {
    var roomid = socket.client.request._query.roomid;
    if (roomid && roomid != 'undefined') {
      _this.on(socket, roomid);
    }
  });

  io.of('/tz_socket').on('disconnection', function(socket) {
    console.log('tz_socket disconnected');
  });

  __dirname = __dirname.substring(0, __dirname.lastIndexOf('/'));
  app.use(express.static(__dirname + ''));

};

exports.on = function(socket, roomid) {
  console.log(roomid + '_insert is ready!');
  socket.on(roomid + '_insert', function(data) {
    console.log(roomid + '_insert: ' + data + '/');
    socket.broadcast.emit(roomid + '_inserted', data);
  });
}

exports.talklist = function(socket, roomid) {
  var clients = io.of('/s_talk').clients();
  console.log("talklist clients " + clients);
  var users = [];
  for ( var socketId in io.sockets.connected) {
    if (io.sockets.connected[socketId].client.request) {
      if (io.sockets.connected[socketId].client.request._query.roomid == 's_talk') {
        var user = {
          roomid : 's_talk',
          socketid : socketId,
          userid : io.sockets.connected[socketId].client.request._query.userid
        }
        users.push(user);
      }
    }
  }
  console.log("talklist clients1 " + users);
  return users;
}

exports.socketlist = function(socket, roomid) {
  var clients = io.of('/tz_socket').clients();
  console.log("socketlist clients " + clients);
  var users = [];
  for ( var socketid in io.sockets.connected) {
    if (io.sockets.connected[socketid].client.request) {
      if (io.sockets.connected[socketid].client.request._query.roomid != 's_talk') {
        var user = {
          roomid : 's_talk',
          socketid : socketid,
          userid : io.sockets.connected[socketid].client.request._query.userid
        }
        users.push(user);
      }
    }
  }
  console.log("socketlist clients1 " + users);
  return users;
}
