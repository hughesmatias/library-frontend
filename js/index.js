$(document).ready(function(){
	abm.menu();
	abm.index();

	$("#link-list-books").on("click",function(){
		books.showContainClean();
		$("#books").removeClass("hidden");
		books.showListBooks();
	});

	$("#button-submit").on("click",function (event){
		event.preventDefault();
		books.create();
	});

	$("#button-edit").on("click",function (event){
		event.preventDefault();
		books.editButtonHandler();
	});

	$("#delete-book-botom").on("click",function (event){
		event.preventDefault();	
		books.deleteButtonHandle();
	});

	$("#link-create-book").on("click",function(){
		$("#create-book h1").text("Formulario Alta Libro");
		$("#create-book #button-submit").removeClass("hidden");
		$("#create-book #button-edit").addClass("hidden");
		books.showContainClean();
		$("#create-book").removeClass("hidden");
		$('#description').summernote({height: "250"});
		books.cleanBookForm();
	});

	$("#link-list-authors").on("click",function(){
		authors.showContainClean();
		$('#authors').removeClass("hidden");
		authors.showListAuthors();
	});

	$("#button-submit-author").on("click",function (event) {
		event.preventDefault();
		authors.create();
	});

	$("#button-edit-author").on("click", function (event) {
		event.preventDefault();
		authors.editButtonHandler();
	});

	$("#delete-author-botom").on("click",function (event){
		event.preventDefault();
		authors.deleteButtonHandler();
	});

	$("#link-create-author").on("click",function(){
		$("#create-author h1").text("Formulario Alta Autor");
		$("#create-author #button-submit-author").removeClass("hidden");
        $("#create-author #button-edit-author").addClass("hidden");
		books.showContainClean();
		$("#create-author").removeClass("hidden");
		authors.cleanAuthorForm();
	});
});