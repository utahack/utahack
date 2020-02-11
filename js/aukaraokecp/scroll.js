$(document).ready(function(){
	
	// scroll-to-anchor
	$('a[href*=#]').click(function() {
			var target = $(this.hash);
			//$(this).text(target.length+"/");
			if (target) {
				var targetOffset = target.offset().top;
				$('html,body').animate({scrollTop: targetOffset},400,"easeInOutQuart");
				return false;
			}
	});
});