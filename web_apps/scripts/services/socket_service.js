'use strict';

angular.module('tzChatApp').factory(
    'socket',
    [
        '$rootScope',
        'StorageCtrl',
        'config',
        function($rootScope, StorageCtrl, config) {
          var socket = {};
          this.scope = $rootScope;
          return {
            ready : function(roomid, callback) {
              try {
                var user = StorageCtrl.getSession();
                var socketUrl = document.location.protocol + '//'
                    + document.location.hostname + ':3002' + '/tz_chat?roomid='
                    + roomid + "&userid=" + user.userid;
                if (socket[roomid]) {
                  //console.log(roomid + ' is disconnected');
                  socket[roomid].disconnect();
                }
                socket[roomid] = io.connect(socketUrl);
              } catch (e) {
                return;
              }
              socket[roomid].on('connect', function() {
                //console.log(roomid + ' is connected');
                callback(socket);
              });

              socket[roomid].on('disconnect', function() {
                //console.log(roomid + ' is disconnected');
                callback(socket);
              });
            },
            on : function(eventName, callback) {
              var roomid = gf_getRoomId(eventName);
              socket[roomid].on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                  callback.apply(socket[roomid], args);
                });
              });
            },
            emit : function(eventName, data, callback) {
              var roomid = gf_getRoomId(eventName);
              if (socket[roomid]) {
                socket[roomid].emit(eventName, data, function() {
                  callback();
                })
              } else {
                console.log(roomid + ' is disconnected!!!');
              }
            },
            off : function(eventName, callback) {
              var roomid = gf_getRoomId(eventName);
              if (roomid != 's_talk' && socket[roomid]
                && socket[roomid].disconnected == false
                && socket[roomid].connected == true) {
                socket[roomid].emit(eventName, "{'status':'disconnect'}");
                socket[roomid].disconnect();
                //console.log(roomid + ' is disconnected');
                callback();
              }
            }
          };
        } ]);

var gf_getRoomId = function(eventName) {
  var roomid;
  if (eventName.startsWith('s_talk')) {
    roomid = 's_talk';
  } else {
    roomid = eventName.substring(0, eventName.indexOf('_insert'));
  }
  return roomid;

}
