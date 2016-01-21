var bookService = (function () {
 
  var instance;
 
  function init() {
 
    function getBooks(url,callback){
      $.get( url , function (data){
        return callback(JSON.parse(data));
      })
    }
    function getBook(id,callback){
      $.get( url +"/books/"+ id,function (data) {
        return callback(JSON.parse(data));
      })
    }

    return {
 
      getBooksList: function(callback) {
        getBooks(url+"/books",callback);
      },
      getBook: function(id,callback) {
        $.get( url +"/books/"+ id,function (data) {
          callback(JSON.parse(data));
        })
      },
      createBook: function(bookObj,callback){
        $.post(url+"/books",bookObj,callback);
      },
      editBook: function(bookObj,callback){
        $.put(url + "/books/" + bookObj.idBook, bookObj , callback)
      },
      deleteBook: function(id,callback){
        $.delete(url + "/books/" + id, callback);
      }
    };
 
  };
 
  return {
 
    getInstance: function () {
 
      if ( !instance ) {
        instance = init();
      }
 
      return instance;
    }
 
  };
 
})();

var booksService = bookService.getInstance();