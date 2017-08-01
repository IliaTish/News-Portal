$(document).ready(function () {
	var isAjaxRedirect = false;
	//Register routes
	Router.registerRoute('Articles/getArticle',(route)=>{
		$('.mid-panel').html("<p class=\"spinner-wrapper\"><img class=\"preloader\" src=\"images/Spinner.gif\" alt=\"Loading...\" title\"Loading...\"></p>");
		$('.more-button').hide();
		window.setTimeout(()=>{
			$.ajax({
			url: route,
			data: "ajax=true",
			success: (data)=>{
				$(".mid-panel").hide().html(data).fadeIn('slow');
			}
		});
		},2500);
	});


	//

	if(location.hash !== ""){
		var link = location.hash.replace("#","");
		Router.executeRoute(link);
	}
	else{
		loadMainPage();
	}

	$(".mid-panel").on("click",(event)=>{
		var target = event.target;
		if(target.getAttribute('class') == 'btn btn-blog read-button'){
			var id = target.getAttribute('data-id');
			location.hash = "Articles/getArticle?id="+id;
		}
	});

	$(.)

	$(window).bind('hashchange',()=>{
		var link = location.hash.replace('#','');
		if(link !== "")
		{
			Router.executeRoute(link);
		}
		else
		{
			loadMainPage();
		}
	})

	function loadMainPage(){
		console.log("Hello");
		$('.mid-panel').html("<p class=\"spinner-wrapper\"><img class=\"preloader\" src=\"images/Spinner.gif\" alt=\"Loading...\" title\"Loading...\"></p>");
		$('.more-button').hide();
		$.ajax({
			url: "Articles/getArticles?from=0&to=4",
			data: "ajax=true",
			success: (data)=>{
				$(".mid-panel").html(data);
				$('.more-button').show();
			}
		})
	}
	
});