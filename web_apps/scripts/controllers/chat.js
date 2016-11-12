'use strict';

/**
 * @ngdoc function
 * @name tzChatApp.controller:RoomCtrl
 * @description # RoomCtrl Controller of the tzChatApp
 */
angular.module('tzChatApp').controller(
    'ChatCtrl',
    [
        '$scope',
        '$http',
        '$location',
        'socket',
        'CommcdCtrl',
        'StorageCtrl',
        function($scope, $http, $location, socket, CommcdCtrl, StorageCtrl) {

          var user;
          var params;
          var input = {};
          $scope.init = function() {
            user = StorageCtrl.getSession();
            $scope.gender = user.gender;
            $http({
              method : 'GET',
              url : config.domain + '/user/get/' + JSON.stringify({
                userid : user.userid
              })
            })
                .then(
                    function successCallback(res) {
                      if (res.data.userid) {
                        StorageCtrl.setCache('session', res, 10000);

                        user = StorageCtrl.getSession();
                        $scope.nickname = user.nickname;

                        params = StorageCtrl.getCache('params');
                        $scope.target = params.target;
                        var userid = $scope.target.userid;
                        if ($scope.target.chatroom) {
                          input = {
                            roomid : $scope.target.chatroom
                          };
                        } else {
                          if (user.userid > userid) {
                            input = {
                              roomid : user.userid + '_' + userid
                            };
                          } else {
                            input = {
                              roomid : userid + '_' + user.userid
                            };
                          }
                        }
                        if (params.source) {
                          $('#chatid').val(params.source.id);
                        } else {
                          $('#chatid').val(params.target.id);
                        }
                        $('#roomid').val(input.roomid);
                        $('#source_userid').val(user.userid);
                        $('#target_userid').val($scope.target.userid);
                        $('#source_image').val(user.main);
                        $('#source_gender').val(user.gender);
                        $('#target_image').val($scope.target.main);
                        $('#target_gender').val($scope.target.gender);
                        $('#ori_point').val(user.point);
                        if ($scope.target.reserve) {
                          gf_setPoint('reserve', $scope.target.reserve);
                        } else {
                          gf_setPoint('reserve', 0);
                        }

                        $http(
                            {
                              method : 'GET',
                              url : config.domain + '/chat/restore?roomid='
                                  + input.roomid
                            }).then(function successCallback(res) {
                          if (res && res.data) {
                            var content = res.data.content;
                            if (content && Object.keys(content).length > 0) {
                              content = JSON.parse(content);
                              for (var i = 0; i < content.length; i++) {
                                if (content[i].userid === user.userid) {
                                  gf_send(content[i], true);
                                } else {
                                  gf_receive(content[i], true);
                                }
                              }
                            }
                          }
                        }, function errorCallback(res) {
                          console.log('Failed to query');
                        });

                        socket.ready(input.roomid, function(data) {
                          // $scope.roomid = input.roomid;
                        });

                        moment.locale('en');
                        $scope.today = moment().format('LL') + '('
                            + moment().format('dddd') + ')';

                        $scope.send = 0;
                        $scope.point = user.point;

                        socket.on(input.roomid + '_inserted', function(data) {
                          if (data && data != ''
                              && data != "{'status':'disconnect'}") {
                            if (data === "{'status': 'closed'}") {
                              $scope.close(null, true);
                            } else {
                              gf_receive({
                                image : $('#target_image').val(),
                                text : data,
                                clock : moment().format('LT')
                              });

                              if (user.gender === 'woman') {
                                gf_addPoint('point', 50);
                                gf_addPoint('reserve', 50);
                              }
                            }
                          }
                        });

                        $scope.sendMsg = function(scope, key) {
                          if (scope.text1 && scope.text1 != '') {
                            var point = gf_getPoint('point');
                            point = point - 50;
                            if (point < 0) {
                              sweetAlert('', 'Point is not enough.', 'error');
                              return;
                            }
                            gf_setPoint('point', point);
                            gf_addPoint('reserve', -50);
                            gf_addPoint('send', 50);
                            gf_send({
                              text : scope.text1,
                              clock : moment().format('LT')
                            });
                            socket.emit(input.roomid + '_insert', scope.text1);
                            scope.text1 = '';
                          }
                        };

                      } else {
                      }
                    },
                    function errorCallback(res) {
                      sweetAlert('Error', 'Can not verify your user data.',
                          'error');
                    });

          }

          $scope.close = function(scope, called) {
            if (called) {
              window.history.back();
            } else {
              $http({
                method : 'POST',
                url : config.domain + '/chat/update?chat=' + JSON.stringify({
                  id : $('#chatid').val(),
                  userid : $('#source_userid').val(),
                  status : 'closed'
                })
              }).then(
                  function successCallback(res) {
                    if (res && res.data) {
                      socket.emit($('#roomid').val() + '_insert',
                          "{'status': 'closed'}");
                      var input = {
                        target : {
                          userid : $('#target_userid').val()
                        },
                        source : {
                          gender : $('#target_gender').val()
                        },
                        status : 'closed'
                      };
                      socket.emit('s_talk_insert', input);
                      window.history.back();
                    }
                  }, function errorCallback(res) {
                    sweetAlert('Error', 'Failed to save.', 'error');
                  });
            }
          }

          $scope.$on('$routeChangeStart',
              function(event, currRoute, prevRoute) {
                // var answer = confirm("Do you want to quit this chatting?")
                // if (!answer) {
                // event.preventDefault();
                // } else {
                $scope.roomid = $('#roomid').val();
                socket.off($scope.roomid + '_insert', function(data) {
                  var history = [];
                  var tmp = "{'status':'disconnect'}";
                  $('.c-box').each(
                      function(index, value) {
                        var talk = {};
                        if ($(value).find('.right').length > 0) {
                          talk.userid = $('#source_userid').val();
                          talk.image = $('#source_image').val();
                          if ($(value).find('#text2').text().trim() != ''
                              && $(value).find('#text2').text().trim() != tmp) {
                            talk.text = $(value).find('#text2').text();
                            talk.text = LZString
                                .compressToEncodedURIComponent(talk.text);
                            talk.clock = $(value).find('.c-clock2').text();
                            // if (talk.text
                            // .indexOf("{'status':'disconnect'}") == -1) {
                            history.push(talk);
                            // }
                          }
                        } else {
                          talk.userid = $('#target_userid').val();
                          talk.image = $(value).find('img')[0].src;
                          if ($(value).find('#text1').text().trim() != ''
                              && $(value).find('#text1').text().trim() != tmp) {
                            talk.text = $(value).find('#text1').text();
                            talk.text = LZString
                                .compressToEncodedURIComponent(talk.text);
                            talk.clock = $(value).find('.c-clock2').text();
                            // if (talk.text
                            // .indexOf("{'status':'disconnect'}") == -1) {
                            history.push(talk);
                            // }
                          }
                        }
                      });
                  if (history.length > 0) {
                    var ori_point = $('#ori_point').val();
                    var point = gf_getPoint('point');
                    var target = $('#target_userid').val();
                    var send = gf_getPoint('send');
                    if (ori_point != point) {
                      var input2 = {
                        id : $('#chatid').val(),
                        roomid : $scope.roomid,
                        userid : gf_Scope($scope, 'userid').userid,
                        gender : $('#source_gender').val(),
                        send : send,
                        reserve : gf_getPoint('reserve'),
                        target : target,
                        content : history
                      }
                      $http(
                          {
                            method : 'POST',
                            url : config.domain + '/chat/backup?history='
                                + JSON.stringify(input2)
                          }).then(function successCallback(res) {
                        if (res && res.data) {
                          if (res.data.point) {
                            var user = StorageCtrl.getSession();
                            user.point = res.data.point;
                            StorageCtrl.setCache('session', {
                              data : user
                            }, 10000);
                          }
                        }
                      }, function errorCallback(res) {
                        sweetAlert('Error', 'Failed to save.', 'error');
                      });
                    }
                  }
                });
                // }
              });

          $scope.doTheBack2 = function() {
            $location.path('/chatlist');
          }

        } ]);

