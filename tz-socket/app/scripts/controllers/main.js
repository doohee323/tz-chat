'use strict';

/**
 * @ngdoc function
 * @name tzSocket.controller:MainCtrl
 * @description # MainCtrl Controller of the tzSocket
 */
angular.module('tzSocket').controller('MainCtrl',
    function($scope, socket, CommcdCtrl) {
      // angular.module('tzSocket').controller('MainCtrl',
      // function($scope, CommcdCtrl) {

      CommcdCtrl.query();
      socket.on('item_inserted', function(data) {
        var obj = $($('#left_template').html());
        obj.find("#text1").text(data);
        obj.find(".c-name").text('test');
        obj.find(".img > img")[0].src = 'aaa.jpg';
        document.getElementById("c-box").appendChild(obj[0]);
      });

      $scope.sendMsg = function(scope) {
//        debugger;
        console.log('----------------' + scope.text1);
        var obj = $($('#right_template').html());
        obj.find("#text2").text(scope.text1);
        document.getElementById("c-box").appendChild(obj[0]);
        socket.emit('item_insert', scope.text1);
      };

    });
