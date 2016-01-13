$(document).ready(function(){
	abm.menu();
	abm.index();

	$("#link-list-books").on("click",function(){
		books.showContainClean();
		$("#books").removeClass("hidden");
		books.list();
	});
	$("#link-create-book").on("click",function(){
		books.showContainClean();
		$("#create-book").removeClass("hidden");
		$("#create-book h1").text("Formulario Alta Libro");
		$("#create-book #button-submit").text("Agregar Libro");
		books.cleanBookForm();
		books.create();
	});
	$("#link-list-authors").on("click",function(){
		books.showContainClean();
		console.log("aca va la seccion autor");
	})
});