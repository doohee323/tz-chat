'use strict';

/**
 * @ngdoc function
 * @name tzChatApp.controller:TalkCtrl
 * @description # TalkCtrl Controller of the tzChatApp
 */
angular.module('tzChatApp').controller(
    'TalkCtrl',
    [
        '$scope',
        '$http',
        '$location',
        'CommcdCtrl',
        'StorageCtrl',
        function($scope, $http, $location, CommcdCtrl, StorageCtrl) {

          // var load = '{"region1":"Seoul","region2":"Gangnam","detail":"addd"}';
          // load = JSON.parse(load);
          // $scope.data = {};
          // for ( var key in load) {
          // $scope.data[key] = load[key];
          // }

          var user = StorageCtrl.getSession();
          if (user.userid) {
            if (!user.main || user.main === '') {
              user.main = '../images/picture-add.png';
            }
            $('#main').val(user.main);
            $scope.data1 = {};
            $scope.data1.main = user.main;
            $scope.data1.age = user.age;
            $scope.data1.nickname = user.nickname;
          }

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

          $scope.region1List = {
            option : CommcdCtrl.getCache('Location')
          };

          $scope.region2List = {
            option : CommcdCtrl.getCache('Seoul')
          };

          $scope.changRegion1 = function() {
            $scope.region2List = {
              option : CommcdCtrl.getCache($scope.data.region1)
            };
          };

          $scope.write = function(scope) {
            if (!scope.talkFrm.$valid) {
              return;
            }
            scope.data.main = $('#main').val();
            scope.data.userid = user.userid;
            scope.data.gender = user.gender;
            $http(
                {
                  method : 'POST',
                  url : config.domain + "/talk/add?talk="
                      + JSON.stringify(scope.data)
                }).then(function successCallback(res) {
              if (user.gender === 'man') {
                user.point = res.data.point;
                StorageCtrl.setCache('session', {
                  data : user
                }, 10000);
              }
              $location.path('/talklist');
            }, function errorCallback(res) {
              sweetAlert('Error', 'Failed to save', 'error');
              console.log(res);
            });

          };

        } ]);
