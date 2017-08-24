<?php
class View_Articles extends View{
	function generateArticle($data){
		echo "<h1 class=\"open-post-title\">".$data['title']."</h1><p class=\"open-post-content\">".$data['content']."</p><hr><p class=\"open-post-tags\">".$data['tags']."</p><p class=\"open-post-author\">".$data['author']."</p><p class=\"open-post-date\">".$data['date']."</p>";
	}

	function generateArticles($data){
		$html = '';
		foreach ($data as $row){
			$tags = explode(',',$row['tags']);
			$html = $html."<div class=\"span blogShort\">
			<div class=\"post-header-group\">
			<h1 class=\"post-title\">".$row['title']."</h1></div>
			<div class=\"post-image-wrapper\">
			<img class=\"blog-post-image\" data-class=\"open-post\" data-id=\"".$row['id']."\" src=\"".$row['imgSrc']."\" alt=\"post img\" width=\"65%\" hieght=\"300px\" class=\"img-responsive thumb img-thumbnail\"></div>
			<article>
			<p class=\"post-summary\">".$row['summary']."</p>
			</article>
			<div class=\"tags-group\">
			<div class=\"tags\">";
			foreach($tags as $tag){
				$html = $html."<div class=\"tag\">".$tag."</div>";
			}
			$html = $html."</div>
			<p class=\"user-name\">".$row['author'].",</p>
			<p class=\"date-creation\">".$row['date']."</p>
			<div class=\"clearfix\"></div>
			</div>
			<div class=\"buttons-group\">
			<button data-class=\"open-post\" class=\"btn btn-blog read-button\" data-id=\"".$row['id']."\">Читать далее</button>
			</div>
			<div data-author = \"".$row['author']."\" class=\"dropdown article-settings\">
		 	<button data-author	= \"".$row['author']."\" class=\"btn btn-primary dropdown-toggle article-settings-button\" type=\"button\" data-toggle=\"dropdown\">...
			</button>
			<ul class=\"dropdown-menu\">
	 		<li class=\"report-button\">Пожаловаться</li>
	 		<li class=\"edit-button\">Редактировать</li>
	 		<li class=\"delete-button\">Удалить</li>
			</ul>
			</div>
			<div class=\"clearfix\"></div>
			</div>
			<hr>
			</div>";
		}
		echo $html;
	}
}

?>