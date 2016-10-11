'use strict';

module.exports = {
    app: {
      name: "tz-socket - Staging",
      port: 3000,
			domain: 'http://localhost',
			instance_no: 0
    },
    socket: {
    	useYn: 'Y',
			port: '3002',
			domain: 'http://localhost',
			occupy_minutes: 5
    },
    mysql: {
      env: "local",
			dbUsername: "root",
			dbPassword: "1",
      dbHost: "127.0.0.1",
      port: 3306,
      database: "tzhunting",
      connectionLimit: 100,
			poolUseYn: true        
    },
    logging: {
			client: true,      
			sql: true,      
			debug: true,      
			input: true,      
			output: true      
    }
}

// local, staging, production
process.env['NODE_ENV'] = 'development';

