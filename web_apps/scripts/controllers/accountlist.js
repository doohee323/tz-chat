'use strict';

/**
 * @ngdoc function
 * @name tzChatApp.controller:AccountListCtrl
 * @description # AccountListCtrl Controller of the tzChatApp
 */

angular.module('tzChatApp').controller(
    'AccountListCtrl',
    [
        '$scope',
        '$http',
        '$timeout',
        '$location',
        'StorageCtrl',
        'CommcdCtrl',
        'PagerService',
        function($scope, $http, $timeout, $location, StorageCtrl, CommcdCtrl,
            PagerService) {

          $scope.accountlist = function(input) {
            var data = {};
            if (input) {
              data = input;
            }
            $http(
                {
                  method : 'GET',
                  url : config.domain + '/account/accountlist/'
                      + JSON.stringify(data)
                }).then(
                function successCallback(res) {
                  if (res) {
                    $scope.point = res.data.point;
                    delete res.data.point;
                    if (res.data['0']) {
                      $scope.datas = [];
                      for ( var i in res.data) {
                        var current_at = moment().add(
                            -1 * moment().utcOffset() / 60, 'hours').toDate();
                        var created_at = moment(res.data[i].created_at)
                            .toDate();
                        var ms = moment(current_at).diff(moment(created_at));
                        var d = moment.duration(ms);
                        res.data[i].elapse = Math.floor(d.asHours()) + '시간 '
                            + moment.utc(ms).format(":mm");
                        $scope.datas.push(res.data[i]);
                      }
                      $scope.page();
                    }
                  } else {
                    sweetAlert('', 'Failed to query', 'error');
                  }
                }, function errorCallback(res) {
                  sweetAlert('', 'Failed to query', 'error');
                });
          };

          $scope.init = function(scope) {
            var user = StorageCtrl.getSession();
            $scope.accountlist({
              'userid' : user.userid
            });
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

          $scope.withdraw = function() {
            $location.path('/withdraw');
          }

        } ]);
