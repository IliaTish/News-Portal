$(document).ready(()=>{
	$(".reg-login-input").keyup(()=>{
		if($(".reg-login-input").val() === ""){
			$(".info-reg-login").text("");
			$(".reg-button").attr("disabled",false);
			$(".reg-login-input").css("border","2px solid black");
		}
		else
		$.ajax({url:"Users/checkLogin?login="+$(".reg-login-input").val(),
				data:"ajax=true",
				success	: (data)=>{
					if(data == false){
						$(".info-reg-login").text("Данный логин уже занят!");
						$(".info-reg-login").css("color","red");
						$(".reg-login-input").css("border","2px solid red");
						$(".reg-button").attr("disabled","disabled");
					}
					else{
						$(".info-reg-login").text("Логин свободен!");
						$(".info-reg-login").css("color","green");
						$(".reg-login-input").css("border","2px solid green");
						$(".reg-button").attr("disabled",false);
					}
				}
	})
	})


	$(".reg-password-input").keyup(()=>{
		$(".reg-password-input").css("border", "2px solid black");
		$(".error-reg-password").text("");
	})

	$(".reg-password-input-two").keyup(()=>{
		$(".reg-password-input-two").css("border", "2px solid black");
		$(".error-reg-password-two").text("");
	})

	$(".reg-email-input").keyup(()=>{
		if($(".reg-email-input").val() === ""){
			$(".info-reg-email").text("");
			$(".reg-button").attr("disabled",false);
			$(".reg-email-input").css("border", "2px solid black");
		}
		else{
			$.ajax({
				url:"Users/checkEmail?email="+$(".reg-email-input").val(),
				success: (data)=>{
					if(data == false){
						$(".info-reg-email").text("Email указан не верно!");
						$(".info-reg-email").css("color","red");
						$(".reg-button").attr("disabled","disabled");
						$(".reg-email-input").css("border","2px solid red");
					}
					else{
						$(".info-reg-email").text("Email указан верно!");
						$(".info-reg-email").css("color","green");
						$(".reg-button").attr("disabled",false);
						$(".reg-email-input").css("border","2px solid green");
					}
				}
			})
		}
	})

	$(".reg").click(()=>{
		tuneInputRegisterForm();
	})

	$(".reg-button").click(()=>{
		if(checkRegisterForm() === false){
			registerUser();
		}
		else{
			$(".modal-reg-info").text("Ошибка регистрации! Проверьте корректность данных!").css("color", "red");
		}
	});

	function registerUser(){
		var dataObject = {
			login: $(".reg-login-input").val(),
			password: $(".reg-password-input").val(),
			email: $(".reg-email-input").val()
		}
		$.ajax({
			url: "Users/registerUser",
			type: "POST",
			data: dataObject,
			success: (data)=>{
			if(data == true){
				$(".modal-reg-info").text("Вы успешно зарегистрировались, перенаправление...").css("color", "green");
				$(".reg-login-input").css("border", "2px solid green");
				$(".reg-email-input").css("border", "2px solid green");
				$(".reg-password-input").css("border", "2px solid green");
				$(".reg-password-input-two").css("border","2px solid green");
			}
			else{
				$(".modal-reg-info").text("Ошибка регистрации!").css("color","red");
			}
		}
		});
	}

	function tuneInputRegisterForm(){
		$(".reg-login-input").val("");
		$(".reg-email-input").val("");
		$(".reg-password-input").val("");
		$(".reg-password-input-two").val("");
		tuneCSSTextRegForm();
	}

	function checkRegisterForm(){
		var error = false;
		tuneCSSTextRegForm();
		//
		if($(".reg-login-input").val() === ''){
			$(".info-reg-login").text("Пустой логин!");
			$(".info-reg-login").css("color","red");
			$(".reg-login-input").css("border","2px solid red");
			error = true;
		}
		if($(".reg-email-input").val() === ''){
			$(".info-reg-email").text("Пустой email!");
			$(".info-reg-email").css("color","red");
			$(".reg-email-input").css("border","2px solid red");
			error = true;
		}
		if($(".reg-password-input").val() === ''){
			$(".error-reg-password").text("Пустой пароль!");
			$(".reg-password-input").css("border","2px solid red");
			error= true;
		}
		if($(".reg-password-input-two").val() !== $(".reg-password-input").val()){
			$(".error-reg-password-two").text("Повторный пароль не совпадает!");
			$(".reg-password-input-two").css("border","2px solid red");
			error =true;
		}
		return error;
	}	

	function tuneCSSTextRegForm(){
		//text
		$(".info-reg-email").text("");
		$(".info-reg-login").text("");
		$(".error-reg-email").text("");
		$(".error-reg-password").text("");
		$(".error-reg-password-two").text("");
		$(".modal-reg-info").text("");

		//css
		$(".info-reg-email").css("color","red");
		$(".reg-login-input").css("border", "2px solid black");
		$(".info-reg-login").css("color","red");
		$(".reg-email-input").css("border", "2px solid black");
		$(".reg-password-input").css("border", "2px solid black");
		$(".reg-password-input-two").css("border", "2px solid black");

	}
})