var gf_receive = function(data, reload) {
  var obj = $($('#left_template').html());
  if (reload) {
    data.text = LZString.decompressFromEncodedURIComponent(data.text);
  }
  obj.find("#text1").text(data.text);
  // obj.find(".c-name").text('test');
  obj.find("#clock2").text(data.clock);
  obj.find(".img > img")[0].src = data.image; // 'images/user-men.png';
  document.getElementById("c-row").appendChild(obj[0]);
  var objDiv = $('.chat-wrap');
  objDiv[0].scrollTop = objDiv[0].scrollHeight;
}

var gf_send = function(data, reload) {
  var obj = $($('#right_template').html());
  if (reload) {
    data.text = LZString.decompressFromEncodedURIComponent(data.text);
  }
  obj.find("#text2").text(data.text);
  obj.find("#clock2").text(data.clock);
  document.getElementById("c-row").appendChild(obj[0]);
  var objDiv = $('.chat-wrap');
  objDiv[0].scrollTop = objDiv[0].scrollHeight;
}

var gf_getPoint = function(type) {
  var point = $('#' + type).text();
  point = point.substring(1, point.length - 1);
  if (!point) {
    point = 0;
  } else {
    point = parseInt(point);
  }
  return point;
}

var gf_setPoint = function(type, point) {
  $('#' + type).text('$' + point + 'P');
}

var gf_addPoint = function(type, add) {
  var point = gf_getPoint(type);
  point = point + add;
  gf_setPoint(type, point);
}
