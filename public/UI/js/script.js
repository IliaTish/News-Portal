$(document).ready(function () {
	$.ajax({
  url: "ajaxtest.php?q=8000",
  success: function(data){
    alert( "Data: " + data );
  }
});
});