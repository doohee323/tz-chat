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
              pay_type : 'Credit Card',
              item_type : ticket_type + ' Regular',
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
                    sweetAlert('', 'Total Point becomes ' + res.data.point + '.',
                        'info');
                    window.history.back();
                  } else {
                    sweetAlert('Error', 'Failed to recharge.', 'error');
                  }
                }, function errorCallback(res) {
                  sweetAlert('Error', 'Failed to recharge.', 'error');
                });
          }
        } ]);
