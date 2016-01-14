(function(module){

	var table = $("#books-table");

	module.delete = function(id){
	    booksService.getBook(id,function (obj){
	    	var deleteModal = $("#delete-modal-book");
	    	deleteModal.modal('show');
	    	deleteModal.find(".modal-body p").text("¿Desea Eliminar el libro "+ obj.title + " ?");
	    	deleteModal.find("#delete-book-botom").on("click",function(){		
	    		booksService.deleteBook(id,function(){
		    		deleteModal.modal('hide');
		    		module.list();
		    		//table.find("#book-row-"+id).remove();
	    		});
	    	})
	    })
	};

	module.showContainClean = function(){
		$(".starter-template").removeClass("hidden");
		$(".wrapper").addClass("hidden");
		$(".info").empty();
	}

	module.cleanBookForm = function(){
		$("#description").val("");
		$("#pagesAmount").val("");
		$("#author").val("");
		$("#title").val("");
	};

	module.objBook = function(){
		return bookObj = {
			title: $("#title").val(),
			author: $("#author").val(),
			description: $("#description").val(),
		    pagesAmount: $("#pagesAmount").val(),
		}
	}

	module.showSuccessfulSubmit= function(text){
		$(".info").removeClass("hidden");
		$(".info").append("<h1> Fue "+ text + " con Exito el Libro. </h1>");
	}

	module.create=function(){
		$("#form-book").submit(function (event){
			event.preventDefault();
			var bookObj = module.objBook();
			bookObj["creationDate"] = new Date;

			booksService.createBook(bookObj,function(data){
				module.showContainClean();
				module.showSuccessfulSubmit("Agregado");
				module.cleanBookForm();
			});
		})
	};
	module.edit = function (id){
		module.showContainClean();
		$("#create-book").removeClass("hidden");
		booksService.getBook(id,function (bookObj){
			$("#title").val(bookObj.title);
			$("#author").val(bookObj.authorId);
			$("#description").val(bookObj.description);
			$("#pagesAmount").val(bookObj.pagesAmount);
			$("#create-book h1").text("Formulario de Modificacion de Libro");
			$("#create-book #button-submit").text("Editar Libro");
			$("#form-book").submit(function (event){
				event.preventDefault();
				var bookObj = module.objBook();

				booksService.editBook(id,bookObj,function(data){
					module.showContainClean();
					module.showSuccessfulSubmit("Editado");
					module.cleanBookForm();
				})
			})
		});
	}

	module.get = function(id){
		booksService.getBook(id,printBook);
	};

	module.list  = function (){
		booksService.getBooksList(function(books){
			$("#books-counter").text("Cantidad de Libros: " + books.length);
			$("#error-book").empty();

			table.empty();
			if(books.length == 0){
				$("#error-book").text("No se dispone de Libros.");
			}else{
				$.each(books, function(index,book){
					authors.getNameAuthorById(book.authorId,function(authorName){
						table.append("<tr id='book-row-"+ book.id +"'><td>"+ book.title +"</td><td>"+ authorName +"</td><td>"+ book.description +"</td><td>"+ book.pagesAmount +"</td><td><a href='#' class='edit-book-" + book.id + "' data-id=" + book.id + ">Editar</a></td><td><a href='#' class='delete-book-" + book.id + "' data-id=" + book.id + ">Borrar</a> </td><tr>");
						$(".delete-book-" + book.id).on("click",function (){
							module.delete(book.id);
						});
						$(".edit-book-" + book.id).on("click",function (){
							module.edit(book.id);
						});
					});
				});

			}
		});
	};

}(this.books = {}));