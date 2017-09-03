$(document).ready(()=>{
	let tags = [];
	let authors = [];
	$(".modal-input-tags").keyup((event)=>{
			if(event.keyCode === 13){
				if($(".modal-input-tags").val() != ""){
					$(".added-tags").append("<div class=\"tags-div\"><p>"+$(".modal-input-tags").val()+"</p><img src=\"images/cross.png\" class=\"close-block\"></div>");
					tags.push($(".modal-input-tags").val());
					$(".modal-input-tags").val("");
				}
			}
	});

	$(".modal-input-authors").keyup((event)=>{
		if(event.keyCode === 13){
			if($(".modal-input-authors").val() != ""){
				$(".added-authors").append("<div class=\"authors-div\"><p>"+$(".modal-input-authors").val()+"</p><img src=\"images/cross.png\" class=\"close-block\"></div>")
				authors.push($(".modal-input-authors").val());
				$(".modal-input-authors").val("");
			}
		}
	});

	$(".added-tags").on('click','.close-block',(event)=>{
		let target = event.target;
		let index = tags.indexOf($(target).parent().text());
		tags.splice(index,1);
		$(target).parent().remove();
	})

	$(".added-authors").on("click",".close-block", (event)=>{
		let target = event.target;
		$(target).parent().remove();
	})



	window.getTags = ()=>{
		return tags;
	}
})
