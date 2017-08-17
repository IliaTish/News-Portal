$(document).ready(function(){
	$(".add-article").click(()=>{
		location.hash = "Articles/addArticle";
	})

	$(".mid-panel").on("click",(event)=>{
		let target = event.target;
		if(target.getAttribute('class') == 'btn btn-blog read-button' || target.getAttribute('data-class') == 'open-post'){
			let id = target.getAttribute('data-id');
			location.hash = "Articles/getArticle?id="+id;
		}
	});

})