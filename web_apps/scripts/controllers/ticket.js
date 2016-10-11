'use strict';

/**
 * @ngdoc function
 * @name tzChatApp.controller:TicketCtrl
 * @description # TicketCtrl Controller of the tzChatApp
 */
angular.module('tzChatApp').controller(
    'TicketCtrl',
    [
        '$scope',
        '$http',
        '$location',
        'CommcdCtrl',
        'StorageCtrl',
        function($scope, $http, $location, CommcdCtrl, StorageCtrl) {

          var user = StorageCtrl.getSession();

          $scope.init = function(scope) {
          }

          $scope.ticket = function(ticket_type) {
            var input = {
              pay_type : '카드',
              item_type : ticket_type + ' 정기권',
              ticket_type : ticket_type,
              userid : user.userid
            };
            $http({
              method : 'POST',
              url : config.domain + '/pay/add?pay=' + JSON.stringify(input)
            }).then(
                function successCallback(res) {
                  if (res) {
                    user.point = res.data.point;
                    user.ticket_type = ticket_type;
                    StorageCtrl.setCache('session', {
                      data : user
                    }, 10000);
                    sweetAlert('', '총 포인트가 ' + res.data.point + '이 되었습니다.',
                        'info');
                    window.history.back();
                  } else {
                    sweetAlert('에러', '충전을 실패하였습니다.', 'error');
                  }
                }, function errorCallback(res) {
                  sweetAlert('에러', '충전을 실패하였습니다.', 'error');
                });
          }
        } ]);
