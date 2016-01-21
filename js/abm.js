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
	}

	module.updateListTypeahead = function(){
		authors.getAllAuthors(function(authorNames){
			$('#author-typeahead .typeahead').typeahead({
			  hint: true,
			  highlight: true,
			  minLength: 1
			},
			{
			  name: 'authors',
			  source: substringMatcher(authorNames)
			});
		});
	}
}(this.abm = {}));