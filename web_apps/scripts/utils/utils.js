'use strict';

function gf_MergeData(source, target) {
  for (var j = 0; j < Object.keys(source).length; j++) {
    target[Object.keys(source)[j]] = source[Object.keys(source)[j]];
  }
  ;
  return target;
};

/*----------------------------------------------------------------------------------
 * @function 		: save Cookie value with name-value format
 * @param 	: name : Cookie name
 *            value : Cookie value
 * @return	: N/A
 ----------------------------------------------------------------------------------*/
function gf_SetCookie(name, value) {
  var expires = new Date();
  expires.setTime(expires.getTime() + 1000 * 60 * 60 * 24 * 30); // 30'days
  // exist
  document.cookie = name + '=' + escape(value) + '; path=/; expires='
      + expires.toGMTString() + '; ';
}

/*----------------------------------------------------------------------------------
 * @function 		: return Cookie value
 * @param 	: name : Cookie name
 * @return	: Cookie value
 ----------------------------------------------------------------------------------*/
function gf_GetCookie(name) {
  var nameOfCookie = name + "=";
  var x = 0;
  while (x <= document.cookie.length) {
    var y = (x + nameOfCookie.length);
    if (document.cookie.substring(x, y) === nameOfCookie) {
      if ((endOfCookie = document.cookie.indexOf(";", y)) === -1)
        endOfCookie = document.cookie.length;
      return unescape(document.cookie.substring(y, endOfCookie));
    }
    x = document.cookie.indexOf(" ", x) + 1;
    if (x === 0)
      break;
  }

  if (name === "loclCd") {
    gf_SetCookie("loclCd", "en_US");
    return "en_US";
  } else {
    return "";
  }
}

/*----------------------------------------------------------------------------------
 * @function : print log
 * @param : sValue
 * @return :
 ----------------------------------------------------------------------------------*/
function gf_Trace(sValue) {
  if (typeof (window.console) != "undefined") {
    console.log(sValue);

    /*----------------------------------------------------------------------------------
     for (var i=0; i<arguments.length; i++) {
     trace(arguments[i]);
     }
     ----------------------------------------------------------------------------------*/
  }
}

/**
 * @function check object is null or not
 * @param sValue
 *          <Object>
 * @return true / false
 */
function gf_IsNull(sValue) {
  if (new String(sValue).valueOf() === "undefined")
    return true;
  if (sValue === null)
    return true;
  var v_ChkStr = new String(sValue);
  if (v_ChkStr === null)
    return true;
  if (v_ChkStr.toString().length === 0)
    return true;
  return false;
};

/**
 * @function if object is null then set initial value
 * @param strCompType
 *          <Object, strSetVal<String>
 * @return String
 */
function gf_setNullInit(sVal, strSetVal) {
  if (gf_IsNull(sVal)) {
    return strSetVal;
  } else {
    return sVal;
  }
}

/*----------------------------------------------------------------------------------
 * @function    : find multi-language
 * @param 	: strKey : multi-language key,
 *            loclCd : java locale, if loclCd is null then using session loclCd
 *---------------------------------------------------------------------------------*/
function gf_FindLang(strKey, loclCd) {
  if (gf_IsNull(loclCd)) {
    loclCd = gf_GetCookie("loclCd");
  }
  if (gf_IsNull(loclCd))
    loclCd = "en_US";

  var findLang = "";
  try {
    findLang = jquery_lang_js.prototype.lang[loclCd][strKey];
  } catch (e) {
    gf_Trace(e.message);
  }

  if (gf_IsNull(findLang)) {
    findLang = strKey;
  }
  return findLang;
}

/*----------------------------------------------------------------------------------
 * @function 	: alert window
 * @param		: msgId : message code
 *       		  paramArray  message's '@' Array.
 * @return 	    : message
 ----------------------------------------------------------------------------------*/
function gf_AlertMsg(msgId, paramArray) {
  if (gf_IsNull(msgId)) {
    alert("No message Id!");
    return null;
  }

  var msg = gMsg.getMsg(ezMessage(msgId), paramArray);
  alert(msg, gf_FindLang('알림'));
  return msg;
}

