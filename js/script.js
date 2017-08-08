
//Global vars

$(document).ready(function () {
	let isAuthorized = false;
	let login;
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

	Router.registerRoute('Articles/addArticle',(route)=>{
		$('.mid-panel').html("<p class=\"spinner-wrapper\"><img class=\"preloader\" src=\"images/Spinner.gif\" alt=\"Loading...\" title\"Loading...\"></p>");
		$('.more-button').hide();
		window.setTimeout(()=>{
			$(".mid-panel").html("<h1 class=\"head-wrap title-adding\">Добавление статьи:</h1>"+
								"<p>Заголовок статьи: <input class=\"input-title\"></p>"+
								"<p>URL картинки: <input class=\"input-image\"></p>"+
								"<p>Краткое описание:</p>"+
								"<textarea class=\"input-summary\"></textarea>"+
								"<p>Описание статьи:</p>"+
								"<textarea id=\"editor\" name = \"editor\"></textarea>"+
								"<p class=\"add-tags-group\">Тяги(через запятую): <input class=\"input-tags\"></p>"+
								"<button class=\"btn btn-default send-article\">Добавить статью</button>"+
								"<button class=\"btn btn-default preview\" data-toggle=\"modal\" data-target=\"#modal-preview\">Превью</button>");
			CKEDITOR.replace('editor');
			$(".preview").click(()=>{
				$(".modal-preview").html("<h1>"+$(".input-title").val()+"</h1>"+
				"<p class=\"image-preview-wrapper\"><img class=\"preview-image\" src=\""+$(".input-image").val()+"\"></p>"+
				"<p>"+CKEDITOR.instances['editor'].getData()+"</p><hr>"+
				"<p>"+$(".input.tags").val()+"</p>"+
				"<p>"+login+"</p>"+
				"<p>Дата</p>");
			})
		},1000);
	})
	//

	if(location.hash !== ""){
		let link = location.hash.replace("#","");
		Router.executeRoute(link);
	}
	else{
		loadMainPage();
	}

	window.getLogin = ()=>{
		return login;
	}

	window.getLoginFromServer = ()=>{
		$.ajax({
			url: "Users/getLogin",
			success: (data)=>{
				login = data;
			}
		})
	}

	window.exit = ()=>{
		login = undefined;
		isAuthorized = false;
	}

	window.getAuthorization = ()=>{
		return isAuthorized;
	}

	$(".add-article").click(()=>{
		location.hash = "Articles/addArticle";
	})

	$(".mid-panel").on("click",(event)=>{
		let target = event.target;
		if(target.getAttribute('class') == 'btn btn-blog read-button' || target.getAttribute('data-class') == 'open-post'){
			let id = target.getAttribute('data-id');
			location.hash = "Articles/getArticle?id="+id;
		}
	});


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
		$('.mid-panel').html("<p class=\"spinner-wrapper\"><img class=\"preloader\" src=\"images/Spinner.gif\" alt=\"Loading...\" title\"Loading...\"></p>");
		$('.more-button').hide();
		$.ajax({
			url: "Articles/getArticles?from=0&to=5",
			data: "ajax=true",
			success: (data)=>{
				$(".mid-panel").html(data);
				$('.more-button').show();
				if(isAuthorized	== true){
					$(".edit-button").css("display", "block");
					$(".delete-button").css("display","block");
				}
			}
		})
	}
	
});


function getSuck(){
	console.log(CKEDITOR.instances['editor1'].getData());
}