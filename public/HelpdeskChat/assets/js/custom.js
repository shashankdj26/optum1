$(document).ready(function(){
	setTimeout(()=> sizing(), 3000);
});

$(window).bind("load resize", function() {
	setTimeout(()=> sizing(), 3000);
});


$(window).scroll(function() {    
});

function sizing(){
	var windowHeight = 0, header = 0, subHeader = 0, listHeight = 0, search = 0;
	this.subHeader = $('.sidebar__header').innerHeight();
	this.header = $('.header').innerHeight();
	this.search = $('.search-block').innerHeight();
	this.windowHeight = $(window.top).height();
	this.listHeight = this.windowHeight - ( this.header + this.subHeader + this.search);
	$('.user-block-list').innerHeight(this.listHeight);
	console.log(this.listHeight);
	console.log(this.windowHeight);
	console.log(this.header);
	console.log(this.subHeader);
	console.log(this.search);
}