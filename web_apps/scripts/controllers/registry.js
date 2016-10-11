'use strict';

/**
 * @ngdoc function
 * @name tzChatApp.controller:RegistryCtrl
 * @description # RegistryCtrl Controller of the tzChatApp
 */
angular
    .module('tzChatApp')
    .controller(
        'RegistryCtrl',
        [
            '$scope',
            '$http',
            '$location',
            '$timeout',
            'StorageCtrl',
            'CommcdCtrl',
            function($scope, $http, $location, $timeout, StorageCtrl,
                CommcdCtrl) {

              $scope.init = function(scope) {
                $scope.meetingTypeList = {
                  option : CommcdCtrl.getCache('만남유형')
                };

                $scope.talkStyleList = {
                  option : CommcdCtrl.getCache('대화유형')
                };

                $scope.ageList = {};
                $scope.ageList.option = [];
                for (var i = 15; i < 50; i++) {
                  var op = {
                    id : i,
                    name : i
                  };
                  $scope.ageList.option.push(op);
                }

                $scope.emailList = {
                  option : CommcdCtrl.getCache('이메일')
                };

                $scope.region1List = {
                  option : CommcdCtrl.getCache('지역')
                };
                $scope.region2List = {
                  option : CommcdCtrl.getCache('서울특별시')
                };
              }

              $scope.changRegion1 = function() {
                $scope.region2List = {
                  option : CommcdCtrl.getCache($scope.data.region1)
                };
              };

              $scope.isChecked_userid = false;
              $scope.isChecked_nickname = false;
              $scope.checkDub = function(id) {
                if (!$scope.data[id] || $scope.data[id] === '') {
                  return;
                }

                $http({
                  method : 'GET',
                  url : config.domain + '/user/get/' + JSON.stringify({
                    id : $scope.data[id]
                  })
                }).then(function successCallback(res) {
                  if (res && res.data[id] === $scope.data[id]) {
                    sweetAlert('', '이미 존재합니다.', 'info');
                  } else {
                    if (!$scope['isChecked_' + id]) {
                      console.log('check !' + id);
                      $scope['isChecked_' + id] = true;
                    }
                  }
                }, function errorCallback(res) {
                  sweetAlert('에러', '사용자를 확인할 수 없습니다.', 'error');
                });
              };

              $scope.changeInput = function(id) {
                $scope['isChecked_' + id] = false;
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

              $scope.isValid = false;
              $scope.$watch(function() {
                var scope = gf_Scope($scope, 'regstryFrm');
                if (scope.regstryFrm && scope.regstryFrm.$dirty) {
                  $scope.isValid = scope.regstryFrm.$valid;
                }
              });

              $scope.changeSelect = function(scope) {
                scope.regstryFrm.meetingType.$invalid = true;
              };

              $scope.changePassword = function(scope) {
                // data.passwd != data.passwd2 && regstryFrm.passwd.$valid
                if ($scope.data.passwd2 && $scope.data.passwd) {
                  if ($scope.data.passwd2 != $scope.data.passwd) {
                    debugger;
                  }
                }
                return true;
              };

              $scope.compare = function(scope, repass) {
                $scope.isSame = scope.data.passwd === repass ? true : false;
              }

              $scope.changeGender = function(scope) {
                gf_SwitchGender(scope, scope.data.gender);
              }

              $scope.registry = function(scope) {
                if (!$scope.isValid) {
                  return;
                }

                $http(
                    {
                      method : 'POST',
                      url : config.domain + "/user/add?user="
                          + JSON.stringify(scope.data)
                    }).then(function successCallback(res) {
                  var input = {
                    data : res.data
                  };
                  StorageCtrl.setCache('session', input, 10000);
                  $location.path('/setting');
                }, function errorCallback(res) {
                  sweetAlert('', '가입을 실패하였습니다.', 'error');
                  console.log(res);
                });

              };

            } ]);
