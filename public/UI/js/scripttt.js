$(document).ready(function () {
	$.ajax({
  url: "articles/getArticles",
  success: function(data){
    alert( "Data: " + data );
  }
});
});