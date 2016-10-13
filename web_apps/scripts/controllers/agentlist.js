'use strict';

/**
 * @ngdoc function
 * @name tzChatApp.controller:AgentListCtrl
 * @description # AgentListCtrl Controller of the tzChatApp
 */

angular
    .module('tzChatApp')
    .controller(
        'AgentListCtrl',
        [
            '$scope',
            '$http',
            '$timeout',
            '$location',
            'StorageCtrl',
            'CommcdCtrl',
            'PagerService',
            function($scope, $http, $timeout, $location, StorageCtrl,
                CommcdCtrl, PagerService) {

              var user;

              $scope.data = {
                'gender' : 'all'
              };

              $scope.region1List = {
                option : CommcdCtrl.getCache('Location')
              };

              $scope.region2List = {
                option : CommcdCtrl.getCache('서울특별시')
              };

              $scope.agentTypeList = {
                option : CommcdCtrl.getCache('Agent Category')
              };

              $scope.agentlist = function(input) {
                var data = {};
                if (input) {
                  data = input;
                }
                $http(
                    {
                      method : 'GET',
                      url : config.domain + '/agent/agentlist/'
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
                            sweetAlert('Error', 'Failed to query.', 'error');
                          }
                        }, function errorCallback(res) {
                          sweetAlert('Error', 'Failed to query.', 'error');
                        });
              };

              $scope.init = function(scope) {
                user = StorageCtrl.getSession();
                if (user.userid) {
                  $scope.userid = user.userid;
                  $scope.gender = user.gender;
                  $scope.agentlist({
                    'gender' : 'all',
                    'userid' : user.userid
                  });
                }
              }

              $scope.add = function() {
                if (user.gender === 'man' && user.point < 300) {
                  sweetAlert('', 'Point is not engough.', 'error');
                  $location.path('/charge');
                } else {
                  $location.path('/agent');
                }
              }

              $scope.open = function(data) {
                if (data.userid != $scope.userid
                    && data.gender != $scope.gender) {
                  gf_Scope($scope, 'requestFrm').open(data);
                }
              }

              $scope.changeSelect = function(val) {
                if (val) {
                  if (val === 'region1') {
                    $scope.region2List = {
                      option : CommcdCtrl.getCache($scope.data.region1)
                    };
                  } else if (val === 'reset') {
                    $scope.data.region1 = '';
                    $scope.data.region2 = '';
                    $scope.data.agentType = '';
                  } else {
                    $scope.data.gender = val;
                  }
                }
                $scope.agentlist($scope.data);
              }

              $scope.detail = function(data) {
                var params = {
                  source : {
                    userid : ''
                  },
                  target : data
                }
                StorageCtrl.setCache('params', params);
                $location.path('/agentdetail');
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
