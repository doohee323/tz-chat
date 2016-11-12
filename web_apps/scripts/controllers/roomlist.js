'use strict';

/**
 * @ngdoc function
 * @name tzChatApp.controller:RoomListCtrl
 * @description # RoomListCtrl Controller of the tzChatApp
 */

angular
    .module('tzChatApp')
    .controller(
        'RoomListCtrl',
        [
            '$scope',
            '$rootScope',
            '$http',
            '$timeout',
            '$location',
            'StorageCtrl',
            'CommcdCtrl',
            'PagerService',
            function($scope, $rootScope, $http, $timeout, $location, StorageCtrl,
                CommcdCtrl, PagerService) {

              var user;

              $scope.data = {
                'gender' : 'all'
              };

              $scope.region1List = {
                option : CommcdCtrl.getCache('Location')
              };

              $scope.region2List = {
                option : CommcdCtrl.getCache('Seoul')
              };

              $scope.roomTypeList = {
                option : CommcdCtrl.getCache('Room Category')
              };

              $scope.roomlist = function(input) {
                var data = {};
                if (input) {
                  data = input;
                }
                $http(
                    {
                      method : 'GET',
                      url : config.domain + '/room/roomlist/'
                          + JSON.stringify(data)
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
                            $scope.datas = gf_GetTicketImg(res.data);
                            $scope.page();
                          } else {
                            sweetAlert('', 'Failed to query', 'error');
                          }
                        }, function errorCallback(res) {
                          sweetAlert('', 'Failed to query', 'error');
                        });
              };

              $scope.init = function(scope) {
                user = StorageCtrl.getSession();
                if (user.userid) {
                  $scope.userid = user.userid;
                  $scope.gender = user.gender;
                  $scope.roomlist({
                    'gender' : 'all',
                    'userid' : user.userid
                  });
                }
              }

              $scope.add = function() {
                if (user.gender === 'man' && user.point < 300) {
                  sweetAlert('', 'Point is not enough.', 'error');
                  $location.path('/charge');
                } else {
                  $location.path('/room');
                }
              }

              $scope.open = function(data) {
                if (data.userid != $scope.userid) {
                  gf_Scope($scope, 'requestFrm').open(data);
                }
              }
              
              $scope.join = function(idx) {
                var source = $scope.datas[idx];
                var params = {};
                source.chatroom = 'chatroom' + idx;
                params.target = source;
                StorageCtrl.setCache('params', params);
                $location.path('/chat');
              };              

              $scope.changeSelect = function(val) {
                if (val) {
                  if (val === 'region1') {
                    $scope.region2List = {
                      option : CommcdCtrl.getCache($scope.data.region1)
                    };
                  } else if (val === 'reset') {
                    $scope.data.region1 = '';
                    $scope.data.region2 = '';
                    $scope.data.roomType = '';
                  } else {
                    $scope.data.gender = val;
                  }
                }
                $scope.roomlist($scope.data);
              }

              $scope.detail = function(data) {
                var params = {
                  source : {
                    userid : ''
                  },
                  target : data
                }
                StorageCtrl.setCache('params', params);
                $location.path('/roomdetail');
              }

              var vm = this;
              $scope.page = function() {
                vm.tmpItems = $scope.datas;
                vm.pager = {};
                vm.setPage = setPage;
                initController();
              }

              function initController() {
                vm.setPage(1);
              }

              function setPage(page) {
                if (page < 1 || page > vm.pager.totalPages) {
                  return;
                }
                vm.pager = PagerService.GetPager(vm.tmpItems.length, page);
                vm.items = vm.tmpItems.slice(vm.pager.startIndex,
                    vm.pager.endIndex + 1);
              }

            } ]);
