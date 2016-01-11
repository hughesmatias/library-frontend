$(document).ready(function(){
	abm.menu();
	abm.index();

	$("#link-list-books").on("click",function(){
		$(".starter-template").removeClass("hidden");
		$(".wrapper").addClass("hidden");	
		$("#books").removeClass("hidden");
		$('.info-book').empty();
		books.list();
		books.get(1);
	});
	$("#link-create-book").on("click",function(){
		$(".starter-template").removeClass("hidden");
		$(".wrapper").addClass("hidden");
		$("#create-book").removeClass("hidden");
		$('.info-book').empty();
		$("#create-book h1").text("Formulario Alta Libro");
		$("#create-book #button-submit").text("Agregar Libro");
		books.cleanBookForm();
		books.create();
	});
});