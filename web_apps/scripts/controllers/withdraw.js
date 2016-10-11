'use strict';

/**
 * @ngdoc function
 * @name tzChatApp.controller:WithdrawCtrl
 * @description # WithdrawCtrl Controller of the tzChatApp
 */

angular.module('tzChatApp').controller(
    'WithdrawCtrl',
    [
        '$scope',
        '$http',
        '$timeout',
        '$location',
        'Upload',
        'StorageCtrl',
        'CommcdCtrl',
        function($scope, $http, $timeout, $location, Upload, StorageCtrl, CommcdCtrl) {

          var user = StorageCtrl.getSession();
          if (user.userid) {
            if (!user.main || user.main === '') {
              user.main = '../images/profile-ex.png';
            }
            $('#main').val(user.main);
            if (!user.sub1 || user.sub1 === '') {
              user.sub1 = '../images/profile-ex.png';
            }
            $('#sub1').val(user.sub1);
            if (!user.sub2 || user.sub2 === '') {
              user.sub2 = '../images/profile-ex.png';
            }
            $('#sub2').val(user.sub2);
            if (!user.sub3 || user.sub3 === '') {
              user.sub3 = '../images/profile-ex.png';
            }
            $('#sub3').val(user.sub3);
            $scope.data = {};
            for ( var key in user) {
              $scope.data[key] = user[key];
            }
          }

          $scope.region1List = {
            option : CommcdCtrl.getCache('지역')
          };

          $scope.region2List = {
            option : CommcdCtrl.getCache('서울특별시')
          };

          $scope.bloodList = {
            option : CommcdCtrl.getCache('혈액형')
          };

          $scope.scholarList = {
            option : CommcdCtrl.getCache('학력')
          };

          $scope.jobList = {
            option : CommcdCtrl.getCache('직업')
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

          $scope.save = function(scope) {
            scope.data.main = $('#main').val();
            scope.data.sub1 = $('#sub1').val();
            scope.data.sub2 = $('#sub2').val();
            scope.data.sub3 = $('#sub3').val();
            $http(
                {
                  method : 'POST',
                  url : config.domain + "/profile/save?user="
                      + JSON.stringify(scope.data)
                }).then(function successCallback(res) {
              gf_MergeData(scope.data, user);
              var session = {
                'data' : user
              }
              StorageCtrl.setCache('session', session, 10000);
              sweetAlert('', '저장되었습니다.', 'info');
            }, function errorCallback(res) {
              sweetAlert('에러', '저장을 실패하였습니다.', 'error');
              debugger;
            });
          };

        } ]);
