'use strict';

/**
 * @ngdoc function
 * @name tzChatApp.controller:TalkListCtrl
 * @description # TalkListCtrl Controller of the tzChatApp
 */

angular
    .module('tzChatApp')
    .controller(
        'TalkListCtrl',
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

              var user = StorageCtrl.getSession();

              $scope.data = {
                'gender' : 'all'
              };

              $scope.region1List = {
                option : CommcdCtrl.getCache('Location')
              };

              $scope.region2List = {
                option : CommcdCtrl.getCache('Seoul')
              };

              $scope.talkTypeList = {
                option : [ {
                  id : '1',
                  name : 'Option A'
                }, {
                  id : '2',
                  name : 'Option B'
                }, {
                  id : '3',
                  name : 'Option C'
                } ]
              };

              $scope.talklist = function(input) {
                var data = {};
                if (input) {
                  data = input;
                }
                $http(
                    {
                      method : 'GET',
                      url : config.domain + '/talk/talklist/'
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
                              for (var i = 0; i < res.data.length; i++) {
                                var current_at = moment().add(
                                    -1 * moment().utcOffset() / 60, 'hours')
                                    .toDate();
                                var created_at = moment(res.data[i].created_at)
                                    .toDate();
                                var ms = moment(current_at).diff(
                                    moment(created_at));
                                var d = moment.duration(ms);
                                if(d.asHours() >= 1) {
                                  res.data[i].elapse = Math.floor(d.asHours())
                                  + '시간전';
                                } else {
                                  res.data[i].elapse = moment.utc(ms).format(":mm") + '분전';
                                }
                              }
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
                $scope.userid = user.userid;
                $scope.gender = user.gender;
                $scope.talklist({
                  'gender' : 'all',
                  'userid' : user.userid
                });
              }

              $scope.open = function(data) {
                if (data.userid != $scope.userid
                    && data.gender != $scope.gender) {
                  gf_Scope($scope, 'requestFrm').open(data);
                }
              }
              
              $scope.add = function() {
                if (user.gender === 'man' && user.point < 300) {
                  sweetAlert('', 'Point is not enough.', 'error');
                  $location.path('/charge');
                } else {
                  $location.path('/talk');
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
                  } else {
                    $scope.data.gender = val;
                  }
                }
                $scope.talklist($scope.data);
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
