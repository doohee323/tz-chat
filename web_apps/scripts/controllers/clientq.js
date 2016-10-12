'use strict';

/**
 * @ngdoc function
 * @name tzChatApp.controller:ClientqCtrl
 * @description # ClientqCtrl Controller of the tzChatApp
 */
angular
    .module('tzChatApp')
    .controller(
        'ClientqCtrl',
        [
            '$scope',
            '$http',
            '$location',
            'CommcdCtrl',
            'StorageCtrl',
            function($scope, $http, $location, CommcdCtrl, StorageCtrl) {

              var user = StorageCtrl.getSession();

              $scope.emailList = {
                option : CommcdCtrl.getCache('Email')
              };

              $scope.changeEmail = function(scope) {
                if (scope.email2 === 'self') {
                  if (scope.email1) {
                    // scope.data.email = scope.email1;
                    gf_SetViewValue(scope, 'regstryFrm', 'email', scope.email1
                        + '@' + scope.email1);
                  }
                } else {
                  if (scope.email1 && scope.email2) {
                    // scope.data.email = scope.email1 + '@' + scope.email2;
                    gf_SetViewValue(scope, 'regstryFrm', 'email', scope.email1
                        + '@' + scope.email2);
                  }
                }
              };

              $scope.write = function(scope) {
                if (!scope.clientqFrm.$valid) {
                  return;
                }
                scope.data.userid = user.userid;
                $http(
                    {
                      method : 'POST',
                      url : config.domain + "/clientq/add?clientq="
                          + JSON.stringify(scope.data)
                    }).then(function successCallback(res) {
                  $location.path('/setting');
                }, function errorCallback(res) {
                  sweetAlert('Error', 'Failed to save.', 'error');
                  console.log(res);
                });

              };

            } ]);
