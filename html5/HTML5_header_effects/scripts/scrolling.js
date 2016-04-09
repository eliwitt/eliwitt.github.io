	var scrolltop=0;

	$(document).ready(function(){
		$(window).scroll(function(){
			scrolltop = $(window).scrollTop();
			doscroll();
		});
	});
	
	
	function doscroll(){
		switch(true) {
			case (scrolltop<800):
				$("body > header").removeClass();
				$("img.animatein").addClass("startposition");
				break;
			case (scrolltop>799 && scrolltop<2300):
				$("body > header").removeClass();
				$("body > header").addClass("halfsize");
				$("img.animatein").addClass("startposition");
				break;
			case (scrolltop>2299):
				$("body > header").removeClass();
				$("body > header").addClass("halfsize");
				$("body > header").addClass("thirdoption");
				$("img.animatein").removeClass("startposition");				
				break;
		}	
	}