<?php
class View_Articles extends View{
	function generateArticle($data){
		$tags = explode(',',$data['tags']);
		$html = "<h1 class=\"open-post-title\">".$data['title']."</h1><div class=\"post-image-wrapper\"><img class=\"open-post-image\" src=\"".$data['imgSrc']."\"></img></div><p class=\"open-post-content\">".$data['content']."</p><hr><p class=\"open-post-tags\">";
				foreach($tags as $tag){
					$html = $html."<div class=\"tag\">".$tag."</div>";
				}
				$html = $html."</p><p class=\"open-post-author\">".$data['author']."</p><p class=\"open-post-date\">".$data['date']."</p><div data-postid=\"".$data['id']."\" class=\"comment-content\"></div><div class=\"load-comments-wrapper\"><button data-postid=\"".$data['id']."\" class=\"btn btn-default load-comments\">Комментарии</button></div>";
		echo $html;
	}

	function generateArticles($data){
		$html = "";
		foreach($data as $row){
			$tags = explode(',', $row['tags']);
			$html = $html."<div class=\"row\">
                <div class=\"col-md-12 post\">
                    <div class=\"row\">
                        <div class=\"col-md-12\">
                            <h4>
                                <strong><a class=\"post-title\">".$row['title']."</a></strong></h4>
                        </div>
                    </div>
                    <div class=\"row\">
                        <div class=\"col-md-12 post-header-line\">
                            <span class=\"glyphicon glyphicon-user\"></span>by <a href=\"#\">".$row['author']."</a> | <span class=\"glyphicon glyphicon-calendar\">
                            </span>".$row['date']." | <span class=\"glyphicon glyphicon-tags\"></span>:| <span class=\"glyphicon glyphicon-tags\">
                                </span>Tags : ";
                                foreach($tags as $tag){
                                	$html = $html."<div class=\"tag\">".$tag."</div>";
                                }
                      $html = $html.
                        "</div>
                    </div>
                    <div class=\"row post-content\">
                        <div class=\"col-md-3\">
                            <a href=\"#\">
                                <img src=\"".$row['imgSrc']."\" alt=\"\" class=\"img-responsive\">
                            </a>
                        </div>
                        <div class=\"col-md-9\">
                            <p>".$row['summary']."</p>
                            <p>
                                <a class=\"btn btn-read-more\" href=\"http://www.jquery2dotnet.com/2013/12/cool-share-button-effects-styles.html\">Read more</a></p>
                        </div>
                    </div>
                </div>
            </div>";
		}
		echo $html;
	}

	/*function generateArticles($data){
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
	}*/
}

?>