'use strict';

module.exports = {
    app: {
      name: "tz-socket - Production",
      port: 3000,
      domain: 'http://localhost',
			instance_no: 0
    },
    socket: {
    	useYn: 'Y',
			port: '3002',
			domain: 'http://52.0.156.2',
			occupy_minutes: 10
    },
    mysql: {
      env: "production",
			dbUsername: "root",
			dbPassword: "1",
      dbHost: "52.0.156.21",
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
process.env['NODE_ENV'] = 'production';

