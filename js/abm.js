(function(module){

	module.index=function(){
		$(".starter-template").removeClass("hidden");
		$(".wrapper").addClass("hidden");
		$("#index").removeClass("hidden");
	}

	module.menu=function(){
		var listMenu = $("ul.nav.navbar-nav");
		listMenu.append("<li><a data-nombre='Listar' id='link-list-books'>Listar Libros</a></li>");
		listMenu.append("<li><a data-nombre='Listar' id='link-list-authors'>Listar Autores</a></li>");
		listMenu.append("<li><a data-nombre='Crear' id='link-create-book'>Crear Libro</a></li>");
	}
}(this.abm = {}));