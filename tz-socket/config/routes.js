'use strict';

module.exports = function(app, fs) {

  // session Routes
  var session = require('../api/session');
  var utils = require('../app.js').utils;
  var config = require('../app.js').config;

  app.get('/', function(req, res) {
    res.render('index', {
      title : "MY HOMEPAGE",
      length : 5
    })
  });

  // ex) http://localhost:3000/socket_insert/doohee323
  app.get('/socket_insert/:roomid', function(req, res) {
    session.socket_insert(req, res, function(err, data) {
      return utils.res(res, data);
    });
  });
  
  // ex) http://localhost:3000/talklist
  app.get('/talklist', function(req, res) {
    session.talklist(req, res, function(err, data) {
      return utils.res(res, data);
    });
  });
  
  // ex) http://localhost:3000/socketlist
  app.get('/socketlist', function(req, res) {
    session.socketlist(req, res, function(err, data) {
      return utils.res(res, data);
    });
  });
  
}
