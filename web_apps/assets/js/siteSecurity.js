/*************
name : siteSecurity.js
maker : play-ground.kr okhi1@naver.com
version : 1.0
date : 20150625

상업적 목적으로의 재배포를 금합니다.
************/
(function($){
	var opt,ele;

	$.fn.siteSecurity = function(option){
		ele = $(this);
		opt = option;

		if(opt.exceptionip!=''){
			$.get("http://ipinfo.io", function(res) {
				resconverter(res.ip);
			}, "jsonp");
		}else{
			resconverter(false);
		}
		

		function resconverter(ip){
			if(opt.exceptionip!=ip){
			
				if(opt.f12=='y'){
					ele.bind('keydown',function(e){
						if(e.keyCode==123){
							e.preventDefault();
						}
					});
				}
				
				if(opt.rightclick=='y'){
					$(document).bind("contextmenu", function(){return false;});
				}

				if(opt.select=='y'){
					$(document).bind('selectstart',function() {return false;}); 
				}

				if(opt.drag=='y'){
					$(document).bind('dragstart',function(){return false;});	
				}
			}
		}

		
	}
})(jQuery);