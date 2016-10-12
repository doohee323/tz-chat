'use strict';

/**
 * @ngdoc function
 * @name tzChatApp.controller:ChargeCtrl
 * @description # ChargeCtrl Controller of the tzChatApp
 */
angular.module('tzChatApp').controller(
    'ChargeCtrl',
    [
        '$scope',
        '$http',
        '$location',
        'CommcdCtrl',
        'StorageCtrl',
        function($scope, $http, $location, CommcdCtrl, StorageCtrl) {

          var user;
          $scope.init = function(scope) {
            user = StorageCtrl.getSession();

            $http({
              method : 'GET',
              url : config.domain + '/user/get/' + JSON.stringify({
                userid : user.userid
              })
            }).then(function successCallback(res) {
              if (res.data.userid) {
                StorageCtrl.setCache('session', res, 10000);

                user = StorageCtrl.getSession();
                gf_setPoint('point', user.point.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
              }
            })
          }

          $scope.charge = function(pay_type) {
            var input = {
              pay_type : pay_type,
              item_type : $scope.spoint + 'Point',
              ticket_type : user.ticket_type,
              point : $scope.spoint,
              userid : user.userid
            };

            $http({
              method : 'POST',
              url : config.domain + '/pay/add?pay=' + JSON.stringify(input)
            }).then(
                function successCallback(res) {
                  if (res) {
                    $('#point').text('\\' + res.data.point + 'P');
                    user.point = res.data.point;
                    gf_setPoint('point', user.point);
                    StorageCtrl.setCache('session', {
                      data : user
                    }, 10000);
                    sweetAlert('', '총 Point가 ' + res.data.point + '이 되었습니다.',
                        'info');
                  } else {
                    sweetAlert('에러', 'Recharge을 실패하였습니다.', 'error');
                  }
                }, function errorCallback(res) {
                  sweetAlert('에러', 'Recharge을 실패하였습니다.', 'error');
                });
          }
        } ]);
