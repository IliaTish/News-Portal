$(document).ready(()=>{
	$(".logon-button").click(()=>{
		if(checkLogonForm() === false){
			var dataObject = {
				login: $(".login-input").val(),
				password: $(".password-input").val(),
				rememberMe: 1
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
							authorizeUser($(".login-input"));
							window.getLoginFromServer();
							$("#modal-auth").modal("hide");
						},5000);

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
	$(".auth").click(()=>{
		tuneLogonForm();
	})


	$(".exit").click(()=>{
		var object = {
			login: window.getLogin()
		}
		window.exit();
		deAuthorizeUser();
		$.ajax({
			type: 'POST',
			url: "Users/deAuthorizeUser",
			data: object,
			success: (data)=>{
				console.log(data);
			}
		})	
	})

	function tuneLogonForm(){
		$(".modal-spinner-wrapper").hide();
		$(".login-input").val("").css("border","1px solid black");
		$(".password-input").val("").css("border","1px solid black");
		$(".info-logon-login").text("");
		$(".info-logon-password").text("");
		$(".modal-logon-info").text("");
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
})

function authorizeUser(userName){
	if(getAuthorization() === true){
		$(".auth").hide();
		$(".reg").hide();
		$(".user-icon").show();
		$(".ddmenu").hover(()=>{
			$(".dbmenu-go").show();
		},()=>{
			$(".dbmenu-go").hide();
		})
		$(".edit-button").css("display", "inline");
		$(".delete-button").css("display", "inline");
	}

}

function deAuthorizeUser(){
	$(".auth").show();
	$(".reg").show();
	$(".user-icon").hide();
	$(".dbmenu-go").hide();
	$(".edit-button").css("display", "none");
	$('.delete-button').css("display", "none");
} 