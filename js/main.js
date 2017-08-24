$(document).ready(function () {
	let isAuthorized = false;
	let login;
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
	//Register routes
	if(location.hash !== ""){
		let link = location.hash.replace("#","");
		Router.executeRoute(link);
	}
	else{
		loadMainPage();
	}

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

	function loadMainPage(){
		$('.mid-panel').html("<p class=\"spinner-wrapper\"><img class=\"preloader\" src=\"images/Spinner.gif\" alt=\"Loading...\" title\"Loading...\"></p>");
		$('.more-button').hide();
		$.ajax({
			url: "Articles/getArticles?from=0&to=4",
			data: "ajax=true",
			success: (data)=>{
				$(".mid-panel").html(data);
				$('.more-button').show();
				if(isAuthorized	== true){
				}
			}
		})
	}

	window.formateDate = (date)=> {
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' +
            date.getHours() + ':' + date.getMinutes();
    }
	
});
