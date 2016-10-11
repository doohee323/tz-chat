'use strict';

angular.module('tzSocket').factory(
    'StorageCtrl',
    function() {
      var $scope;
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
          sessionStorage.setItem(cacheKey, JSON.stringify(cacheData));
          sessionStorage.setItem(cacheKey + '_time', schedule);
        } catch (e) {
          sessionStorage.clear();
          sessionStorage.setItem(cacheKey, JSON.stringify(cacheData));
          sessionStorage.setItem(cacheKey + '_time', schedule);
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
        var stored_time = sessionStorage.getItem(cacheKey + '_time');
        if (stored_time === undefined || stored_time === 'null') {
          stored_time = 0;
        }
        if (stored_time < current) {
          initCache(cacheKey);
          return JSON.parse("{}");
        } else {
          return JSON.parse(sessionStorage.getItem(cacheKey) || "{}");
        }
      }

      function initCache(cacheKey) {
        cacheKey = cacheKey.replace(/&/g, '').replace(/\?/g, '').replace(/,/g,
            '');
        sessionStorage.setItem(cacheKey, null);
        sessionStorage.setItem(cacheKey + '_time', null);
      }
      
      function getSession() {
        var session = this.getCache('session');
        if (session && session.data) {
          if(typeof session.data === 'string') {
            return JSON.parse(session.data);
          } else {
            return session.data;
          }
        }
        return {}
      }      

      return {
        setCache : setCache,
        getCache : getCache,
        initCache : initCache,
        getSession : getSession,
      };
    });
