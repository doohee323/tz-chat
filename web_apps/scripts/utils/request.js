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
                    sweetAlert('', '이미 Request된 건이 있습니다.', 'info');
                    $location.path('/chatlist');
                  } else if (res.data.message === 'Not enough') {
                    sweetAlert('', 'Point가 부족합니다.', 'info');
                  }
                } else if (res.data.id) {
                  params.source.id = res.data.id;
                  params.status = input.status;
                  StorageCtrl.setCache('params', params);
                  socket.emit('s_talk_insert', JSON.stringify(params));
                  if (user.gender === 'woman') {
                    $scope.requested = true;
                    var msg = '남성회원에게 Request Chatting을 보냈습니다.\n';
                    msg += '남성회원이 Accept Chatting을 하면 10Point가\n';
                    msg += 'Deposit되고 알림이 다시 나타납니다.';
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
                          sweetAlert('', 'Request이 Refuse되었습니다.', 'info');
                          $scope.requested = false;
                        }
                      } else if (params.target.userid === user.userid) {
                        var msg = 'Nickname님이 Chatting을 Accept했습니다.\n';
                        msg += 'Chatting방에서 대화를 나누시면\n';
                        msg += 'Chatting메세지 하나당 50Point가 Deposit됩니다.';
                        sweetAlert('', msg, 'info');
                        // sweetAlert('', 'Request이 승인되었습니다.', 'info');
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
                  sweetAlert('에러', 'Save을 실패하였습니다.', 'error');
                }
              } else {
                sweetAlert('에러', 'Save을 실패하였습니다.', 'error');
              }
            }, function errorCallback(res) {
              sweetAlert('에러', 'Save을 실패하였습니다.', 'error');
            });
          }

        } ]);
