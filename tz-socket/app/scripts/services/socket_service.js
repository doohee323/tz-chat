'use strict';

angular.module('tzSocket').factory('socket', function ($rootScope) {
	var socket = null;
	try {
		var socketUrl = document.location.protocol + '//' + document.location.hostname + ':3002' + '/tz_socket';
		socket = io.connect(socketUrl);
	} catch (e) {
		return;
	}
  socket.on('connect',function() {
      console.log('Client has connected to the server!');
    });
  
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});