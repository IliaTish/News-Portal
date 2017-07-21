$(document).ready(function () {
	$(".read-button").click(()=>{
		$.ajax({
			url: "Articles/getArticle",
			success: (data)=>{
				alert("Data: " + data);
			}
		})
	});

	var filterConfig = {
		articleTitle : "Lorem ispum"
	}
	/*$.ajax({
  		url: "Articles/getArticles",
  		data: filterConfig,
  		success: function(data){
    		alert( "Data: " + data );
  		}
	});*/
});