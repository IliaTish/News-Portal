$(document).ready(function () {
	var filterConfig = {
		articleTitle = "Lorem ispum"
	}
	$.ajax({
  		url: "Articles/getArticles",
  		data: filterConfig,
  		success: function(data){
    		alert( "Data: " + data );
  		}
	});
});