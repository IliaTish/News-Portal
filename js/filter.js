$(document).ready(()=>{
	let tags = [];
	let authors = [];
	$(".modal-input-tags").keyup((event)=>{
			if(event.keyCode === 13){
				if($(".modal-input-tags").val() != ""){
					if(tags.length == 0){
						$(".modal-info-tags").show();
					}
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

	function tuneFilterForm(){
		$(".modal-filter-info").text("");
		$(".added-tags").empty();
		$(".added-authors").empty();
	}

	function checkFilterModal(){
		let error = false;
		if(tags.length == 0 && authors.length == 0 && $(".modal-fromdate-input").val() == "" && $(".modal-todate-input").val() == ""){
			error = true;
			$(".modal-filter-info").text("Не выбран ни одно поле для фильтрации!");
			$(".modal-filter-info").css("color","red");
			return error;
		}
		if(($(".modal-fromdate-input").val() != "" && $(".modal-todate-input").val() == "") || ($(".modal-todate-input").val() != "" && $("modal-fromdate-input").val() == "")){
			$(".modal-filter-info").text("Некорректное поле даты!");
			error = true;
			return error;
		}
	}


	$(".filter-button").click(()=>{
		checkFilterModal();
	});

	$(".added-tags").on('click','.close-block',(event)=>{
		let target = event.target;
		let index = tags.indexOf($(target).parent().text());
		tags.splice(index,1);
		if(tags.length == 0){
			$(".modal-info-tags").hide();
		}
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
