'use strict';

/**
 * @ngdoc function
 * @name tzChatApp.controller:MainCtrl
 * @description # MainCtrl Controller of the tzChatApp
 */
angular.module('tzChatApp').controller(
    'MainCtrl',
    [
        '$scope',
        '$http',
        '$timeout',
        '$location',
        'socket',
        'StorageCtrl',
        'CommcdCtrl',
        function($scope, $http, $timeout, $location, socket, StorageCtrl,
            CommcdCtrl) {

          CommcdCtrl.query();

          $scope.init = function(scope) {

            $scope.user = StorageCtrl.getSession();
            if ($scope.user.nickname) {
              $scope.userid = $scope.user.userid;
              $scope.gender = $scope.user.gender;
              $('#loginBtn').text('로그아웃');
            }

            $scope.agentlist();
            $scope.waitList();

            socket.ready('s_talk', function(sock) {
              $scope.user.socketid = sock.id;
              $scope.socketid = sock.id;
              StorageCtrl.setCache('session', {
                data : $scope.user
              }, 10000);
              console.log('s_talk' + ' is ready!');
            });

          }

          var logout = function() {
            var userid;
            if (StorageCtrl.getCache('saveId') === 'true') {
              userid = StorageCtrl.getSession('session').userid
            }
            StorageCtrl.removeSession();
            if (userid) {
              StorageCtrl.setCache('session', {
                data : {
                  userid : userid
                }
              }, 10000000);
            }
            $location.path('/login');
          }

          $scope.login = function() {
            if ($('#loginBtn').text() === '로그인') {
              $location.path('/login');
            } else {
              logout();
            }
          }

          $scope.agentlist = function() {
            var data = {
              count : 3
            };
            $http({
              method : 'GET',
              url : config.domain + '/agent/agentlist/' + JSON.stringify(data)
            }).then(function successCallback(res) {
              if (res) {
                $scope.agents = res.data;
              } else {
                sweetAlert('', 'Query를 실패하였습니다.', 'error');
              }
            }, function errorCallback(res) {
              sweetAlert('', 'Query를 실패하였습니다.', 'error');
            });
          };

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

                    var userid = "";
                    if ($scope.user.userid) {
                      userid = $scope.user.userid;
                    }
                    $http(
                        {
                          method : 'GET',
                          url : config.domain + '/waitList/waitList?userids='
                              + JSON.stringify(input) + "&userid=" + userid
                        }).then(function successCallback(res) {
                      if (res && res.data) {
                        for (var i = 0; i < res.data.length; i++) {
                          try {
                            res.data[i].socketid = backup[i].socketid;
                            $scope.datas = res.data;
                          } catch (e) {
                          }
                        }
                      } else {
                        sweetAlert('', 'Query를 실패하였습니다.', 'error');
                      }
                    }, function errorCallback(res) {
                      sweetAlert('', 'Query를 실패하였습니다.', 'error');
                    });
                  }
                }, function errorCallback(res) {
                  sweetAlert('', 'Query를 실패하였습니다.', 'error');
                });
          };

          $scope.chat = function(data) {
            if ($scope.user.nickname) {
              if ($scope.user.gender != data.gender) {
                $scope.open(data);
              }
            } else {
              $location.path('/login');
            }
          }

          $scope.talk = function(data) {
            if ($scope.user.nickname) {
              if (data.userid != $scope.user.userid) {
                gf_Scope($scope, 'requestFrm').open(data);
              }
            } else {
              $location.path('/login');
            }
          }

          $scope.open = function(data) {
            gf_Scope($scope, 'requestFrm').open(data);
          }

        } ]);
