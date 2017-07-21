<?php
class Model_Articles extends Model{
	public function get_data(){

	}

	public function get_Article(){
		$link = mysqli_connect('localhost','root', '42824');
		mysqli_select_db($link,'news-portal');
		$query = "SET NAMES 'utf8'";
		mysqli_query ($link,$query);
		$query = 'SELECT content FROM articles WHERE id = \'150\'';
		$result = mysqli_query($link,$query);
		$row = mysqli_fetch_row($result);
		return $row[0];
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

	}
}
?>