var authorService = (function(){

	var instance;

	function init(){
		//here private function
	
		return {

			getAuthors : function(callback){
				$.get(url + "/authors",function(data){
					return callback(JSON.parse(data));
				});
			},
			getAuthor : function(id,callback){
				$.get( url + "/authors/" + id, function (data){
					return callback(JSON.parse(data));
				})
			},
			createAuthor : function (obj,callback){
				$.post( url + "/authors",obj,callback);
			},
			editAuthor : function (id,obj,callback){
				$.put (url+ "/authors/"+ id,obj,callback);
			},
			deleteAuthors : function(id,callback){
				$.delete (url + "/authors/"+id, callback);
			}
		};
	}
	return {

		getInstance: function () {

		  if ( !instance ) {
		    instance = init();
		  }

		  return instance;

		}
	}
})()

var authorsService = authorService.getInstance();