$(document).ready(()=>{
	$(".mid-panel").on('click','.load-comments',(event)=>{
		let target = event.target;
		let postid = target.getAttribute("data-postid");
		loadComments(postid)
	})

	$(".mid-panel").on("click",'.add-comment-button',(event)=>{
		let comment = $("#userComment").val();
		let date = formateDate(new Date());
		let author = getLogin();
		let postid = $(".comment-content").attr("data-postid");
		let object = {content:comment,date:date,author:author,parentAuthor:"",postid: postid,pid:0};
		$.ajax({
			url:"Comments/addComment",
			data: object,
			type: "POST",
			success: (data)=>{
				$(".comment-content").append(data);
			}
		})
	})

	$(".mid-panel").on("click", ".reply-author",(event)=>{
		let target = event.target;
		let pid = $(target).attr("data-pid");
		let element = $(".comment-post[data-id='"+pid+"']");
		let destination = element.offset().top-element.outerHeight(true);
		$("body").animate({scrollTop:destination},1100);
	})

	$(".mid-panel").on("click", '.reply-button', (event)=>{
		let target	= event.target;
		$(target).after("<div class=\"input-group reply\"><input type=\"text\" id=\"userCommentReply\" class=\"form-control input-sm chat-input\" placeholder=\"Write your message here...\" /><span class=\"input-group-btn\">     <a class=\"btn btn-primary btn-sm add-reply-button\"><span class=\"glyphicon glyphicon-comment\"></span> Add Comment</a></span></div>");
		$(target).hide();
		$(".add-reply-button").click(()=>{
			let author = getLogin();
			let pid = $(target).attr("data-id");
			let content = $("#userCommentReply").val();
			let parentAuthor = $(target).attr("data-author");
			let date = formateDate(new Date());
			let postid = $(".comment-content").attr("data-postid");
			let level = $(target).attr("data-level");
			let object = {author:author,pid:pid,content:content,parentAuthor:parentAuthor,date:date,postid:postid,level:level};
			$.ajax({
				url:"Comments/addReplyComment",
				data:object,
				type: "POST",
				success: (data)=>{
					$(target).closest(".comment-post").after(data);
				}
			})
			$(".add-reply-button").unbind('click');
			$(".reply").remove();
		})
	})

	function loadComments(postid){
		$.ajax({
			url: "Comments/getComments?postid="+postid,
			success: (data)=>{
				$(".comment-content").html(data);
			}
		})
	}
});