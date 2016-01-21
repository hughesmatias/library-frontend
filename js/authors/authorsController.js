(function(module){

	module.objAuthor = function (){
		return obj = {
			id : $("#idAuthor").val(),
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
		var objAuthor = module.objAuthor();
		authorsService.createAuthor(objAuthor,function(data){
			module.showContainClean();
			module.showSuccessfulSubmit("Agregado");
			module.cleanAuthorForm();
		})
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
			$("#delete-modal-author #idAuthor").val(id);
			deleteModal.modal('show');
			deleteModal.find(".modal-body p").text("Si elimina el autor:"+ data +" se borraran todos los libros que tenga vinculados");
		})
	};

	module.deleteButtonHandler = function(){
		var id = $("#delete-modal-author #idAuthor").val();
		authorsService.deleteAuthors(id,function(data){
			$("#delete-modal-author").modal("hide");
			module.showListAuthors();
		});
	}

	module.edit = function(id) {
		module.showContainClean();
		$("#create-author").removeClass("hidden");
		$("#create-author h1").text("Forumario de Edicion de Autor");
		$("#create-author #button-submit-author").addClass("hidden");
        $("#create-author #button-edit-author").removeClass("hidden");
		module.getNameAuthorById(id, function(data){
			$("#nameAuthor").val(data);
			$("#idAuthor").val(id);
		});
	};
 
	module.editButtonHandler = function () {
		var objAuthor = module.objAuthor();
		authorsService.editAuthor(objAuthor, function(data) {
			module.showContainClean();
			module.showSuccessfulSubmit('Editado');
		});
	};

	module.showListAuthors = function(){
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