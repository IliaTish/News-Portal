<?php
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
			$query = 'SELECT * FROM articles ORDER BY id LIMIT '.$from.','.$to;
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
		$dataJSON = $_POST["dataJSON"];
		$decodedData = json_decode($dataJSON,true);
		$link = mysqli_connect('localhost','root','42824');
		mysqli_select_db($link,'news');
		$query = "SET NAMES 'utf8'";
		mysqli_query($link, $query);
		//$query = 'INSERT INTO articles (id,title,imgSrc,summary,content,tags,author,date) VALUES ([]'
	}
}
?>