$(document).ready(()=>{
	$(".mid-panel").on('click','.load-comments',(event)=>{
		target = event.target;
		$.ajax({
			url: "Comments/getComments?postid="+target.getAttribute("data-postid"),
			success: (data)=>{
				$(".comment-content").html(data);
			}
		})
	})
});