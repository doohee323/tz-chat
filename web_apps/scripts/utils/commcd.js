'use strict';

angular.module('tzChatApp').factory(
    'CommcdCtrl',
    function($http) {
      function setCache(cacheKey, cacheData, expires) {
        // if (!_super.config.cache.useYn) {
        // return;
        // }
        cacheKey = cacheKey.replace(/&/g, '').replace(/\?/g, '').replace(/,/g,
            '');
        if (expires === undefined || expires === 'null') {
          expires = _super.config.cache.expire;
        }
        var date = new Date();
        var schedule = Math
            .round((date.setSeconds(date.getSeconds() + expires)) / 1000);
        try {
          localStorage.setItem(cacheKey, JSON.stringify(cacheData));
          localStorage.setItem(cacheKey + '_time', schedule);
        } catch (e) {
          localStorage.clear();
          localStorage.setItem(cacheKey, JSON.stringify(cacheData));
          localStorage.setItem(cacheKey + '_time', schedule);
        }

      }
      function getCache(cacheKey) {
        // if (!_super.config.cache.useYn) {
        // return;
        // }
        cacheKey = cacheKey.replace(/&/g, '').replace(/\?/g, '').replace(/,/g,
            '');
        var date = new Date();
        var current = Math.round(+date / 1000);
        var stored_time = localStorage.getItem(cacheKey + '_time');
        if (stored_time === undefined || stored_time === 'null') {
          stored_time = 0;
        }
        if (stored_time < current) {
          initCache(cacheKey);
          return JSON.parse("{}");
        } else {
          return JSON.parse(localStorage.getItem(cacheKey) || "{}");
        }
      }

      function initCache(cacheKey) {
        cacheKey = cacheKey.replace(/&/g, '').replace(/\?/g, '').replace(/,/g,
            '');
        localStorage.setItem(cacheKey, null);
        localStorage.setItem(cacheKey + '_time', null);
      }

      function query() {
//        if(localStorage.getItem('commcd') ===  'y') return;
        $http({
          method : 'GET',
          async : true,
          url : config.domain + '/commcd/list'
        }).then(
            function successCallback(res) {
              if (res) {
                if (typeof res.data === 'string'
                    && res.data.indexOf('A PHP Error was encountered') > -1) {
                  res.data = res.data.substring(res.data.indexOf('{'), res.data
                      .lastIndexOf('}') + 1);
                }
                if (typeof res.data === 'string') {
                  res.data = JSON.parse(res.data);
                }
                if (res.data.length > 0) {
                  var prv = '';
                  var key = '';
                  var arry = [];
                  localStorage.setItem('commcd', 'y');
                  for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].grp_id == '')
                      continue;
                    key = res.data[i - 1].grp_id;
                    if (prv != res.data[i].grp_id) {
                      if (key == '') {
                        arry.push(res.data[i]);
                      } else {
                        setCache(key, arry, 10000);
                        arry = [];
                        arry.push(res.data[i]);
                      }
                    } else {
                      arry.push(res.data[i]);
                    }
                    prv = res.data[i].grp_id;
                  }
                  setCache(key, arry, 10000);
                } else {
                  debugger;
                }
              } else {
                sweetAlert('', 'Query를 실패하였습니다.', 'error');
              }
            }, function errorCallback(res) {
              sweetAlert('', 'Query를 실패하였습니다.', 'error');
            });
      }

      return {
        setCache : setCache,
        getCache : getCache,
        initCache : initCache,
        query : query,
      };
    });
