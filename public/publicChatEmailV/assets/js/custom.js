$(document).ready(function(){

});

$(window).bind("load resize", function() {
	sizing();
});


$(window).scroll(function() {    
});

function sizing(){
	var windowHeight = 0, header = 0, subHeader = 0, listHeight = 0, search = 0;
	this.subHeader = $('.sidebar__header').innerHeight();
	this.header = $('.header').innerHeight();
	this.search = $('.search-block').innerHeight();
	this.windowHeight = $(window).innerHeight();
	this.listHeight = this.windowHeight - ( this.header + this.subHeader + this.search);
	$('.user-block-list').innerHeight(this.listHeight);
	console.log(this.listHeight);
	console.log(this.windowHeight);
	console.log(this.header);
	console.log(this.subHeader);
	console.log(this.search);
}