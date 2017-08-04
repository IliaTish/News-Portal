<?php
class View_Articles extends View{
	function generateArticle($data){
		echo "<h1 class=\"open-post-title\">".$data[1]."</h1><p class=\"img-wrapper\"><img class=\"open-post-image\" src=\"".$data[2]."\"></p><p class=\"open-post-content\">".$data[4]."</p><hr><p class=\"open-post-tags\">".$data[5]."</p><p class=\"open-post-author\">".$data[6]."</p><p class=\"open-post-date\">".$data[7]."</p>";
	}

	function generateArticles($data){
		$html = '';
		foreach ($data as $row){
			$html = $html."<div data-class=\"open-post\" class=\"span blogShort\">
			<div class=\"post-header-group\">
			<h1 class=\"post-title\">".$row[1]."</h1></div>
			<img src=\"".$row[2]."\" alt=\"post img\" width=\"250px\" class=\"pull-left img-responsive thumb margin10 img-thumbnail\">
			<article>
			<p class=\"post-summary\">".$row[3]."</p>
			</article>
			<div class=\"buttons-tags-group\">
			<p class=\"tags\">".$row[5]."</p>
			<p class=\"user-name\">".$row[6].",</p>
			<p class=\"date-creation\">".$row[7]."</p>
			<button class=\"btn btn-blog edit-button\">EDIT</button>
			<button class=\"btn btn-blog delete-button\">DELETE</button>
			<button data-class=\"open-post\" class=\"btn btn-blog read-button\" data-id=\"".$row[0]."\">READ MORE</button>
			<div class=\"clearfix\"></div>
			</div>
			<hr>
			</div>";
		}
		echo $html;
	}
}

?>