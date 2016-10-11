'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	root: rootPath,
	port: process.env.PORT || 3000,

	// front-end application directory
	app_dir: '/app',

	// upload directory
	upload_dir: './upload',
	
	// logs directory
	logs_dir: './logs',
	
	// expressJwt secret
	sessionSecret: 'tz-socket',

	// The name of the MongoDB collection to store sessions in
	sessionCollection: 'sessions'
}

process.env['appKeys'] = 'app_info';
process.env['database'] = 'tzhunting';

// url for password email
if(process.env['NODE_ENV'] === 'local' || process.env['NODE_ENV'] === 'development') {
  process.env['url'] = 'localhost:3000';
}
else if(process.env['NODE_ENV'] === 'production') {
  process.env['url'] = 'developers.gettopzone.com';
}

console.log('url:' + process.env['url']);
