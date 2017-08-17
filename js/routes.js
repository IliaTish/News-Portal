$(document).ready(function() {
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
								"<p class=\"adding-input-title-error\"></p>"+
								"<p>URL картинки: <input class=\"input-image\"></p>"+
								"<p class=\"add-load-image-wrapper\">Или загрузить картинку: <form name=\"uploadimage\" id=\"image-form\" method=\"post\" enctype=\"multipart/form-data\">"+
								"<input type=\"file\" name=\"filename\" class=\"btn btn-default add-load-button\"></button></form></p>"+
								"<p class=\"adding-image-error\"></p>"+
								"<p>Краткое описание:</p>"+
								"<textarea class=\"input-summary\"></textarea>"+
								"<p class=\"adding-input-summary-error\"></p>"+
								"<p>Описание статьи:</p>"+
								"<textarea id=\"editor\" name = \"editor\"></textarea>"+
								"<p class=\"adding-input-content-error\"></p>"+
								"<p class=\"add-tags-group\">Тяги(через запятую): <input class=\"input-tags\"></p>"+
								"<p class=\"adding-input-tags-error\"></p>"+
								"<button class=\"btn btn-default send-article\">Добавить статью</button>"+
								"<button class=\"btn btn-default preview\" data-toggle=\"modal\" data-target=\"#modal-preview\">Превью</button>");
			CKEDITOR.replace('editor');
			handlePreviewClick();
			handleSendArticleClick();
		},1000);
	})
	//Register routes end


	//Supporting functions
	function handlePreviewClick(){
		$(".preview").click(()=>{
				$(".modal-preview").html("<h1 class=\"title-preview-wrapper\">"+$(".input-title").val()+"</h1>"+
				"<p class=\"image-preview-wrapper\"><img class=\"preview-image\" src=\""+$(".input-image").val()+"\"></p>"+
				"<p class=\"content-preview-wrapper\"></p><hr>"+
				"<p class=\"tags-preview-wrapper\">"+$(".input.tags").val()+"</p>"+
				"<p class=\"login-preview-wrapper\">"+getLogin()+"</p>"+
				"<p class=\"date-preview-wrapper\">Дата</p>");
				$(".content-preview-wrapper").html(CKEDITOR.instances['editor'].getData());
		});
	}

	function checkInputsAddingArticles(){
		let errors = false;
		console.log($(".add-load-button").val());
		if($(".input-title").val() === ''){
				$(".input-title").css("border", "2px solid red");
				$(".adding-input-title-error").text("Пустое название статьи!").css("color", "red");
				errors = true;
		}
		if($(".input-summary").val() === ''){
			$(".input-summary").css("border", "2px solid red");
			$(".adding-input-summary-error").text("Пустое краткое описание!").css("color","red");
			errors = true;
		}
		if($(".input-tags").val() === ''){
			$(".input-tags").css("border", "2px solid red");
			$(".adding-input-tags-error").text("Пустое поле тэгов!").css("color","red");
			errors = true;
		}
		if(CKEDITOR.instances['editor'].getData() === ""){
			$(".adding-input-content-error").text("Пустое поле контента!").css("color","red");
			errors = true;
		}
		if($(".input-image").val() === "" && $(".add-load-button").val() === ""){
			$(".input-image").css("border", "2px solid red");
			$(".add-load-button").css("border", "2px solid red");
			$(".adding-image-error").text("Пустое поле URL картинки и не выбран файл для загрузки!").css("color", "red");
			errors = true;
		}
		return errors;
	}

	function handleSendArticleClick(){
		$(".send-article").click(()=>{
			if(checkInputsAddingArticles() === false){
				let newArticle;
				let formData = new FormData();
				if($(".input-image").val() !== ""){
					formData.append('id', (new Date).valueOf().toString());
					formData.append('title', $("input-title").val());
					formData.append('image', $(".input-image").val());
					formData.append('isLoadImage', false);
					formData.append('summary', $(".input-summary").val());
					formData.append('content', CKEDITOR.instances['editor'].getData());
					formData.append('tags', $(".input-tags").val());
					formData.append("date", new Date().toString());
					formData.append("author", getLogin());
				}
				else{
					formData.append('id', (new Date).valueOf().toString());
					formData.append('title', $("input-title").val());
					formData.append('file',$('.add-load-button')[0].files[0]);
					formData.append('isLoadImage', true);
					formData.append('summary', $(".input-summary").val());
					formData.append('content', CKEDITOR.instances['editor'].getData());
					formData.append('tags', $(".input-tags").val());
					formData.append("date", new Date().toString());
					formData.append("author", getLogin());	
				}
				$.ajax({
					type: "POST",
					url: "Articles/addArticle",
					data: formData,
					processData: false,
					contentType: false,
					success: (data)=>{
						$(".mid-panel").html(data);
					}
				})
			}
		});
	}
})