'use strict';

/**
 * @ngdoc overview
 * @name tzChatApp
 * @description # tzChatApp
 * 
 * Main module of the application.
 */

// for local
var config = {
  domain : 'http://www.tz.com',
  NODE_ENV : 'development',
  socketLogined : false,
  socket_domain : 'http://www.tz.com'
};

// for vagrant
if (location.hostname === 'www.tz.com') {
  config.domain = 'http://www.tz.com';
  config.socket_domain = 'http://www.tz.com';
} else if (location.hostname === 'localhost') {
  config.domain = 'http://www.tz.com';
  config.socket_domain = document.location.protocol + '//'
      + document.location.hostname;
}

var socketUrl = document.location.protocol + '//' + document.location.hostname
    + ':3002' + '/socket.io/socket.io.js';
document.write('\x3Cscript src="' + socketUrl + '">\x3C/script>');

angular
    .module(
        'tzChatApp',
        [ 'ngAnimate', 'ngCookies', 'ngMessages', 'ngResource', 'ngRoute',
            'ngFileUpload', 'ngSanitize', 'ngTouch' ])
    .constant('config', config)
    .config(function($routeProvider, $locationProvider) {
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
      }).when('/roomlist', {
        templateUrl : 'views/roomlist.html',
        controller : 'RoomListCtrl',
        controllerAs : 'roomlist'
      }).when('/room', {
        templateUrl : 'views/room.html',
        controller : 'RoomCtrl',
        controllerAs : 'room'
      }).when('/roomdetail', {
        templateUrl : 'views/roomdetail.html',
        controller : 'RoomDetailCtrl',
        controllerAs : 'roomdetail'
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
      $locationProvider.html5Mode(true);
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

                        if ($location.$$path != '/login'
                            && $location.$$path != '/'
                            && $location.$$path != '/registry'
                            && $location.$$path != '/main') {
                          var user = $rootScope.session;
                          if (!user) {
                            user = StorageCtrl.getSession();
                          }
                          if (user.nickname) {
                            $rootScope.user = user;
                            $rootScope.nickname3 = user.nickname;
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
                        } else if ($location.$$path === '/roomdetail'
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

                        $rootScope.doTheBack = function() {
                          window.history.back();
                        };

                        $rootScope.working = function() {
                          sweetAlert('', 'Working!', 'info');
                        }

                        var user = StorageCtrl.getSession();
                        $rootScope.data = {};
                        if (user.userid) {
                          $rootScope.data.userid = user.userid;
                          $rootScope.data.nickname = user.nickname;
                        }

                        $rootScope.rejectTypeList = {
                          option : CommcdCtrl.getCache('Refuse')
                        };

                        $rootScope.isshow2 = false;
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
                            $rootScope.socketid = sock.id;
                            $rootScope.userid = user.userid;
                            StorageCtrl.setCache('session', {
                              data : user
                            }, 10000);
                            // console.log('s_talk' + ' is ready!');
                          });

                          socket.on('s_talk_inserted', function(data) {
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
                                      $rootScope.source = params.source;
                                      $rootScope.target = params.target;
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

                          $rootScope.close = function() {
                            gf_Scope($rootScope, 'acceptFrm').$parent.isshow2 = false;
                          }

                          $rootScope.accept = function(scope) {
                            var params = {
                              target : $rootScope.source
                            }
                            if (!$rootScope.source.id) {
                              sweetAlert('Error', 'Failed to save.', 'error');
                            }
                            var input = {
                              id : $rootScope.source.id,
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
                                }).then(
                                function successCallback(res) {
                                  if (res && res.data) {
                                    if ($rootScope.source.gender === 'woman') {
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
                                    sweetAlert('Error', 'Failed to save.',
                                        'error');
                                  }
                                },
                                function errorCallback(res) {
                                  sweetAlert('Error', 'Failed to save.',
                                      'error');
                                });
                          };

                          $rootScope.reject = function(scope) {
                            if (!$rootScope.source.id) {
                              sweetAlert('Error', 'Failed to save.', 'error');
                            }
                            var input = {
                              id : $rootScope.source.id,
                              source : $rootScope.source.userid,
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
                                        if ($rootScope.source.gender === 'woman') {
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
                                      sweetAlert('Error', 'Failed to save',
                                          'error');
                                    });
                          };
                        }
                      });

            } ]);
