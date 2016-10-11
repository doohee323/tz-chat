'use strict';

/**
 * @ngdoc function
 * @name tzChatApp.controller:PrivateCtrl
 * @description # PrivateCtrl Controller of the tzChatApp
 */
angular.module('tzChatApp').controller(
    'PrivateCtrl',
    [
        '$scope',
        '$http',
        '$location',
        'StorageCtrl',
        function($scope, $http, $location, StorageCtrl) {

          var user = StorageCtrl.getSession();
          $scope.data = {};
          for(var key in user) {
            $scope.data[key] = user[key]; 
          }
          $scope.data2 = {};
          for(var key in user) {
            $scope.data2[key] = user[key]; 
          }

          $scope.isValid1 = false;
          $scope.$watch(function() {
            var scope = gf_Scope($scope, 'privateFrm1');
            if (scope.privateFrm1 && scope.privateFrm1.$dirty) {
              $scope.isValid1 = scope.privateFrm1.$valid;
            }
          });

          $scope.changePassword = function(scope) {
            // data.passwd != data.passwd2 && privateFrm1.passwd.$valid
            if ($scope.data.passwd2 && $scope.data.passwd) {
              if ($scope.data.passwd2 != $scope.data.passwd) {
                debugger;
              }
            }
            return true;
          };

          $scope.compare = function(scope, repass) {
            $scope.isSame = scope.data.passwd1 === repass ? true : false;
          }

          $scope.changePasswd = function(scope) {
            scope.data.userid = user.userid;
            $http(
                {
                  method : 'POST',
                  url : config.domain + "/profile/changePasswd?user="
                      + JSON.stringify(scope.data)
                }).then(function successCallback(res) {
              $location.path('/setting');
            }, function errorCallback(res) {
              sweetAlert('', '패스워드 변경을 실패하였습니다.', 'error');
              console.log(res);
            });
          };

          $scope.changeInput = function(id) {
            $scope['isChecked_' + id] = false;
          };

          $scope.update = function(scope) {
            if (!scope.privateFrm3.$valid) {
              return;
            }
            scope.data2.userid = user.userid;
            $http(
                {
                  method : 'POST',
                  url : config.domain + "/profile/update?user="
                      + JSON.stringify(scope.data2)
                }).then(function successCallback(res) {
              gf_MergeData(scope.data2, user);
              var session = {
                'data' : user
              }
              StorageCtrl.setCache('session', session, 10000);
              $location.path('/setting');
            }, function errorCallback(res) {
              sweetAlert('', '정보변경에 실패하였습니다.', 'error');
              console.log(res);
            });
          };

        } ]);