/*----------------------------------------------------------------------------------
 * @function 	: confirm window
 * @param		: msgId : message code
 *       		  paramArray : message's '@' Array.
 * @return 	    : confirm's true / false
 ----------------------------------------------------------------------------------*/
function gf_ConfirmMsg(msgId, paramArray) {
  if (gf_IsNull(msgId)) {
    alert("No message Id!");
    return null;
  }
  return confirm(gMsg.getMsg(ezMessage(msgId), paramArray), 'OK'); // gf_FindLang('OK')
}

/*----------------------------------------------------------------------------------
 * @function 	: get message
 * @param		: code : message code
 * @return 		: message
 ----------------------------------------------------------------------------------*/
function ezMessage(code) {
  var loclCd = gf_GetCookie("loclCd");
  try {

    code = code.simpleReplace(".", "_");

    if (gf_IsNull(gv_DnlsComm.msg[loclCd][code])) {

      return code.simpleReplace("_", ".");
      ;
    }
    var msgValue = gv_DnlsComm.msg[loclCd][code].message;
    if (gf_IsNull(msgValue)) {
      return code;
    }
  } catch (e) {
    msgValue = code;
  }
  return msgValue;
}

// /////////////////////////// coMessage object /////////////////////////////
var gMsg = new coMessage();

/*----------------------------------------------------------------------------------
 * @function 	: Object for message
 ----------------------------------------------------------------------------------*/
function coMessage() {
  this.getMsg = coMessage_getMsg;
}

/*----------------------------------------------------------------------------------
 * @function 	: get message
 * @param		: message : message Id
 *       		  message's '@' Array.
 * @return 	    : message
 ----------------------------------------------------------------------------------*/
function coMessage_getMsg(message, paramArray) {
  try {
    if (message === null || message === '') {
      return null;
    }
    var index = 0;
    var re = /@/g;
    var count = 0;
    if (paramArray === null) {
      return message;
    }
    for (var i = 0; i < paramArray.length; i++) {
      if (!gf_IsNull(paramArray[i])) {
        paramArray[i] = paramArray[i].toString().replace("'", "‘");
      }
    }

    while ((index = message.indexOf("@", index)) != -1) {
      if (paramArray[count] === null) {
        paramArray[count] = "";
      }

      var paramIndex = message.substring(index + 1, index + 2);
      var value = paramIndex.match(/[^0-9]/g);

      // ater @, exist number : ex) @1
      if (value === null) {
        paramIndex = parseInt(paramIndex) - 1;
        // @param's sequence
        message = message.substr(0, index)
            + String(gf_FindLang(paramArray[paramIndex]))
            + message.substring(index + 2, message.length);
      } else {
        message = message.substr(0, index)
            + String(gf_FindLang(paramArray[count]))
            + message.substring(index + 1, message.length);
      }
      index = index + String(gf_FindLang(paramArray[count++])).length;
    }
  } catch (e) {
    gf_Trace('Error occurred!!! : coMessage_getMsg' + e.message);
    return 'Error occurred!!! : coMessage_getMsg';
  }
  return message;
}

/**
 * @function if object's value is undefined, return ''
 */
function gf_GetValue(sValue) {
  if (gf_IsNull(sValue))
    return '';
  return sValue;
};

/**
 * @function get Next day with 'YYYY-MM-DD'
 */
function gf_GetNextDate() {
  var v_CurDate = new Date();
  v_CurDate.setDate(v_CurDate.getDate() + 1);
  return v_CurDate;
}

/**
 * @function get value from select box's selected index
 */
function gf_SelectedValue(elm, value) {
  var options = elm.options;
  var size = options.length;
  var i = 0;
  while (i < size) {
    if (options[i].value === value) {
      elm.selectedIndex = i;
      return;
    }
    i++;
  }
}

/**
 * @function convert list to json with hierarchical structure
 */
