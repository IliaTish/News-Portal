<?php
class View_Articles extends View{
	function generateArticle($data){
		echo "<h1 class=\"open-post-title\">".$data[1]."</h1><p class=\"img-wrapper\"><img class=\"open-post-image\" src=\"".$data[2]."\"></p><p class=\"open-post-content\">".$data[4]."</p><hr><p class=\"open-post-tags\">".$data[5]."</p><p class=\"open-post-author\">".$data[6]."</p><p class=\"open-post-date\">".$data[7]."</p>";
	}
}

?>