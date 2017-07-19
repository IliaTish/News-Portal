$(document).ready(function () {
	$.ajax({
  url: "Articles/getArticle",
data: "id=101231231",
  success: function(data){
    alert( "Data: " + data );
  }
});
});