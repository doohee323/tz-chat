'use strict';

/**
 * @ngdoc function
 * @name tzChatApp.controller:LoginCtrl
 * @description # LoginCtrl Controller of the tzChatApp
 */

angular
    .module('tzChatApp')
    .controller(
        'LoginCtrl',
        [
            '$scope',
            '$http',
            '$timeout',
            '$location',
            'CommcdCtrl',
            'StorageCtrl',
            function($scope, $http, $timeout, $location, CommcdCtrl,
                StorageCtrl) {

              CommcdCtrl.query();

              $scope.$on('$viewContentLoaded', function(event) {
                var user = StorageCtrl.getSession();
                if (user.userid) {
                  $scope.data = {};
                  $scope.data.userid = user.userid;
                  $scope.data.passwd = user.passwd;
                }

                if (StorageCtrl.getCache('saveId') === 'true') {
                  $scope.saveId = true;
                }
              })

              $scope.login = function(scope) {
                StorageCtrl.scope = scope;
                $http(
                    {
                      method : 'GET',
                      url : config.domain + '/user/login/'
                          + JSON.stringify(scope.data)
                    })
                    .then(
                        function successCallback(res) {
                          if (res) {
                            if (typeof res.data === 'string'
                                && res.data
                                    .indexOf('A PHP Error was encountered') > -1) {
                              res.data = res.data.substring(res.data
                                  .indexOf('{'), res.data.lastIndexOf('}') + 1);
                            }
                            console.log('-----------------------res:'
                                + res.data);
                            if (res.data.userid) {
                              StorageCtrl.setCache('session', res, 10000);
                              if (StorageCtrl.scope.saveId) {
                                StorageCtrl.setCache('saveId', 'true', 10000);
                              } else {
                                StorageCtrl.initCache('saveId');
                              }
                              $timeout(
                                  function() {
                                    $location.path('/setting');
                                  }, 30);
                            } else {
                              sweetAlert('', 'Can not verify user data.',
                                  'warning');
                            }
                          } else {
                            sweetAlert('Error', 'Failed to sign in.', 'error');
                          }
                        }, function errorCallback(res) {
                          sweetAlert('Error', 'Failed to sign in.', 'error');
                        });
              };

            } ]);
