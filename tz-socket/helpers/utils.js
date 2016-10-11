'use strict';

var moment = require('moment');
var fs = require('fs');
var logger = require('../app.js').winston;

/**
* @function 	remove element from object
*/
function gf_RemoveElem(obj, target){
	var arry = target.split(',');
	for (var i in arry) {
    	delete obj[arry[i]];
	}
	return obj;
}

/**
 * @type : function
 * @access : public
 * @desc : export from rslt to csv response
 */
function gf_ExportCvs(res, rslt, file) {
	res.setHeader('Content-disposition', 'attachment; filename="' + file + '.csv"'); 
	res.setHeader('Content-type', 'text/csv'); 

	// header
	var body = ''; 
	if(!rslt) {
		return;
	}
    for (var j = 0; j < Object.keys(rslt[0]).length; j++) {
    	body +=  Object.keys(rslt[0])[j] + ',';
    };
	body += '\n'; 
	res.write(body); 
	
	// body
	for(var i = 0; i < rslt.length; i++) { 
		body = ''; 
	    for (var j in rslt[i]) {
	        if (!rslt[i].hasOwnProperty(j)) continue;
	        if (typeof rslt[i][j] != 'function') {
				body +=  (rslt[i][j] + '').replaceAll(',', '') + ',';
			} 
	    }
	    //console.log(body);
		body += '\n'; 
		res.write(body); 
	} 
	res.end(''); 
}

/**
 * @type : function
 * @access : public
 * @desc : handle session out
 */
function gf_CheckSession(req) {
	if(process.env['NODE_ENV'] === 'local' || process.env['NODE_ENV'] === 'development') {
	} else {
		if(!req.session.user) return gf_Response(res, {code: -3, message: 'no session! ' + req.url});
	}
}

function gf_SortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        if (typeof x == "string") {
            x = x.toLowerCase(); 
            y = y.toLowerCase();
        }
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

/**
 * @type : function
 * @access : public
 * @desc : export from rslt to csv response
 */
function gf_SendEmail(config, mailOptions, cb) {
	var nodemailer = require('nodemailer');
	var ses = require('nodemailer-ses-transport');
	
	//var transporter = nodemailer.createTransport({
  //  service: 'Gmail',
  //  auth: {
  //    user: config.email.from,
  //    pass: 'fhzptahslxj!323'
  //  }
	//});
	var transporter = nodemailer.createTransport(ses({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey
	}));
	
	transporter.sendMail(mailOptions, function(error, info){
		var rslt = {};
    if(error){
      console.log(error);
    }else{
      if(info.response) console.log('Message sent: ' + info.response);
	    rslt.message = info.response;
    }
    rslt.error = error;
    cb(rslt);
	});
}

/**
 * @type : function
 * @access : public
 * @desc : set cron tab
 */
function gf_SetCrontab(frequency, input, runable) {
	var CronJob = require('cron').CronJob;
	
    //rule = '0 */2 * * * *';  // every two minutes
    //rule = '0 0 */2 * * *';  // every two hours
    //rule = '* * * * * *';		// every seconds
    var rule = '';
    var fq = frequency.split('/');
    var cnt = parseInt(fq[0]);
    if(fq[1] == 'Hour') {
    	cnt = 60 / cnt;
    	rule = '0 */' + cnt + ' * * * *';
    } else if(fq[1] == 'Day') {
    	cnt = 24 / cnt;
    	rule = '0 0 */' + cnt + ' * * *';
    }
    
	var job = new CronJob({
		cronTime: rule,
		onTick: function() {
			runable(input);
		},
		start: false,
		timeZone: "America/Los_Angeles"
	});
	job.start();    
	return job;
}

/**
 * @type : function
 * @access : public
 * @desc : convert unix time to utc
 */
function gf_GetUTC(date, format) {
	var time = new Date(0);
	time.setUTCSeconds(date);
	if(!format) format = 'YYYY-MM-DD';
    time = moment(time).format(format);
    return time;
}

/**
 * @type : function
 * @access : public
 * @desc : file copy
 */
function gf_CopyFile(source, target, cb) {
  var cbCalled = false;
  var rd = fs.createReadStream(source);
  rd.on("error", done);
  var wr = fs.createWriteStream(target);
  wr.on("error", done);
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);
  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

