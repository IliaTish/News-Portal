
//Global vars
let isAuthorized = false;
let login;

$(document).ready(function () {
	let isAjaxRedirect = false;
	//Checking auth
	$.ajax({
		url: "Users/eauthUser",
		success: (data)=>{
			let object = JSON.parse(data);
			console.log(object.message);
			if(object.cookie != undefined){
				if(object.cookie == true){
					isAuthorized = true;
					login = object.login;
					authorizeUser(object.login);
				}
			}
			if(object.session != undefined){
				if(object.session == true){
					isAuthorized = true;
					login = object.login;
					authorizeUser(object.login);
				}
			}

		}
	});
	//
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
		},1000);
	});
	//

	if(location.hash !== ""){
		let link = location.hash.replace("#","");
		Router.executeRoute(link);
	}
	else{
		loadMainPage();
	}

	$(".mid-panel").on("click",(event)=>{
		let target = event.target;
		if(target.getAttribute('class') == 'btn btn-blog read-button' || target.getAttribute('data-class') == 'open-post'){
			let id = target.getAttribute('data-id');
			location.hash = "Articles/getArticle?id="+id;
		}
	});


	$(".exit").click(()=>{
		console.log("fuck");
	})


	$(window).bind('hashchange',()=>{
		let link = location.hash.replace('#','');
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