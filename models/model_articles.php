<?php
require_once __DIR__. DIRECTORY_SEPARATOR .'..\libraries\rb.php';

class Model_Articles extends Model{
	public function get_data(){
	}

	public function getArticle(){
		$id = $_GET['id'];
		R::setup('mysql:host=localhost;dbname=news;port=3307','root','42824');
		$article = R::getRow("SELECT * from articles WHERE id = ?", array($id));
		if($article){
			return $article;
		}
	}

	public function getArticles(){
		$from = $_GET["from"];
		$to = $_GET["to"];
		if(isset($_GET["filterConfig"])){

		}
		else
		{		
			$from = (integer)$from;
			$to = (integer)$to;
			R::setup("mysql:host=localhost;dbname=news;port=3307",'root','42824');
			$articles = R::getAll("SELECT * FROM articles ORDER BY id DESC LIMIT ?, ?", array($from,$to));
			return $articles;
		}
	}

	public function remove_Article(){

	}

	public function edit_Article(){

	}

	public function getArticlesByTag(){
		$tag = $_GET['tag'];
		R::setup('mysql:host=localhost;dbname=news;port=3307','root','42824');
		$articles = R::getAll("SELECT articles.* FROM articletags, articles, tags WHERE articletags.articleID = articles.id AND articletags.tagID = tags.id AND tags.tag IN (\"".$tag."\") GROUP BY articles.id ORDER by articles.id DESC",array($tag));
		return $articles;
	}

	public function addArticle() {
		$id = $_POST['id'];
		$title = $_POST['title'];
		$summary = $_POST['summary'];
		$isLoadImage = $_POST['isLoadImage'];
		$content = $_POST['content'];
		$tags = $_POST['tags'];
		$tags = json_decode($tags);
		$date = $_POST['date'];
		$comma_seperated_tags = implode(",", $tags);
		$author = $_POST['author'];
		R::setup('mysql:host=localhost;dbname=news;port=3307','root','42824');
		if($isLoadImage == 'true') {
			if (is_uploaded_file($_FILES['file']['tmp_name'])) {
					move_uploaded_file($_FILES['file']['tmp_name'], __DIR__. DIRECTORY_SEPARATOR ."../private/images/".$_FILES['file']['name']);
					$dir = __DIR__. DIRECTORY_SEPARATOR ."../private/images/".$_FILES['file']['name'];
					R::exec("INSERT INTO articles (id,title,imgSrc,summary,content,tags,author,date) VALUES (?,?,?,?,?,?,?,?)", array($id,$title, $dir , $summary, $content, $comma_seperated_tags,$author,$date));
					foreach($tags as $value){
						R::exec("INSERT IGNORE INTO tags (tag) VALUES (?)",array($value));
						R::exec("INSERT INTO articletags (articleID,tagID) SELECT ?,id FROM tags WHERE tag = ?",array($id,$value));
					}
					exit();
			}
			else {
				return json_encode(array("message"=>"Проблемы с загрузкой файла"));
			}
		}
		else {
			R::exec("INSERT INTO articles (id,title,imgSrc,summary,content,tags,author,date) VALUES (?,?,?,?,?,?,?,?)", array($id,$title, $_POST['image'], $summary, $content, $comma_seperated_tags,$author,$date));
			foreach($tags as $value){
						R::exec("INSERT IGNORE INTO tags (tag) VALUES (?)",array($value));
						R::exec("INSERT INTO articletags (articleID,tagID) SELECT ?,id FROM tags WHERE tag = ?",array($id,$value));
			}
			exit();
		}
	}
}
?>