var gf_List2jsonWithLevel = function(alist, arootId, aidCol, arootCol,
    aorderCol) {
  var atreeModel = [];
  var alistLength = alist.length;
  var atreeLength = 0;
  var aloopLength = 0;
  function getParentNode(achildren, item) {
    for (var i = 0, child; child = achildren[i]; i++) {
      if (child[aidCol] === item[arootCol]) {
        item.children = [];
        child.children.push(item);
        atreeLength++;
        alist.splice(alist.indexOf(item), 1);
        child.children.sort(function(a, b) {
          return a[aorderCol] < b[aorderCol] ? -1
              : a[aorderCol] > b[aorderCol] ? 1 : 0;
        });
        break;
      } else {
        if (child.children.length) {
          getParentNode(child.children, item);
        }
      }
    }
  }
  while (atreeLength != alistLength && alistLength != aloopLength++) {
    for (var i = 0, item; item = alist[i]; i++) {
      if (item[arootCol] === arootId) {
        item.children = [];
        atreeModel.push(item);
        atreeLength++;
        alist.splice(i, 1);
        atreeModel.sort(function(a, b) {
          return a[aorderCol] < b[aorderCol] ? -1
              : a[aorderCol] > b[aorderCol] ? 1 : 0;
        });
        break;
      } else {
        getParentNode(atreeModel, item);
      }
    }
  }
  return atreeModel;
};

/**
 * @function convert Json to list
 */
function gf_Json2list(data) {
  var tmp;
  var target = data;
  Json2list(data);

  function Json2list(data) {
    for ( var i in data) {
      if (!data.hasOwnProperty(i))
        continue;
      if (typeof data[i] === 'object') {
        Json2list(data[i]);
      } else {
        if (tmp != data) {
          target.push(data);
        }
        tmp = data;
      }
    }
    return target;
  }
  return target;
}

/**
 * @function list sort with hierarchical structure
 */
function gf_SortListWithLevel(data, startingLevel) {
  // indexes
  var indexed = {}; // the original values
  var nodeIndex = {}; // tree nodes
  var i;
  for (i = 0; i < data.length; i++) {
    var id = data[i].id;
    var node = {
      id : id,
      level : startingLevel,
      children : [],
      sorted : false
    };
    indexed[id] = data[i];
    nodeIndex[id] = node;
  }

  // populate tree
  for (i = 0; i < data.length; i++) {
    var node = nodeIndex[data[i].id];
    var pNode = node;
    var j;
    var nextId = indexed[pNode.id].hgr_id;
    for (j = 0; nextId in nodeIndex; j++) {
      pNode = nodeIndex[nextId];
      if (j === 0) {
        pNode.children.push(node.id);
      }
      node.level++;
      nextId = indexed[pNode.id].hgr_id;
    }
  }

  // extract nodes and sort-by-level
  var nodes = [];
  for ( var key in nodeIndex) {
    nodes.push(nodeIndex[key]);
  }

  // refine the sort: group-by-siblings
  var retval = [];
  for (i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var hgr_id = indexed[node.id].hgr_id;
    if (hgr_id in indexed) {
      var pNode = nodeIndex[hgr_id];
      var j;
      for (j = 0; j < pNode.children.length; j++) {
        var child = nodeIndex[pNode.children[j]];
        if (!child.sorted) {
          indexed[child.id].level = child.level;
          retval.push(indexed[child.id]);
          child.sorted = true;
        }
      }
    } else if (!node.sorted) {
      indexed[node.id].level = node.level;
      retval.push(indexed[node.id]);
      node.sorted = true;
    }
  }
  return retval;
}

/**
 * @function get wanted scope with handle (it could be property name or method
 *           name)
 */
function gf_Scope(scope, handle) {
  var tmp;
  var checked = '';
  var target;
  scope = scope.$root;
  getScope(scope, handle);

  function getScope(scope, handle) {
    for ( var i in scope) {
      if (!scope.hasOwnProperty(i))
        continue;
      if (typeof scope[i] === 'object' && scope[i] != null && scope[i].$id
          && checked.indexOf((scope[i].$id + ',')) === -1) {
        checked += scope[i].$id + ',';
        // console.log(scope[i].$id + '/' + scope[i]);
        getScope(scope[i], handle);
      } else {
        if (tmp != scope) {
          if (scope[handle]) {
            target = scope;
            return scope;
          }
        }
        tmp = scope;
      }
    }
    return null;
  }
  return target;
}

