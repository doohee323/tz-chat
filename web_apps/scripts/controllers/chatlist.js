'use strict';

/**
 * @ngdoc function
 * @name tzChatApp.controller:ChatListCtrl
 * @description # ChatListCtrl Controller of the tzChatApp
 */

angular
    .module('tzChatApp')
    .controller(
        'ChatListCtrl',
        [
            '$rootScope',
            '$scope',
            '$http',
            '$timeout',
            '$location',
            'StorageCtrl',
            'CommcdCtrl',
            'PagerService',
            function($rootScope, $scope, $http, $timeout, $location, StorageCtrl,
                CommcdCtrl, PagerService) {

              var user = StorageCtrl.getSession();
              
              $scope.chatlist = function(userid) {
                $http({
                  method : 'GET',
                  url : config.domain + '/chat/chatlist?target=' + userid
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
                            if (typeof res.data === 'string') {
                              res.data = JSON.parse(res.data);
                            }
                            if (res.data.length > 0) {
                              $scope.created_at = res.data[0].created_at;
                            } else {
                              $scope.created_at = "";
                            }
                            $scope.datas = res.data;
                            $rootScope.chatcount = $scope.datas.length;
                          } else {
                            sweetAlert('', '조회를 실패하였습니다.', 'error');
                          }
                        }, function errorCallback(res) {
                          sweetAlert('', '조회를 실패하였습니다.', 'error');
                        });
              };

              $scope.init = function(scope) {
                $scope.chatlist(user.userid);
              }

              $scope.join = function(idx) {
                var source = $scope.datas[idx];
                var params = {};
                if (source.status === 'accepted') {
                  params.target = source;
                  StorageCtrl.setCache('params', params);
                  $location.path('/chat');
                } else if (source.status === 'reject') {
                } else {
                  if (source.userid != user.userid) {
                    if(user.gender === 'man') {
                      params.source = source;
                      gf_Scope($rootScope, 'acceptFrm').$parent.isshow2 = true;
                      $rootScope.source = params.source;
                    } else {
                      sweetAlert('', '남성회원이 수락하면 채팅창이 오픈됩니다.', 'info');
                    }
                  }
                }
              };

            } ]);
