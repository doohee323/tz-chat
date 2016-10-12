'use strict';

/**
 * @ngdoc function
 * @name tzChatApp.controller:AgentCtrl
 * @description # AgentCtrl Controller of the tzChatApp
 */
angular.module('tzChatApp').controller(
    'AgentCtrl',
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

          $scope.agentTypeList = {
            option : CommcdCtrl.getCache('Agent Category')
          };

          $scope.parttimeList = {
            option : CommcdCtrl.getCache('Part-time fee')
          };

          $scope.region1List = {
            option : CommcdCtrl.getCache('Location')
          };

          $scope.region2List = {
            option : CommcdCtrl.getCache('서울특별시')
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
            if (!scope.agentFrm.$valid) {
              return;
            }
            scope.data.main = $('#main').val();
            scope.data.userid = user.userid;
            scope.data.gender = user.gender;
            $http(
                {
                  method : 'POST',
                  url : config.domain + "/agent/add?agent="
                      + JSON.stringify(scope.data)
                }).then(function successCallback(res) {
              if (user.gender === 'man') {
                user.point = res.data.point;
                StorageCtrl.setCache('session', {
                  data : user
                }, 10000);
              }
              $location.path('/agentlist');
            }, function errorCallback(res) {
              sweetAlert('', '등록을 실패했습니다.', 'error');
              console.log(res);
            });

          };

        } ]);
