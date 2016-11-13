'use strict';

/**
 * @ngdoc function
 * @name tzChatApp.controller:SettingCtrl
 * @description # SettingCtrl Controller of the tzChatApp
 */

angular.module('tzChatApp').controller(
    'SettingCtrl',
    [
        '$rootScope',
        '$scope',
        '$http',
        '$timeout',
        '$location',
        'socket',
        'StorageCtrl',
        function($rootScope, $scope, $http, $timeout, $location, socket,
            StorageCtrl) {

          $scope.init = function(scope) {
            var user = StorageCtrl.getSession();
            $scope.data = {};
            if (user.userid) {
              $scope.data.userid = user.userid;
              $scope.data.nickname = user.nickname;
              $scope.data.main = user.main;
              if (user.ticket_type === 'silver') {
                $scope.ticketimg = '../images/pi01.png';
              } else if (user.ticket_type === 'gold') {
                $scope.ticketimg = '../images/pi02.png';
              } else if (user.ticket_type === 'vip') {
                $scope.ticketimg = '../images/pi03.png';
              } else if (user.ticket_type === 'vvip') {
                $scope.ticketimg = '../images/pi04.png';
              }
            }
          }

          $scope.charge = function() {
            var user = StorageCtrl.getSession();
            if (!user.ticket_type) {
              $location.path('/ticket');
            } else {
              $location.path('/charge');
            }
          }

        } ]);
