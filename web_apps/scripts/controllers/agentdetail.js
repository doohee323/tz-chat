'use strict';

/**
 * @ngdoc function
 * @name tzChatApp.controller:AgentDetailCtrl
 * @description # AgentDetailCtrl Controller of the tzChatApp
 */
angular
    .module('tzChatApp')
    .controller(
        'AgentDetailCtrl',
        [
            '$scope',
            '$http',
            '$location',
            'CommcdCtrl',
            'StorageCtrl',
            function($scope, $http, $location, CommcdCtrl, StorageCtrl) {

              $scope.init = function(scope) {
                var user = StorageCtrl.getSession();
                var input = {};
                var params = StorageCtrl.getCache('params');
                $scope.target = params.target;
                var userid = $scope.target.userid;
                if (user.userid > userid) {
                  input = {
                    roomid : user.userid + '_' + userid
                  };
                } else {
                  input = {
                    roomid : userid + '_' + user.userid
                  };
                }
              }

              $scope.open = function(data) {
                gf_Scope($scope, 'requestFrm').open(data);
              }
              
            } ]);