/**
 * @type : function
 * @access : public
 * @desc : error logging with db release
 */
function gf_Error(logger, conn, rslt) {
	conn.release();
  rslt.code = -1;
  rslt.message = 'System error!';
	logger.error(rslt);
}

/**
 * @type : function
 * @access : public
 * @desc : get value from html with handle
 */
function gf_GetValFromHtml(body, key, handle) {
	var rslt; 
	if(body.indexOf(handle) > -1) {
		rslt = body.substring(body.indexOf(key, body.indexOf(handle)) + key.length + 2, body.indexOf('>', body. indexOf(handle)) - 1).trim();
		if(!rslt.startsWith('\"') && rslt.endsWith('\"') || !rslt.startsWith('\'') && rslt.endsWith('\'')) {
			rslt = rslt.substring(0, rslt.length - 1);
		}
	}
	var entities = require("entities");
	return rslt !== void 0 ? entities.decodeHTML(rslt) : '';
}

var gf_CheckUrl = function (str) {
	var regx = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
	str = str === void 0 ? '': str;
	if (str.match(regx)){
    	return true;
	}
	return false;
};

var gf_CheckImage = function(str) {
  var regx = /(jpg|gif|png|jpeg)$/;
  if (str.match(regx)){
    return true;
  }
  return false;
};  

var gf_HttpCall = function(type, options, cb) {
	var request = require('request');
	var req;
	if(type == 'post') {
		req = request.post(options, function(error, resp, body){
			cb(error, resp, body);
		});
	} else if(type == 'get') {
		req = request(options, function (error, resp, body) {
		  cb(error, resp, body);
		})
	}
	req.end();
};  

var gf_Request = function(req) {
	var config = require('../app.js').config;
	if(!config.logging.input) return;
	var logger = require('../app.js').winston;
	var time = '[' + moment().utc().format('YYYYMMDDHHmmssSS') + ']';
	logger.info(time + '[' + req.url + ']' + '=============');
	var input;
	input = req.query;
	if(input && Object.keys(input).length > 0) {
		input = JSON.stringify(input);
		logger.info(time + '- input params' + time + JSON.stringify(input));
	}
	input = req.params;
	if(input && Object.keys(input).length > 0) {
		input = JSON.stringify(input);
		logger.info(time + '- input params:' + time + JSON.stringify(input));
	}
	input = req.body;
	if(input && Object.keys(input).length > 0) {
		input = JSON.stringify(input);
		logger.info(time + '- input params:' + time + JSON.stringify(input));
	}
	gf_Runscope(req, input);
	return input;
};  

var gf_Response = function(res, rslt, errCode) {
	var config = require('../app.js').config;
	if(!config.logging.output) {
		res.json(rslt, errCode);
		return;
	}
	var time = '[' + moment().utc().format('YYYYMMDDHHmmssSS') + ']';
	var logger = require('../app.js').winston;
	if(typeof rslt == 'object') {
		var rslt2 = JSON.parse(JSON.stringify(rslt));
		if(rslt2 && Object.keys(rslt2).length > 0) {
		  for (var j = 0; j < Object.keys(rslt2).length; j++) {
		  	if(typeof rslt2[Object.keys(rslt2)[j]] == 'object' && rslt2[Object.keys(rslt2)[j]] != null && rslt2[Object.keys(rslt2)[j]].length > 2) { // array
					logger.info(time + '- return values was truncated for short logging!: ' + rslt2[Object.keys(rslt2)[j]].length);
		  		rslt2[Object.keys(rslt2)[j]] = rslt2[Object.keys(rslt2)[j]][0];
		  	}
		  };
			logger.info(time + '- return values:' + JSON.stringify(rslt2));
		}
	} else {
		logger.info(time + '- return values:' + JSON.stringify(rslt));
	}
	logger.info(time + '[end]========================================================================================');
	if(errCode) {
		res.json(rslt, errCode);
	} else {
		res.json(rslt);
	}
};  

