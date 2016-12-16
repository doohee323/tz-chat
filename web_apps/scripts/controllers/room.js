'use strict';

/**
 * @ngdoc function
 * @name tzChatApp.controller:RoomCtrl
 * @description # RoomCtrl Controller of the tzChatApp
 */
angular.module('tzChatApp').controller(
    'RoomCtrl',
    [
        '$scope',
        '$http',
        '$location',
        'CommcdCtrl',
        'StorageCtrl',
        function($scope, $http, $location, CommcdCtrl, StorageCtrl) {

          var user = StorageCtrl.getSession();
          
          $scope.init = function(scope) {
            $scope.data = {};
            if (user.userid) {
              if (!user.main || user.main === '') {
                user.main = '../images/picture-add.png';
              }
//              $('#main').val(user.main);
              $scope.data.main = user.main;
            }
          }

          $scope.roomTypeList = {
            option : CommcdCtrl.getCache('Room Category')
          };

          $scope.chatroomList = {
            option : CommcdCtrl.getCache('Chat Room fee')
          };

          $scope.region1List = {
            option : CommcdCtrl.getCache('Location')
          };

          $scope.region2List = {
            option : CommcdCtrl.getCache('Seoul')
          };

          $scope.changeSelect = function(scope) {
          };

          $scope.upload = function(file, input) {
            if (file) {
              var oMyForm = new FormData();
              oMyForm.append("file", file);
              oMyForm.append("param", input);
              $.ajax({
                url : config.domain + '/profile/add',
                data : oMyForm,
                dataType : 'text',
                processData : false,
                contentType : false,
                type : 'POST',
                success : function(data) {
                  if (data.indexOf("</div>{") > -1) {
                    data = data.substring(data.indexOf("</div>{") + 6,
                        data.lenth);
                  }
                  $('#' + input + '_img').attr('src', JSON.parse(data).file);
                  $('#' + input).val(JSON.parse(data).file);
                }
              });
            }
          };

          $scope.write = function(scope) {
            if (!scope.roomFrm.$valid) {
              return;
            }
            scope.data.main = $('#main').val();
            scope.data.userid = user.userid;
            scope.data.gender = user.gender;
            $http(
                {
                  method : 'POST',
                  url : config.domain + "/room/add?room="
                      + JSON.stringify(scope.data)
                }).then(function successCallback(res) {
              //if (user.gender === 'man') {
                user.point = res.data.point;
                StorageCtrl.setCache('session', {
                  data : user
                }, 10000);
              //}
              $location.path('/roomlist');
            }, function errorCallback(res) {
              sweetAlert('Error', 'Failed to save', 'error');
              console.log(res);
            });

          };

        } ]);