/**
 * @function get wanted scope with handle (it could be property name or method
 *           name)
 */
function gf_ScopeWithId(scope, handle) {
  var tmp;
  var checked = '';
  var target;
  scope = scope.$root;
  gf_ScopeWithId(scope, handle);

  function gf_ScopeWithId(scope, handle) {
    for ( var i in scope) {
      if (!scope.hasOwnProperty(i))
        continue;
      if (typeof scope[i] === 'object' && scope[i] != null
          && scope[i].$id === handle) {
        checked += scope[i].$id + ',';
        // console.log(scope[i].$id + '/' + scope[i]);
        gf_ScopeWithId(scope[i], handle);
      } else {
        if (tmp != scope) {
          if (scope[handle]) {
            target = scope;
            return scope;
          }
        }
        tmp = scope;
      }
    }
    return null;
  }
  return target;
}

/**
 * @type : function
 * @access : public
 * @desc : hidden frame create and return
 */
function gf_GetPoppyFrame(doc, objCnt) {
  var aObjCnt = '';
  if (objCnt)
    aObjCnt = objCnt;
  var poppy = doc.getElementById("poppy");
  if (poppy === null) {
    doc.body.insertAdjacentHTML("beforeEnd", "<div id='poppy'/></div>");
  }
  doc.getElementById("poppy").innerHTML = "<iframe id='poppyFrame"
      + aObjCnt
      + "' name='poppyFrame"
      + aObjCnt
      + "' src='about:blank' style='width:0;height:0;border:0;frameborder:0;padding:0;margin:0' scrolling=no></iframe>";
  poppy = doc.getElementById("poppyFrame" + aObjCnt);
  return poppy;
}

/**
 * @type : function
 * @access : public
 * @desc : copy to clipboard
 */
function gf_CopyToClipboard(text) {
  var IE = (document.all) ? true : false;
  if (IE) {
    window.clipboardData.setData('Text', text);
  } else {
    var temp = prompt("Click Ctrl+C for saving this to clipboard.", text);
  }
}

/**
 * @type : function
 * @access : public
 * @desc : get device information
 */
function getDeviceInfo() {
  var rslt = {};
  var browserInfo = navigator.userAgent + '^' + navigator.platform;
  // alert(browserInfo);
  if (browserInfo.indexOf('Android') > -1) {
    var models = 'SHW-M180S,SHW-M180L,SCH-I800,SGH-T849'.split(',');
    var deviceArry = browserInfo.split(';');
    var locale = deviceArry[3];
    var tmpArry = deviceArry[4].split('/');
    var deviceModel = tmpArry[0];
    rslt.osVersion = tmpArry[1].substring(0, tmpArry[1].indexOf(')'));
    rslt.deviceModelName = deviceModel;
    for (var i = 0; i < models.length; i++) {
      if (deviceModel.indexOf(models[i]) > -1) {
        rslt.osType = 'androidTablet';
        break;
      }
    }
    if (!rslt.osType)
      rslt.osType = 'androidPhone';
  } else if (browserInfo.indexOf('Mac OS') > -1) {
    var models = 'iPhone,iPod'.split(',');
    var deviceArry = browserInfo.split(';');
    var deviceType = deviceArry[0].substring(deviceArry[0].indexOf('(') + 1,
        deviceArry[0].length);
    rslt.osVersion = deviceArry[2].substring(deviceArry[2].indexOf('OS') + 3,
        deviceArry[2].indexOf('like') - 1);
    var locale = deviceArry[3].substring(1, deviceArry[3].indexOf(')'));
    rslt.deviceModelName = browserInfo;
    for (var i = 0; i < models.length; i++) {
      if (deviceType.indexOf(models[i]) > -1) {
        rslt.osType = 'applePhone';
        break;
      }
    }
    if (!rslt.osType)
      rslt.osType = 'appleTablet';
  } else {
    // order!
    if (/msie/.test(navigator.userAgent.toLowerCase()))
      rslt.deviceModelName = 'msie';
    if (/mozilla/.test(navigator.userAgent.toLowerCase()))
      rslt.deviceModelName = 'mozilla';
    if (/safari/.test(navigator.userAgent.toLowerCase()))
      rslt.deviceModelName = 'safari';
    if (/opera/.test(navigator.userAgent.toLowerCase()))
      rslt.deviceModelName = 'opera';
    if (/chrome/.test(navigator.userAgent.toLowerCase()))
      rslt.deviceModelName = 'crome';
    rslt.osVersion = $.browser.version;
    rslt.osType = 'WEB';
  }
  return rslt;
}

