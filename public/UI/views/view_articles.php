<?php
class View_Articles extends View{
	function generateArticle($data){
		echo "<p class=\"title\">".$data[0]."</p><p class=\"content\">".$data[1]."</p>";
	}
}

?>