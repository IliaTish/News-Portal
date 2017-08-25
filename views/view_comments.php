<?php
class View_Comments extends View{

	function sortThree($data,$parent = 0, $level = 0){
		static $html = "";
		$arr = $data[$parent];
		for($i = 0; $i < count($arr); $i++){
			$html = $html."<div class=\"comment-post\" style=\"margin-left:".$level."px;\"><img class=\"comment-avatar\" height=\"40px\" src=\"https://learn.javascript.ru/article/metrics/metric-offset-width-height.png\"><div class=\"clearfix\"></div></img>".$arr[$i]['content'];
			if(isset($data[$arr[$i]['id']]))
				View_Comments::sortThree($data,$arr[$i]['id'],20);
			$html = $html."</div>";
		}

		return $html;
	}


	function generateComments($arr){
		echo View_Comments::sortThree($arr,0,0);
	}

	}

?>