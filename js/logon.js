$(document).ready(()=>{

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

})

function authorizeUser(userName){
	if(getAuthorization() == true){
		$(".auth").hide();
		$(".reg").hide();
		$(".user-icon").show();
		$(".ddmenu").hover(()=>{
			$(".dbmenu-go").show();
		},()=>{
			$(".dbmenu-go").hide();
		})
	}
}

function deAuthorizeUser(){
	$(".auth").show();
	$(".reg").show();
	$(".user-icon").hide();
	$(".dbmenu-go").hide();
} 