'use strict';

/**
 * @ngdoc function
 * @name tzChatApp.controller:ListCtrl
 * @description # ListCtrl Controller of the tzChatApp
 */

angular.module('tzChatApp').controller(
    'RequestCtrl',
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

          var user = StorageCtrl.getSession();
          if (user.userid) {
            $scope.data = {};
            $scope.data = user;
            $scope.socketid = user.socketid;
          }

          $scope.init2 = function(scope) {
            $scope.requested = false;
            socket.ready('s_talk', function(sock) {
              user.socketid = sock.id;
              $scope.socketid = sock.id;
              StorageCtrl.setCache('session', {
                data : user
              }, 10000);
              console.log('s_talk' + ' is ready!');
            });
          }

          $scope.open = function(data) {
            if (!data.userid) {
              console.log('data.userid is emptry!!!!');
            }
            $scope.target = {
              userid : data.userid,
              main : data.main,
              nickname : data.nickname,
              age : data.age,
              point : user.point,
              gender : data.gender,
              region1 : data.region1,
              region1 : data.region2
            }
            $scope.isshow = true;
          }

          $scope.close = function() {
            $scope.isshow = false;
            $scope.isshow2 = false;
          }

          $scope.request = function() {
            var params = {
              source : {
                userid : user.userid,
                main : user.main,
                nickname : user.nickname,
                age : user.age,
                gender : user.gender,
                region1 : user.region1,
                region1 : user.region2,
                message : $scope.target.message
              },
              target : $scope.target
            };

            var input = {
              source : user.userid,
              target : params.target.userid,
              status : 'request',
              action : 'request',
              detail : $scope.target.message
            };
            if (user.userid > $scope.target.userid) {
              input.roomid = user.userid + '_' + $scope.target.userid;
            } else {
              input.roomid = $scope.target.userid + '_' + user.userid;
            }
            if (params.source.gender === 'man') {
              input.status = 'accepted';
            }
            $http({
              method : 'POST',
              url : config.domain + '/chat/add?chat=' + JSON.stringify(input)
            }).then(function successCallback(res) {
              if (res && res.data) {
                if (res.data.message) {
                  if (res.data.message === 'Data exists') {
                    sweetAlert('', 'Chatting already exist!', 'info');
                    $location.path('/chatlist');
                  } else if (res.data.message === 'Not enough') {
                    sweetAlert('', 'Point is not enough.', 'info');
                  }
                } else if (res.data.id) {
                  params.source.id = res.data.id;
                  params.status = input.status;
                  StorageCtrl.setCache('params', params);
                  socket.emit('s_talk_insert', JSON.stringify(params));
                  if (user.gender === 'woman') {
                    $scope.requested = true;
                    var msg = 'When the target member accept your request,\n';
                    msg += 'you can get  10 Points.';
                    sweetAlert('', msg, 'info');
                    socket.on('s_talk' + '_inserted', function(data) {
                      var params;
                      if (typeof data === 'string') {
                        params = JSON.parse(data);
                      } else {
                        params = data;
                      }
                      if (params.source === user.userid) {
                        if (params.status === 'accepted') {
                          $location.path('/chat');
                        } else {
                          $scope.close();
                          sweetAlert('', 'Your request is refused.', 'info');
                          $scope.requested = false;
                        }
                      } else if (params.target.userid === user.userid) {
                        var msg = 'The target member acceptted your request.\n';
                        msg += 'You can get 50 Points per each of message.';
                        sweetAlert('', msg, 'info');
                      }
                    });
                  } else {
                    user.point = user.point - 500;
                    params.point = user.point;
                    StorageCtrl.setCache('session', {
                      data : user
                    }, 10000);
                    $location.path('/chat');
                  }
                } else {
                  sweetAlert('Error', 'Failed to save.', 'error');
                }
              } else {
                sweetAlert('Error', 'Failed to save.', 'error');
              }
            }, function errorCallback(res) {
              sweetAlert('Error', 'Failed to save.', 'error');
            });
          }

        } ]);
