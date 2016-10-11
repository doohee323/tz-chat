/*******************************/
/*  Publisher JR. Front-js.js   */
/*******************************/

$(function(){

	$(".s-dl dd .data").each(function(index, element) {
		if ( $(this).children("p").size() == 2){
			$(this).addClass("twoline");
		}
	});
	
	$(".t-list > a").click(function(){
		$(this).parent().children("ul").show();
	});
	
	$(".t-list > ul li a").click(function(){
		$(this).parents("ul").hide();
	});
	
	//포인트결제
	$(".point-list li .p-box").click(function(){
		$(".point-list li .p-box").removeClass("on");
		$(this).addClass("on");
		return false;
	});
	
	//팝업닫기
	$(".layer-pop h2 a").click(function(){
		$(this).parents(".layer-pop").hide();
		$(".layer-bg").hide();
		return false;
	});
	
	//화면 최소 높이
	var heHeight = $(".header").height()
	var quHeight = $(".quick-menu").height()
	if(!quHeight) {
	  quHeight = 100;
	}
	var winHeight = $(window).height() - heHeight - quHeight - 159
	$(".sub-content").css("min-height", winHeight);
	$(window).resize(function(){
		var winHeight = $(window).height() - heHeight - quHeight - 159
		$(".sub-content").css("min-height", winHeight);
	});
	

	//프로필 편집 버튼
	$(".profile-dl dt a").click(function(){
		
		if  ($(this).text() == "편집"){
			$(this).text("저장");	
		}else{
			$(this).text("편집");	
		}
		
		$(this).toggleClass("on");
		
		return false;
	});
	
	var winiHeight = $(window).height(); 
	var chatHeight = winiHeight - 150
	$(".chat-wrap").css("height",chatHeight);
	
	$(window).resize(function(){
		var winiHeight = $(window).height(); 
		var chatHeight = winiHeight - 150
		$(".chat-wrap").css("height",chatHeight);
	});
	
	//포인트충전및 조회
	$(".ppo-list ul li > a").click(function(){
		$(".ppo-list ul li > a").removeClass("on");
		$(this).addClass("on");
		return false;
	});
	
	
});