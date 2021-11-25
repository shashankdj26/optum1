$('.js-main-slider').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: true,
	fade: false,
	dots: true,
	infinite: false
});

// Remove active class from all thumbnail slides
$('.slider-thumbnails__list > li > a').removeClass('active');

// Set active class to first thumbnail slides
$('.slider-thumbnails__list > li > a').eq(0).addClass('active');

// On before slide change match active thumbnail to current slide
$('.slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
	var mySlideNumber = nextSlide;
	$('.slider-thumbnails__list > li > a').removeClass('active');
	$('.slider-thumbnails__list > li > a').eq(mySlideNumber).addClass('active');
});

$(document).ready(function(){
	$('.js-example-basic-single').select2({
		minimumResultsForSearch: -1
	});
});


$(window).bind("load resize", function() {
	sizingheight();
});

function sizingheight(){
}

