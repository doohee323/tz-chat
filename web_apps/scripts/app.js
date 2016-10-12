'use strict';

/**
 * @ngdoc overview
 * @name tzChatApp
 * @description # tzChatApp
 * 
 * Main module of the application.
 */

//for local
var config = {
  domain : 'http://www.tzchat.local',
  NODE_ENV : 'development',
  socketLogined : false,
  socket_domain : 'http://www.tzchat.local'
};

// for vagrant
if (location.hostname === 'www.tzchat.net') {
  config.domain = 'http://www.tzchat.net';
  config.socket_domain = 'http://www.tzchat.net';
}

angular
    .module(
        'tzChatApp',
        [ 'ngAnimate', 'ngCookies', 'ngMessages', 'ngResource', 'ngRoute',
            'ngFileUpload', 'ngSanitize', 'ngTouch' ])
    .constant('config', config)
    .config(function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl : 'views/main.html',
        controller : 'MainCtrl',
        controllerAs : 'main'
      }).when('/registry', {
        templateUrl : 'views/registry.html',
        controller : 'RegistryCtrl',
        controllerAs : 'registry'
      }).when('/login', {
        templateUrl : 'views/login.html',
        controller : 'LoginCtrl',
        controllerAs : 'login'
      }).when('/list', {
        templateUrl : 'views/list.html',
        controller : 'ListCtrl',
        controllerAs : 'list'
      }).when('/setting', {
        templateUrl : 'views/setting.html',
        controller : 'SettingCtrl',
        controllerAs : 'setting'
      }).when('/profile', {
        templateUrl : 'views/profile.html',
        controller : 'ProfileCtrl',
        controllerAs : 'profile'
      }).when('/private', {
        templateUrl : 'views/private.html',
        controller : 'PrivateCtrl',
        controllerAs : 'private'
      }).when('/agentlist', {
        templateUrl : 'views/agentlist.html',
        controller : 'AgentListCtrl',
        controllerAs : 'agentlist'
      }).when('/agent', {
        templateUrl : 'views/agent.html',
        controller : 'AgentCtrl',
        controllerAs : 'agent'
      }).when('/agentdetail', {
        templateUrl : 'views/agentdetail.html',
        controller : 'AgentDetailCtrl',
        controllerAs : 'agentdetail'
      }).when('/talklist', {
        templateUrl : 'views/talklist.html',
        controller : 'TalkListCtrl',
        controllerAs : 'talklist'
      }).when('/talk', {
        templateUrl : 'views/talk.html',
        controller : 'TalkCtrl',
        controllerAs : 'talk'
      }).when('/clientq', {
        templateUrl : 'views/clientq.html',
        controller : 'ClientqCtrl',
        controllerAs : 'clientq'
      }).when('/chat', {
        templateUrl : 'views/chat.html',
        controller : 'ChatCtrl',
        controllerAs : 'chat'
      }).when('/chatlist', {
        templateUrl : 'views/chatlist.html',
        controller : 'ChatListCtrl',
        controllerAs : 'chatlist'
      }).when('/ticket', {
        templateUrl : 'views/ticket.html',
        controller : 'TicketCtrl',
        controllerAs : 'ticket'
      }).when('/charge', {
        templateUrl : 'views/charge.html',
        controller : 'ChargeCtrl',
        controllerAs : 'charge'
      }).when('/accountlist', {
        templateUrl : 'views/accountlist.html',
        controller : 'AccountListCtrl',
        controllerAs : 'accountlist'
      }).when('/withdraw', {
        templateUrl : 'views/withdraw.html',
        controller : 'WithdrawCtrl',
        controllerAs : 'withdraw'
      }).otherwise({
        redirectTo : '/'
      });
    })
    .run(
        [
            '$rootScope',
            '$http',
            '$timeout',
            '$location',
            'socket',
            'StorageCtrl',
            'CommcdCtrl',
            function($rootScope, $http, $timeout, $location, socket,
                StorageCtrl, CommcdCtrl) {

              $rootScope
                  .$on(
                      '$viewContentLoaded',
                      function(event) {

                        var $scope = $rootScope;

                        if ($location.$$path != '/login'
                          && $location.$$path != '/'
                            && $location.$$path != '/registry'
                            && $location.$$path != '/main') {
//                          console.log('-----------------------$location.$$path:' + $location.$$path);
                          var user = StorageCtrl.getSession();
//                          console.log('-----------------------user.userid:' + user.userid);
//                          console.log('-----------------------user.nickname:' + user.nickname);
                          if (user.nickname) {
                            $scope.user = user;
                            $scope.nickname2 = user.nickname;
                          } else {
                            console.log('-----------------------5');
                            $location.path('/login');
                          }
                        }

                        var heHeight = $(".header").height();
                        var quHeight = $(".quick-menu").height();
                        if (!quHeight) {
                          quHeight = 0;
                        }

                        if (!config.left) {
                          config.left = $('.wrap').css('margin-left');
                          config.right = $('.wrap').css('margin-right');
                        }

                        if ($location.$$path === '/chat') {
                          var winiHeight = $(window).height();
                          var chatHeight = winiHeight - 150;
                          $(".chat-wrap").css("height", chatHeight);
                          $(".footer").css("display", "none");
                        } else if ($location.$$path === '/agentdetail'
                            || $location.$$path === '/clientq') {
                          quHeight = 8;
                          var winHeight = $(window).height() - heHeight
                              - quHeight - 150;
                          $(".sub-content").css("min-height", winHeight);
                        } else {
                          var winHeight = $(window).height() - heHeight
                              - quHeight - 159;
                          $(".sub-content").css("min-height", winHeight);
                          $(".footer").css("display", "");
                        }

                        $('.wrap').css('margin-left', config.left);
                        $('.wrap').css('margin-right', config.right);

                        $scope.doTheBack = function() {
                          window.history.back();
                        };

                        $scope.working = function() {
                          sweetAlert('', '서비스 준비중입니다.', 'info');
                        }

                        var user = StorageCtrl.getSession();
                        $scope.data = {};
                        if (user.userid) {
                          $scope.data.userid = user.userid;
                          $scope.data.nickname = user.nickname;
                        }

                        $scope.rejectTypeList = {
                          option : CommcdCtrl.getCache('Refuse')
                        };

                        $scope.isshow2 = false;
                        if (user.userid) {
                          socket.ready('s_talk', function(sock) {
                            for ( var sockid in sock) {
                              if (sockid != 's_talk'
                                  && sock[sockid].disconnected == false
                                  && sock[sockid].connected == true) {
                                if ($('#chatFrm').length == 0) {
                                  sock[sockid].disconnect();
                                }
                              }
                            }
                            user = StorageCtrl.getSession();
                            sock = sock['s_talk'];
                            user.socketid = sock.id;
                            $scope.socketid = sock.id;
                            $scope.userid = user.userid;
                            StorageCtrl.setCache('session', {
                              data : user
                            }, 10000);
                            // console.log('s_talk' + ' is ready!');
                          });

                          socket.on('s_talk' + '_inserted', function(data) {
                            var params;
                            if (typeof data === 'string') {
                              params = JSON.parse(data);
                            } else {
                              params = data;
                            }
                            if (params.target.userid === user.userid) {
                              if (params.status) {
                                if (params.status == 'accepted') {
                                  params = {
                                    target : params.source
                                  }
                                  StorageCtrl.setCache('params', params);
                                  $location.path('/chat');
                                } else if (params.status == 'closed') {
                                  var scope = gf_Scope($rootScope,
                                      'chatListFrm');
                                  if (scope) {
                                    scope.chatlist(user.userid);
                                  }
                                } else if (params.status == 'request') {

                                  if (params.source.gender == 'man') {
                                    params = {
                                      target : params.source
                                    }
                                    StorageCtrl.setCache('params', params);
                                    $location.path('/chat');
                                  } else {
                                    var scope = gf_Scope($rootScope,
                                        'acceptFrm');
                                    if (scope) {
                                      scope.$parent.isshow2 = true;
                                      $scope.source = params.source;
                                      $scope.target = params.target;
                                    } else {
                                      console.log('acceptFrm not exit!');
                                    }
                                  }
                                }
                              } else {
                                console.log('params.status is null');
                              }
                            }
                          });

                          $scope.close = function() {
                            gf_Scope($rootScope, 'acceptFrm').$parent.isshow2 = false;
                          }

                          $scope.accept = function(scope) {
                            var params = {
                              target : $scope.source
                            }
                            if (!$scope.source.id) {
                              sweetAlert('에러', '저장을 실패하였습니다.', 'error');
                            }
                            var input = {
                              id : $scope.source.id,
                              source : params.target.userid,
                              target : user.userid,
                              userid : user.userid,
                              status : 'accepted',
                              detail : scope.acceptFrm.message.$viewValue
                            };
                            $http(
                                {
                                  method : 'POST',
                                  url : config.domain + '/chat/update?chat='
                                      + JSON.stringify(input)
                                }).then(function successCallback(res) {
                              if (res && res.data) {
                                if ($scope.source.gender === 'woman') {
                                  params = {
                                    target : params.target,
                                    source : {
                                      id : res.data.id,
                                      userid : user.userid,
                                      nickname : user.nickname,
                                      age : user.age,
                                      gender : user.gender,
                                      region1 : user.region1,
                                      region2 : user.region2
                                    },
                                    status : 'accepted'
                                  }
                                  params.target.id = res.data.id;
                                  socket.emit('s_talk_insert', params);
                                }
                                StorageCtrl.setCache('params', params);
                                $location.path('/chat');
                              } else {
                                sweetAlert('에러', '저장을 실패하였습니다.', 'error');
                              }
                            }, function errorCallback(res) {
                              sweetAlert('에러', '저장을 실패하였습니다.', 'error');
                            });
                          };

                          $scope.reject = function(scope) {
                            if (!$scope.source.id) {
                              sweetAlert('에러', '저장을 실패하였습니다.', 'error');
                            }
                            var input = {
                              id : $scope.source.id,
                              source : $scope.source.userid,
                              target : user.userid,
                              userid : user.userid,
                              status : 'reject',
                              detail : scope.acceptFrm.message.$viewValue,
                              reject : scope.acceptFrm.rejectType.$viewValue
                            };
                            $http(
                                {
                                  method : 'POST',
                                  url : config.domain + '/chat/update?chat='
                                      + JSON.stringify(input)
                                })
                                .then(
                                    function successCallback(res) {
                                      if (res && res.data) {
                                        if ($scope.source.gender === 'woman') {
                                          input.status = 'rejected';
                                          socket.emit('s_talk_insert', input);
                                        }
                                        gf_Scope($rootScope, 'acceptFrm').$parent.isshow2 = false;
                                        if (gf_Scope($rootScope, 'chatListFrm')) {
                                          gf_Scope($rootScope, 'chatListFrm')
                                              .chatlist(user.userid);
                                        }
                                      }
                                    },
                                    function errorCallback(res) {
                                      sweetAlert('에러', '저장을 실패하였습니다.', 'error');
                                    });
                          };
                        }
                      });

            } ]);

angular.module('tzChatApp').directive(
    'myDirective',
    [ '$window', '$timeout', '$location',
        function($window, $timeout, $location) {

          return {
            link : link,
            restrict : 'E',
            template : ''
          };

          function link(scope, element, attrs) {

            var heHeight = $(".header").height();
            var quHeight = $(".quick-menu").height();
            if (!quHeight) {
              quHeight = 0;
            }

            // scope.width = $window.innerWidth;
            angular.element($window).bind('resize', function() {

              // scope.width = $window.innerWidth;
              // scope.$digest();

              // var offset = 220;
              // if($('#chatFrm').length > 0) {
              // quHeight = 0;
              // offset = 2000;
              // }

              // var winHeight = $(window).height() - heHeight - quHeight -
              // offset;
              // $(".sub-content").css("min-height", winHeight);
            });
          }

        } ]);