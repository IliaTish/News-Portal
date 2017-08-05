$(document).ready(()=>{
	$(".reg-login-input").keyup(()=>{
		if($(".reg-login-input").val() === ""){
			$(".info-reg-login").text("");
			$(".reg-button").attr("disabled",false);
		}
		else
		$.ajax({url:"Users/checkLogin?login="+$(".reg-login-input").val(),
				data:"ajax=true",
				success	: (data)=>{
					$(".info-reg-login").text(data);
					if(data === "Данный логин уже занят!"){
						$(".info-reg-login").css("color","red");
						$(".reg-button").attr("disabled","disabled");
					}
					else{
						$(".info-reg-login").css("color","green");
						$(".reg-button").attr("disabled",false);
					}
				}
	})
	})


	$(".reg-email-input").keyup(()=>{
		if($(".reg-email-input").val() === ""){
			$(".info-reg-email").text("");
			$(".reg-button").attr("disabled",false);
		}
		else{
			$.ajax({
				url:"Users/checkEmail?email="+$(".reg-email-input").val(),
				success: (data)=>{
					$(".info-reg-email").text(data);
					if(data === "Email указан не верно"){
						$(".info-reg-email").css("color","red");
						$(".reg-button").attr("disabled","disabled");
					}
					else{
						$(".info-reg-email").css("color","green");
						$(".reg-button").attr("disabled",false);
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
			$(".modal-reg-info").text("Ошибка регистрации! Проверьте корректность данных!");
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
			console.log(data);
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
			$(".reg-login-input").css("border","1px solid red");
			error = true;
		}
		if($(".reg-email-input").val() === ''){
			$(".error-reg-email").text("Пустой email!");
			$(".reg-email-input").css("border","1px solid red");
			error = true;
		}
		if($(".reg-password-input").val() === ''){
			$(".error-reg-password").text("Пустой пароль!");
			$(".reg-password-input").css("border","1px solid red");
			error= true;
		}
		if($(".reg-password-input-two").val() !== $(".reg-password-input").val()){
			$(".error-reg-password-two").text("Повторный пароль не совпадает!");
			$(".reg-password-input-two").css("border","1px solid red");
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
		$(".reg-login-input").css("border", "1px solid black");
		$(".info-reg-login").css("color","red");
		$(".reg-email-input").css("border", "1px solid black");
		$(".reg-password-input").css("border", "1px solid black");
		$(".reg-password-input-two").css("border", "1px solid black");

	}
})