/**
 * @type : function
 * @access : public
 * @desc : get client location information
 */
function getGeoLocationInfo(callback) {
  if (navigator.geolocation) {
    var rslt = {};
    navigator.geolocation.getCurrentPosition(
        function successCallback(position) {
          rslt.code = "1";
          rslt.message = "";
          rslt.latitude = position.coords.latitude;
          rslt.longitude = position.coords.longitude;
          rslt.coordinates = position.coords.latitude + ","
              + position.coords.longitude;
          callback(rslt);
        }, function errorCallback(error) {
          var message = "";
          switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "No privilige for location information!";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Can't find current location information!";
            break;
          case error.PERMISSION_DENIED_TIMEOUT:
            message = "Location information retrieval timed out!";
            break;
          default:
            message = "Failed to get location information.";
            // message = "Error Code : " + error.code.toString();
            break;
          }
          rslt.code = "0";
          rslt.errorCode = error.code;
          rslt.message = message;
          callback(rslt);
        }, {
          timeout : 10000
        } // Timeout
    );
  } else {
    callback(null); // no working to do
  }
}

function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay)
    ;
}

function gf_GetDoc(x) {
  return x.document || x.contentDocument || x.contentWindow.document;
}

function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key];
    var y = b[key];
    if (typeof x === "string") {
      x = x.toLowerCase();
      y = y.toLowerCase();
    }
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

var gf_GetUniqueNumber = function(id) {
  var uniqueNumber = "";
  var numberGroup = [ [ "a", "b", "S", "T", "0", "1" ],
      [ "c", "d", "Q", "R", "2", "3" ], [ "e", "f", "O", "P", "4", "5" ],
      [ "g", "h", "M", "N", "6", "7" ], [ "i", "j", "K", "L", "8", "9" ],
      [ "k", "l", "I", "J", "U", "V" ], [ "m", "n", "G", "H", "W", "X" ],
      [ "o", "p", "E", "F", "Y", "u" ], [ "q", "r", "C", "D", "v", "w" ],
      [ "s", "t", "A", "B", "x", "y" ] ];
  try {
    while (id > 0) {
      var fst = parseInt((id % 10));
      // console.log('============fst:' + fst);
      var random = Math.floor((Math.random() * 6));
      // console.log('============random:' + random);
      uniqueNumber = uniqueNumber + numberGroup[fst][random];
      id = Math.floor(id / 10);
    }
    uniqueNumber = uniqueNumber.split("").reverse().join("");
  } catch (e) {
    return e;
  }
  return uniqueNumber;
}

var gf_CopyUrlToClipboard = function(text) {
  text = "http://topzone.me/" + text;
  if (window.clipboardData) { // Internet Explorer
    window.clipboardData.setData("Text", text);
  }
  return text;
}

// getPageScroll() by quirksmode.com
// use getPageScroll()[0] for horizontal scrolled amount
// use getPageScroll()[1] for vertical scrolled amount
function gf_GetPageScroll() {
  var xScroll, yScroll;
  if (self.pageYOffset) {
    yScroll = self.pageYOffset;
    xScroll = self.pageXOffset;
  } else if (document.documentElement && document.documentElement.scrollTop) {
    yScroll = document.documentElement.scrollTop;
    xScroll = document.documentElement.scrollLeft;
  } else if (document.body) {// all other Explorers
    yScroll = document.body.scrollTop;
    xScroll = document.body.scrollLeft;
  }
  return new Array(xScroll, yScroll)
}