var gf_LoggingFromClient = function(req) {
	var config = require('../app.js').config;
	if(!config.logging.client) return;
	var time = '[client][' + moment().utc().format('YYYYMMDDHHmmssSS') + ']';
	var logger = require('../app.js').winston;
	logger.info(time + '[begin]========================================================================================');
	logger.info(time + ' title: ' + req.body.title);
	var arry = req.body.stack.split('\n');
	for(var i=0;i<arry.length;i++) {
		logger.info(time + '	' + arry[i]);
	}
	logger.info(time + ' user:' + req.body.user.full_name + '(' + req.body.user.user_email + ')' );
	logger.info(time + '[end]========================================================================================');
};
  
var gf_Log = function(level, rslt) {
	var config = require('../app.js').config;
	if(!config.logging[level]) return;
	var time = '[' + moment().utc().format('YYYYMMDDHHmmssSS') + ']';
	var logger = require('../app.js').winston;
	logger.info(time + JSON.stringify(rslt));
};
  
var gf_GetSession = function(req, cb) {
	var config = require('../app.js').config;
	if(config.redis.useYn == 'Y') {
		var redis_helpers = require('./redis_helpers');
		var token = req.headers.authorization;
		var rslt = {};
		if(!token || token == "Bearer undefined") {
			rslt.code = -1;
			cb(null, rslt);
			return;
		}
		if(token.length > 'Bearer '.length) {
			token = token.substring('Bearer '.length, token.length);
		}
		if(config.runscope.useYn == 'Y') {
    	rslt.code = 0;
      cb(null, rslt);		
      return;	
		}
		redis_helpers.getKeys(token, function(err, entries){
	    if(err !== null){
	      rslt.code = -2;
	      rslt.message = 'Can\'t get session info. from Redis.';
	      cb(err, rslt);
				return;
	    }
	    redis_helpers.get(token, function(err, session){
	      if(err) {
	      	rslt.code = -1;
	      	cb(err, rslt);
	      } else {
	      	req.session.referer = session.referer;
			    req.session.app_name = session.app_name;
	        req.session.user = session.user;
	        req.session.developer = session.developer;
	        req.session.priv_cd = session.priv_cd;
	        req.session.priv = session.priv;
		      req.session.admin = session.admin;
		      req.session.developer = session.developer;
		    	req.session.socket = session.socket;
		    	req.session.tz_gap = session.tz_gap;
		    	rslt.code = 0;
		    	rslt.session = req.session;
		    	rslt.token = token;
	        cb(null, rslt);
	      }
	    });
	  }, 10);		
	} else {
		cb(null, {code: 0});
	}
};
  
var gf_Runscope = function(req, input) {
	var config = require('../app.js').config;
	if(config.runscope.useYn == 'Y') {
		var request = require('request'); // /loggingFromClient
		if(!input) {
			input = gf_Request(req);
		}
		if(req.method == 'POST') {
			request.post(
		    'http://dashboard_staging-gettopzone-com-l9ic6qdrj4fs.runscope.net' + req.url,
		    { form: input },
		    function (error, response, body) {
		      if (!error && response.statusCode == 200) {
		      	console.log(body)
		      }
		    }
			);         
		} else {
			var url ='http://dashboard_staging-gettopzone-com-l9ic6qdrj4fs.runscope.net' + req.url
			request(url, function (error, response, body) {
			  if (!error) {
			    console.log(body)
			   }
			 })		    		
		}
	}
}
  
exports.sortByKey = gf_SortByKey;
exports.removeElem = gf_RemoveElem;
exports.exportCvs = gf_ExportCvs;
exports.checkSession = gf_CheckSession;
exports.sendEmail = gf_SendEmail;
exports.setCrontab = gf_SetCrontab;
exports.getUTC = gf_GetUTC;
exports.copyFile = gf_CopyFile;
exports.error = gf_Error;
exports.getValFromHtml = gf_GetValFromHtml;
exports.checkUrl = gf_CheckUrl;
exports.checkImage = gf_CheckImage;
exports.httpCall = gf_HttpCall;
exports.req = gf_Request;
exports.res = gf_Response;
exports.log = gf_Log;
exports.getSession = gf_GetSession;
exports.loggingFromClient = gf_LoggingFromClient;
exports.runscope = gf_Runscope;
