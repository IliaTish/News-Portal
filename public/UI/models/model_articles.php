<?php
class Model_Articles extends Model{
	public function get_data(){
	}

	public function get_Article(){
		$id = $_GET['id'];
		$link = mysqli_connect('localhost','root', '42824');
		mysqli_select_db($link,'news-portal');
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
		$link = mysql_connect('localhost','root','42824');
		mysql_select_db('news-portal');
		$query = 'SELECT * FROM articles';
		$result = mysql_query($query);

	}

	public function remove_Article(){

	}

	public function edit_Article(){

	}

	public function add_Article(){
		$dataJSON = $_POST["dataJSON"];
		$decodedData = json_decode($dataJSON,true);
		echo $decodedData['id'];
		exit();
	}
}
?>