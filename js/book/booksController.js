(function(module){

	var table = $("#books-table");

	module.delete = function(id){
	    booksService.getBook(id,function (obj){
	    	var deleteModal = $("#delete-modal-book");
	    	deleteModal.modal('show');
	    	$("#delete-modal-book #idBook").val(id);
	    	deleteModal.find(".modal-body p").text("¿Desea Eliminar el libro "+ obj.title + " ?");
	    });
	};

	module.deleteButtonHandle = function(){
		var id = $(".modal-body #idBook").val();
		booksService.deleteBook(id,function(){
    		$("#delete-modal-book").modal('hide');
    		module.showListBooks();
		});
	};

	module.showContainClean = function(){
		$(".starter-template").removeClass("hidden");
		$(".wrapper").addClass("hidden");
		$(".info").empty();
	}

	module.cleanBookForm = function(){
		$("#description").summernote('code',"");
		$("#pagesAmount").val("");
		$("#author").val("");
		$("#title").val("");
	};

	module.objBook = function(){
		return bookObj = {
			idBook : $("#idBook").val(),
			title: $("#title").val(),
			author: $("#author").val(),
			description: $('#description').summernote('code'),
		    pagesAmount: $("#pagesAmount").val(),
		}
	}

	module.showSuccessfulSubmit= function(text){
		$(".info").removeClass("hidden");
		$(".info").append("<h1> Fue "+ text + " con Exito el Libro. </h1>");
	}

	module.create=function(){			
		var bookObj = module.objBook();
		bookObj["creationDate"] = new Date;

		booksService.createBook(bookObj,function(data){
			module.showContainClean();
			module.showSuccessfulSubmit("Agregado");
			module.cleanBookForm();
		});
	};
	module.edit = function (id){
		module.showContainClean();
		$("#create-book").removeClass("hidden");
		$("#create-book #button-submit").addClass("hidden");
		$("#create-book #button-edit").removeClass("hidden");
		booksService.getBook(id,function (bookObj){
			$("#idBook").val(id);
			$("#title").val(bookObj.title);
			$("#author").val(bookObj.author);
			$('#description').summernote('code',bookObj.description);
			$("#pagesAmount").val(bookObj.pagesAmount);
			$("#create-book h1").text("Formulario de Modificacion de Libro");
		});
	};

	module.editButtonHandler = function (){
		var bookObj = module.objBook();
		booksService.editBook(bookObj,function(data){
			module.showContainClean();
			module.showSuccessfulSubmit("Editado");
			module.cleanBookForm();
		});
	}

	module.get = function(id){
		booksService.getBook(id,printBook);
	};

	module.showListBooks  = function (){
		booksService.getBooksList(function(books){
			$("#books-counter").text("Cantidad de Libros: " + books.length);
			$("#error-book").empty();

			table.empty();
			if(books.length == 0){
				$("#error-book").text("No se dispone de Libros.");
			}else{
				$.each(books, function(index,book){
					authors.getNameAuthorById(book.author,function(author){						
						table.append("<tr id='book-row-"+ book.id +"'><td>"+ book.title +"</td><td>"+ author +"</td><td>"+ book.description +"</td><td>"+ book.pagesAmount +"</td><td><a href='#' id='edit-book-" + book.id + "' data-id=" + book.id + ">Editar</a></td><td><a href='#' id='delete-book-" + book.id + "' data-id=" + book.id + ">Borrar</a> </td><tr>");
						$("#delete-book-" + book.id).on("click",function (){
							module.delete(book.id);
						});
						$("#edit-book-" + book.id).on("click",function (){
							module.edit(book.id);
						});
					})
				});

			}
		});
	};

}(this.books = {}));