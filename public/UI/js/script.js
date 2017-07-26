$(document).ready(function () {
	var isAjaxRedirect = false;

	if(location.hash !== ""){
		var link = location.hash.replace("#","");
		proccessAjaxRequest(link);
	}


	$(".read-button").click(()=>{

		var id = $(".read-button").attr("data-id");
		$('.mid-panel').html("<img class=\"preloader\" src=\"images/Spinner.gif\" alt=\"Loading...\" title\"Loading...\">");


		$.delay(3000).ajax({
			url: "Articles/getArticle?id="+id,
			data: "ajax=true",
			success: (data)=>{
				$(".mid-panel").hide().html(data).fadeIn('slow');
				location.hash = "Articles/getArticle?id="+id;
				isAjaxRedirect = true;
			}
		})
	});

	$(window).bind('hashchange',()=>{
		if(isAjaxRedirect === false){
			var link = location.hash.replace('#','');
			if(link !== "")
			{
				proccessAjaxRequest(link);
			}
		}
		else
			isAjaxRedirect = false;
	})


	function proccessAjaxRequest(URI){
		$.ajax({
			url: URI,
			data: "ajax=true",
			success: (data)=>{
				$(".mid-panel").html(data);
			}
		})
	}
	/*$.ajax({
  		url: "Articles/getArticles",
  		data: filterConfig,
  		success: function(data){
    		alert( "Data: " + data );
  		}
	});*/
});