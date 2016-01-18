(function(module){

	module.objAuthor = function (){
		return obj = {
			name : $("#nameAuthor").val()
		}
	} 
	module.cleanAuthorForm = function(){
		$("#nameAuthor").val("");
	};
	module.showContainClean = function(){
		$(".starter-template").removeClass("hidden");
		$(".wrapper").addClass("hidden");
		$(".info").empty();
	}

	module.showSuccessfulSubmit = function(text){
		$(".info").removeClass("hidden");
		$(".info").append("<h1> Fue "+ text + " con Exito el Autor. </h1>");
	}

	module.create = function(){
		$("#form-author").submit(function (event){
			event.preventDefault();
			var objAuthor = module.objAuthor();
			authorsService.createAuthor(objAuthor,function(data){
				module.showContainClean();
				module.showSuccessfulSubmit("Agregado");
				module.cleanAuthorForm();
			})
		});
	}

	module.getAllAuthors = function(callback){
		authorsService.getAuthors(function(authors){
		var authorsArray = [];
			$.each(authors,function(index,author){
				authorsArray.push(author.name);
			})
		callback(authorsArray);
		})
	}

	module.getNameAuthorById = function(id,callback){
		authorsService.getAuthor(id,function (json){
			callback(json.name);
		})
	}

	module.delete = function(id){
		module.getNameAuthorById(id,function(data){
			var deleteModal = $("#delete-modal-author");
			deleteModal.modal('show');
			deleteModal.find(".modal-body p").text("Si elimina el autor:"+ data +" se borraran todos los libros que tenga vinculados");
			deleteModal.find("#delete-book-botom").on("click",function(){
				authorsService.deleteAuthors(id,function(data){
					deleteModal.modal("hide");
					module.list();
				})
			})

		})
	}

	module.edit = function(id){
		module.showContainClean();
		$("#create-author").removeClass("hidden");
		$("#create-author h1").text("Forumario de Edicion de Autor");
		$("#create-author #button-submit-author").text("Editar Autor");
		module.getNameAuthorById(id,function(data){
			$("#nameAuthor").val(data);
			$("#form-author").submit(function (event){
				event.preventDefault();
				var objAuthor = module.objAuthor();
				authorsService.editAuthor(id,objAuthor,function(data){
					module.showContainClean();
					module.showSuccessfulSubmit("Editado");
				})
			})
		})
	}

	module.list = function(){
		authorsService.getAuthors(function(authors){

			$("#error-author").empty();
			var authorsTable = $("#authors-table");

			$("#authors-table .author").remove();

			if (authors.length == 0 ){
				$("#error-author").text("No se disponen de Autores.");
			}else{
				$("#authors-counter").text("Cantidad de Autores: "+ authors.length);
				$.each(authors,function(index,author){
					authorsTable.append("<tr class='author'><td>"+ author.name +"</td><td><a href='#' id='edit-author-"+ author.id +"' data-id=" + author.id + ">Editar</a></td><td><a href='#' id='delete-author-"+ author.id +"'>Borrar</a></td></tr>")
					$("#edit-author-"+ author.id).on("click",function(){
						module.edit(author.id);
					});
					$("#delete-author-"+ author.id).on("click",function(){
						module.delete(author.id);
					})
				});
			}
		})
	}

}(this.authors = {}))