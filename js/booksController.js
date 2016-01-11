(function(module){
	function convertirMilisegundos (count, unit, mode) {
	   if (arguments.length != 3) {
	      return false
	   }
	   var value;
	   switch (unit) {
	      case "se": value = 1000; break;
	      case "mi": value = 60000; break;
	      case "ho": value = 3600000; break;
	      case "di": value = 86400000; break;
	      case "an": value = 31536000000; break;
	   }
	   switch (mode) {
	      case "mu": return count/value; break;
	      case "um": return count*value; break;
	   }
	   
	}

	function cantDiasACreacion(creationDate){
		var now = new Date();

		var milisecInter = now.getTime() - creationDate.getTime();
		var inDays = convertirMilisegundos(milisecInter, "di", "mu");

		return Math.trunc(inDays);
	}

	function printBook(jsonBook){
		$("#book-title").text(jsonBook.title);
		var date2 = new Date(jsonBook.creationDate);
		var cantDias = cantDiasACreacion(date2);

		$("#book-date-publication").text(date2.getFullYear() +" Dias: "+ cantDias);
		$("#book-description").text(jsonBook.description);
		$("#book-pages-amount").text("Cantidad de paginas: "+ jsonBook.pagesAmount);
	};

	module.delete = function(id){
		
	    booksService.getBook(id,function (obj){
	    	$(".modal-body p").text("¿Desea Eliminar el libro "+ obj.title + " ?");
	    	$("#delete-book-botom").on("click",function(){		
	    		booksService.deleteBook(id,function(){
		    		$("#deleteModal").modal('hide');
		    		module.list();
	    		});
	    	})
	    })
	};

	module.cleanBookForm = function(){
		$("#description").val("");
		$("#pagesAmount").val("");
		$("#author").val("");
		$("#title").val("");
	};

	module.create=function(){
		$("#form-book").submit(function (event){
			event.preventDefault();
			var bookObj = {
				title: $("#title").val(),
				author: $("#author").val(),
				description: $("#description").val(),
			    pagesAmount: $("#pagesAmount").val(),
			    creationDate: new Date
			}

			booksService.createBook(bookObj,function(data){
				$(".starter-template").removeClass("hidden");
				$(".wrapper").addClass("hidden");
				$(".info-book").removeClass("hidden");
				$(".info-book").empty();
				$(".info-book").append("<h1> Fue Agregado con Exito el Libro. </h1>");
				module.cleanBookForm();
			});
		})
	};
	module.edit = function (id){
		$(".starter-template").removeClass("hidden");
		$(".wrapper").addClass("hidden");
		$("#create-book").removeClass("hidden");
		$(".info-book").empty();
		booksService.getBook(id,function (bookObj){
			$("#title").val(bookObj.title);
			$("#author").val(bookObj.author);
			$("#description").val(bookObj.description);
			$("#pagesAmount").val(bookObj.pagesAmount);
			$("#create-book h1").text("Formulario de Modificacion de Libro");
			$("#create-book #button-submit").text("Editar Libro");
			$("#form-book").submit(function (event){
				event.preventDefault();
				var bookObj = {
					title: $("#title").val(),
					author: $("#author").val(),
					description: $("#description").val(),
			    	pagesAmount: $("#pagesAmount").val()
				}
				booksService.editBook(id,bookObj,function(data){
					$(".starter-template").removeClass("hidden");
					$(".wrapper").addClass("hidden");
					$(".info-book").removeClass("hidden");
					$(".info-book").empty();
					$(".info-book").append("<h1> Fue Editado con Exito el Libro. </h1>");
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
			var list = $("#books-list");
			var counter = $(".books-counter");
			list.empty();
			counter.text("Cantidad de Libros:" + books.length);
			$.each(books, function (index, book) {
				list.append("<li><a href='#' class='list-group-item' data-id="+ book.id +">"+ book.title + ", " + book.author +"</a><a href='#' class='edit-book' data-id=" + book.id + ">Editar</a> <a class='delete-book' href='#' data-id=" + book.id + " class='btn btn-info btn-lg' data-toggle='modal' data-target='#deleteModal' > Quitar </a></li>");
			});

			list.find("li a").each(function() {
				var link = $(this);

				link.on("click",function(){
					var id = $(this).data("id");
					module.get(id);
				});
			})
			$(".edit-book").on("click",function (){
				module.edit($(this).data().id);
			});
			$(".delete-book").on("click",function (){
				module.delete($(this).data().id);
			});
		});
	};

}(this.books = {}));