// Adapted from getPageSize() by quirksmode.com
function gf_GetPageHeight() {
  var windowHeight
  if (self.innerHeight) { // all except Explorer
    windowHeight = self.innerHeight;
  } else if (document.documentElement && document.documentElement.clientHeight) {
    windowHeight = document.documentElement.clientHeight;
  } else if (document.body) { // other Explorers
    windowHeight = document.body.clientHeight;
  }
  return windowHeight
}

var gf_SetItem = function(key, value) {
  localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(value));
};
var gf_GetItem = function(key, value) {
  return JSON.parse(localStorage.getItem(key) || "{}");
};

// app.directive('ngConfirmClick', [
// function(){
// return {
// link: function (scope, element, attr) {
// var msg = attr.ngConfirmClick || "Are you sure?";
// var clickAction = attr.confirmedClick;
// element.bind('click',function (event) {
// if ( window.confirm(msg) ) {
// scope.$eval(clickAction)
// }
// });
// }
// };
// }])

var gf_LookupDs = function(dataset, _keycolnm, id, cb) {
  for (var i = 0; i < dataset.length; i++) {
    if (dataset[i][_keycolnm] === (id + '')) {
      cb(i);
      break;
    }
  }
}

var gf_SetViewValue = function(scope, handle, id, val, $timeout) {
  if ($timeout) {
    $timeout(function() {
      var ctrl = gf_Scope(scope, handle);
      if (ctrl) {
        ctrl = ctrl[handle];
      }
      if (ctrl) {
        ctrl = ctrl[id];
      }
      if (ctrl) {
        ctrl.$setViewValue(val);
        ctrl.$render();
      }
    }, 300);
  } else {
    var ctrl = gf_Scope(scope, handle);
    if (ctrl) {
      ctrl = ctrl[handle];
    }
    if (ctrl) {
      ctrl = ctrl[id];
    }
    if (ctrl) {
      ctrl.$setViewValue(val);
      ctrl.$render();
    }
  }
}

var gf_LoadJson = function(scope, frm, load) {
  scope.$on('$viewContentLoaded', function(event) {
    if(gf_Scope(scope, frm)) {
      if(typeof load === 'string') {
        load = JSON.parse(load);
      }
      for(var key in load) {
        gf_SetViewValue(scope, frm, key, load[key]);
      }
    }
  })   
}
  
var gf_SwitchGender = function(scope, gender) {
  var from, to = '';
  if(gender == 'woman') {
    from = '여자';
    to = '남자';
  } else {
    from = '남자';
    to = '여자';
  }
  for(var i in scope.meetingTypeList.option) {
    var name = scope.meetingTypeList.option[i].name;
    if(name.indexOf(from) > -1) {
      name = name.replace(from, to);
      scope.meetingTypeList.option[i].name = name;
    }
  }
  for(var i in scope.talkStyleList.option) {
    var name = scope.talkStyleList.option[i].name;
    if(name.indexOf(from) > -1) {
      name = name.replace(from, to);
      scope.talkStyleList.option[i].name = name;
    }
  }
}

var gf_GetTicketImg = function(datas) {
  for (var i = 0; i < datas.length; i++) {
    if (!datas[i].ticket_type) {
      datas[i].ticketimg = '';
    } else if (datas[i].ticket_type === 'silver') {
      datas[i].ticketimg = '../images/pi01.png';
    } else if (datas[i].ticket_type === 'gold') {
      datas[i].ticketimg = '../images/pi02.png';
    } else if (datas[i].ticket_type === 'vip') {
      datas[i].ticketimg = '../images/pi03.png';
    } else if (datas[i].ticket_type === 'vvip') {
      datas[i].ticketimg = '../images/pi04.png';
    }
  }
  return datas;
}

function onImgError(source) {
  source.src = "../images/user-men.png"
  source.onerror = "";
  return true;
}

function onImgError2(source) {
  source.src = "../images/profile-ex.png"
  source.onerror = "";
  return true;
}

function onImgError3(source) {
  source.src = "../images/user-icon.png"
  source.onerror = "";
  return true;
}
