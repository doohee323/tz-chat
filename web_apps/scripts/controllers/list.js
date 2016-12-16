'use strict';

/**
 * @ngdoc function
 * @name tzChatApp.controller:ListCtrl
 * @description # ListCtrl Controller of the tzChatApp
 */

angular.module('tzChatApp').controller(
    'ListCtrl',
    [
        '$scope',
        '$http',
        'StorageCtrl',
        function($scope, $http, StorageCtrl) {

          var user = StorageCtrl.getSession();
          if (user.userid) {
            $scope.data = {};
            $scope.data = user;
            $scope.userid = user.userid;
            $scope.gender = user.gender;
          }

          $scope.waitList = function() {
            $http({
              method : 'GET',
              url : config.socket_domain + ':3000/talklist'
            }).then(
                function successCallback(res) {
                  if (res && res.data && res.data.length > 0) {
                    var backup = res.data;
                    var input = [];
                    for (var i = 0; i < res.data.length; i++) {
                      // res.data[i].socketid =
                      // encodeURIComponent(res.data[i].socketid);
                      input.push(res.data[i].userid);
                    }
                    $http(
                        {
                          method : 'GET',
                          url : config.domain + '/waitList/waitList?userids='
                              + JSON.stringify(input) + "&userid="
                              + user.userid
                        }).then(function successCallback(res) {
                      if (res && res.data) {
                        for (var i = 0; i < res.data.length; i++) {
                          res.data[i].socketid = backup[i].socketid;
                        }
                        $scope.datas = gf_GetTicketImg(res.data);
                      } else {
                        sweetAlert('', 'Failed to query', 'error');
                      }
                    }, function errorCallback(res) {
                      sweetAlert('', 'Failed to query', 'error');
                    });
                  }
                }, function errorCallback(res) {
                  sweetAlert('', 'Failed to query', 'error');
                });
          };

          $scope.init = function(scope) {
            $scope.waitList();
          }

          $scope.open = function(data) {
            if (data.userid != $scope.userid) {
            // && data.gender != $scope.gender
              gf_Scope($scope, 'requestFrm').open(data);
            }
          }

        } ]);
