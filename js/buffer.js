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
		},1000);
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

	$(".reg-button").on("click",()=>{
		if(checkRegisterForm() === true){
			$.ajax({
				url:"Users/registerUser"
			})
		}
	});

	$(".reg-login-input").keydown(()=>{
		$.ajax({url:"Users/checkLogin?login="+$(".reg-login-input").val(),
				data:"ajax=true",
				success	: (data)=>{
					console.log(data);
					if(data === "Данный логин уже занят"){
						$(".error-reg-login").text(data);
					}
					else{
						$(".right-reg-login").text(data);
					}
				}
	})
	})


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

	function checkRegisterForm(){
		$(".error-reg-login").text("");
		$(".error-reg-email").text("");
		$(".error-reg-password").text("");
		$(".error-reg-password-two").text("");
		$(".reg-login-input").css("border", "1px solid black");
		$(".reg-email-input").css("border", "1px solid black");
		$(".reg-password-input").css("border", "1px solid black");
		$(".reg-password-input-two").css("border", "1px solid black");
		//
		if($(".error-reg-login").text() !== ''){
			return false;
		}
		if($(".error-reg-email").text() !== ''){
			return false;
		}
		if($(".reg-login-input").val() === ''){
			$(".error-reg-login").text("Пустой логин!");
			$(".reg-login-input").css("border","1px solid red");
			return false;
		}
		if($(".reg-email-input").val() === ''){
			$(".error-reg-email").text("Пустой email!");
			$(".reg-email-input").css("border","1px solid red");
			return false;
		}
		if($(".reg-password-input").val() === ''){
			$(".error-reg-password").text("Пустой пароль!");
			$(".reg-password-input").css("border","1px solid red");
			return false;
		}
		if($(".reg-password-input-two").val() !== $(".reg-password-input").val()){
			$(".error-reg-password-two").text("Повторный пароль не совпадает!");
			$(".reg-password-input-two").css("border","1px solid red");
			return false;
		}
		return true;
	}

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