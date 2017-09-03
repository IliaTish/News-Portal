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
		window.scrollTo(0,0);
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

	window.exit = ()=>{
		login = undefined;
		isAuthorized = false;
	}

	window.getAuthorization = ()=>{
		return isAuthorized;
	}

	function checkLogonForm(){
		var error = false;
		if($(".login-input").val() === ""){
			error = true;
			$(".login-input").css("border", "1px solid red");
			$(".info-logon-login").text("Пустой логин!").css("color","red");
		}
		if($(".password-input").val() === ""){
			error = true;
			$(".password-input").css("border", "1px solid red");
			$(".info-logon-password").text("Пустой пароль!").css("color","red");
		}
		return error;
	}

	$(".logon-button").click(()=>{
		if(checkLogonForm() === false){
			var dataObject = {
				login: $(".login-input").val(),
				password: $(".password-input").val(),
				rememberMe: $(".auth-checkbox").prop("checked")
			}
			$.ajax({
				url: "Users/logonUser",
				type: "POST",
				data: dataObject,
				success: (data)=>{
					var object = JSON.parse(data);
					if(object.result){
						$(".modal-logon-info").text(object.message).css("color", "green");
						$(".modal-spinner-wrapper").show();
						setTimeout(()=>{
							$("#modal-auth").modal("hide");
							login = object.login;
							isAuthorized = true;
							authorizeUser(login);
						}
						,5000);

					}
					else{
						$(".modal-logon-info").text(object.message).css("color", "red");
					}
				}
			})
		}
		else{
			$(".modal-logon-info").text("Ошибка авторизации. Проверьте корректность данных!").css("color","red");
		}
	});


	function loadMainPage(){
		$('.mid-panel').html("<p class=\"spinner-wrapper\"><img class=\"preloader\" src=\"images/Spinner.gif\" alt=\"Loading...\" title\"Loading...\"></p>");
		$('.more-button').hide();
		$.ajax({
			url: "Articles/getArticles?from=0&to=6",
			data: "ajax=true",
			success: (data)=>{
				$(".mid-panel").html(data);
				$('.more-button').show();
			}
		})
	}

	window.formateDate = (date)=> {
		let stringDate = date.getFullYear() + '-';
		if(date.getMonth() < 10){
			stringDate += '0'+(date.getMonth()+1)+"-";
		}
		else{
			stringDate +=(date.getMonth()+1)+"-";
		}
		if(date.getDate() < 10){
			stringDate += '0'+date.getDate() + " "; 
		}
		else{
			stringDate += date.getDate() + " ";
		}
		if(date.getHours() < 10){
			stringDate += "0" + date.getHours()+":";
		}
		else{
			stringDate += date.getHours()+":";
		}
		if(date.getMinutes() < 10){
			stringDate += "0"+date.getMinutes()+":";
		}
		else{
			stringDate += date.getMinutes()+":";
		}
		if(date.getSeconds() < 10){
			stringDate += "0"+date.getSeconds();
		}
		else{
			stringDate += date.getSeconds();
		}
        return stringDate;
    }
	
});
