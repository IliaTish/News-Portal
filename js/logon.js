$(document).ready(()=>{
	$(".logon-button").click(()=>{
		if(checkLogonForm() === false){
			var dataObject = {
				login: $(".login-input").val(),
				password: $(".password-input").val()
			}
			$.ajax({
				url: "Users/logonUser",
				type: "POST",
				data: dataObject,
				success: (data)=>{
					var object = JSON.parse(data);
					if(object.result){
						$(".modal-logon-info").text(object.message);
						$(".modal-logon-info").css("color","green");
						$(".modal-spinner-wrapper").show();
						setTimeout(()=>{
							authorizeUser($(".login-input"));
							$("#modal-auth").modal("hide");
						},5000);

					}
					else{
						$(".modal-logon-info").text(object.message);
						$(".modal-logon-info").css("color","red");
					}
				}
			})
		}
		else{
			$(".modal-logon-info").text("Ошибка авторизации. Проверьте корректность данных!");
			$(".modal-logon-info").css("color","red");
		}
	});
	$(".auth").click(()=>{
		tuneLogonForm();
	})

	function authorizeUser(userName){
		$(".auth").hide();
		$(".reg").hide();
		$(".user-icon").show();
		$(".ddmenu").hover(()=>{
			$(".dbmenu-go").show();
		},()=>{
			$(".dbmenu-go").hide();
		})

	}

	function tuneLogonForm(){

		//
		$(".modal-spinner-wrapper").hide();

		//text
		$(".login-input").val("");
		$(".password-input").val("");
		$(".info-logon-login").text("");
		$(".info-logon-password").text("");


		//css
		$(".login-input").css("border","1px solid black");
		$(".password-input").css("border","1px solid black");
		$(".modal-logon-info").text("");
	}


	function checkLogonForm(){
		var error = false;
		if($(".login-input").val() === ""){
			error = true;
			$(".login-input").css("border", "1px solid red");
			$(".info-logon-login").text("Пустой логин!");
			$(".info-logon-login").css("color","red");
		}
		if($(".password-input").val() === ""){
			error = true;
			$(".password-input").css("border", "1px solid red");
			$(".info-logon-password").text("Пустой пароль!");
			$(".info-logon-password").css("color","red");
		}
		return error;
	}
})