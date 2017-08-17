<?php
require_once __DIR__. DIRECTORY_SEPARATOR .'..\libraries\rb.php';

class Model_Articles extends Model{
	public function get_data(){
	}

	public function get_Article(){
		$id = $_GET['id'];
		$link = mysqli_connect('localhost','root', '42824');
		mysqli_select_db($link,'news');
		$query = "SET NAMES 'utf8'";
		mysqli_query ($link,$query);
		$query = 'SELECT * FROM articles WHERE id = '.$id;
		$result = mysqli_query($link,$query);
		$row = mysqli_fetch_row($result);
		mysqli_free_result($result);
		return $row;
	}

	public function get_Articles(){
		$from = $_GET["from"];
		$to = $_GET["to"];
		if(isset($_GET["filterConfig"])){

		}
		else
		{
			$link = mysqli_connect('localhost','root','42824');
			mysqli_select_db($link,'news');
			$query = "SET NAMES 'utf8'";
			mysqli_query ($link,$query);
			$query = 'SELECT * FROM articles ORDER BY id DESC LIMIT '.$from.','.$to;
			$result = mysqli_query($link,$query);
			$rows = mysqli_fetch_all($result);
			mysqli_free_result($result);
			return $rows;
		}
	}

	public function remove_Article(){

	}

	public function edit_Article(){

	}

	public function add_Article(){
		$id = $_POST['id'];
		$title = $_POST['title'];
		$summary = $_POST['summary'];
		$isLoadImage = $_POST['isLoadImage'];
		$content = $_POST['content'];
		$tags = $_POST['tags'];
		$date = $_POST['date'];
		$author = $_POST['author'];
		R::setup('mysql:host=localhost;dbname=news;port=3307','root','42824');
		if($isLoadImage == true){
			if(is_uploaded_file($_FILES['file']['tmp_name'])){
				move_uploaded_file($_FILES['file']['tmp_name'], __DIR__. DIRECTORY_SEPARATOR ."../private/images/".$_FILES['file']['name']);
				$dir = __DIR__. DIRECTORY_SEPARATOR ."../private/images/".$_FILES['file']['name'];
				R::exec("INSERT INTO articles (id,title,imgSrc,summary,content,tags,author,date) VALUES (?,?,?,?,?,?,?,?)", array($id,$title, $dir , $summary, $content, $tags,$author,$date));
			}
		}
		else{
			R::exec("INSERT INTO articles (id,title,imgSrc,summary,content,tags,author,date) VALUES (?,?,?,?,?,?,?,?)", array($id,$title, $_POST['image'], $summary, $content, $tags,$author,$date));
		}
		exit();
	}
}
?>