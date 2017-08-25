<?php
require_once __DIR__. DIRECTORY_SEPARATOR .'..\libraries\rb.php';
class Model_Comments extends Model{
	public function addComment(){
		$author = $_POST['author'];
		$content = $_POST['content'];
		$date = $_POST['date'];
		$pid = $_POST['pid'];
		$postid = $_POST['postid'];
		R::setup("mysql:host=localhost;dbname=news;port=3307",'root','42824');
		$id = R::getCell("SELECT MAX(id) from comments WHERE postid = ?", array($postid));
		if($id){
			R::exec("INSERT INTO comments (id,pid,postid,content,author,date,rating) VALUES (?,?,?,?,?,?,0)",array($id,$pid,$postid,$content,$author,$date));
		}
		else{
			R::exec("INSERT INTO comments (id,pid,postid,content,author,date,rating) VALUES (1,?,?,?,?,?,0",array($pid,$postid,$content,$author,$date));
		}
		return json_encode(array("message"=>"Комментарий успешно добавлен", "success"=>true));
	}


	public function getComments(){
		$postid = $_GET['postid'];
		$new_arr = array();
		R::setup("mysql:host=localhost;dbname=news;port=3307",'root','42824');
		$array = R::getAll("SELECT * FROM comments WHERE postid = ? ORDER BY pid ASC, id ASC", array($postid));
		for($i = 0, $c = count($array); $i < $c; $i++){
			$new_arr[$array[$i]['pid']][] = $array[$i];
		}
		return $new_arr;
	}

}
?>