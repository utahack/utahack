(function($, window, undefined){

	var $win=$(window),$cover,$body,$cont,
		h,w,s,
		contlist=[],
		poslist=[],
		isOLD=false;



	var init = function(){

		$cover = $('#cover');
		$body = $('body');
		$cont = $('.container');

		checkUA();

		//
		if(!isOLD){
			$body.addClass('def');
			$cont.addClass('def');
			$('.op').addClass('def');
		}else{
			$cover.remove();
		}
		//
		$('#pageTop a, .smooth a').on('click', function(){
			var href= $(this).attr("href");
			var target = $(href == "#" || href == "" ? 'html' : href);
			var position = target.offset().top;
			var distance = Math.abs(position - $(window).scrollTop());
			var speed = Math.min(700, Math.max(300, Math.floor(distance * 0.5)));
				$('body,html').stop().animate({scrollTop:position}, speed);
				return false;
		});
		$('.btnToggle').click(
			function(){
				$(this).next().slideToggle(500,'easeInOutExpo',function(e){
					console.log(e);
				});
				$(this).parent().toggleClass("open");
				return false;
			}
		);

	};

	
	$win.on('load',function(){
		if(!isOLD){
			var i=0;cl = $cont.length;
			for(i;i<cl;i++){
				var $contunit = $cont.eq(i);
				contlist.push($contunit);
				poslist.push($contunit.offset().top);
			}
			$win.resize(resized);
			$win.scroll(scrolled);
			jQuery('body').bind('touchmove', scrolled);
			$('#cover').fadeOut(500,'easeInOutQuad',op);
			$('.op').removeClass('def');
			setTimeout(function(){
				$body.removeClass('def');
			},200);
			
			resized();
			scrolled();
		}
	});
	var op = function(){
		//$cont.removeClass('def');
	};

	//event
	function scrolled(){
		h = window.innerHeight ? window.innerHeight : $win.height();
		s = $win.scrollTop();
		
		var v=s+h*0.7,i=0;
		for(i;i<cl;i++){
			if(poslist[i]<v){
				contlist[i].removeClass('def');
			}
		}
	}
	function resized(){
		h = window.innerHeight ? window.innerHeight : $win.height();
		w = window.innerWidth ? window.innerWidth : $win.width();
		
	}
	//check
	function checkUA() {
		var ua = navigator.userAgent;
		if( ua.indexOf("Android") > 0 ){
			var version = parseFloat(ua.slice(ua.indexOf("Android")+8));
			if(version < 3 ){
				isOLD = true;
			}
		}
	}
	//init
	$(function(){
		init();
	});
})(jQuery, window);