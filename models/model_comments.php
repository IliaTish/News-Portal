<?php
require_once __DIR__. DIRECTORY_SEPARATOR .'..\libraries\rb.php';
class Model_Comments extends Model{
	public function addComment(){
		$author = $_POST['author'];
		$content = $_POST['content'];
		$date = $_POST['date'];
		$pid = (integer)$_POST['pid'];
		$postid = $_POST['postid'];
		R::setup("mysql:host=localhost;dbname=news;port=3307",'root','42824');
		$id = R::getCell("SELECT MAX(id) from comments WHERE postid = ?", array($postid));
		if($id){
			R::exec("INSERT INTO comments (id,pid,postid,content,author,date,positiveRating,negativeRating,parentAuthor) VALUES (?,?,?,?,?,?,0,0,\"\")",array($id+1,$pid,$postid,$content,$author,$date));
			return array("id"=>$id+1,"pid"=>$pid,"postid"=>$postid, "content"=>$content, "author"=>$author, "date"=>$date, "positiveRating"=>0, "negativeRating"=>0);
		}
		else{
			R::exec("INSERT INTO comments (id,pid,postid,content,author,date,positiveRating,negativeRating,parentAuthor) VALUES (1,?,?,?,?,?,0,0,\"\")",array($pid,$postid,$content,$author,$date));
			return array("id"=>$id,"pid"=>$pid,"postid"=>$postid, "content"=>$content, "author"=>$author, "date"=>$date, "positiveRating"=>0, "negativeRating"=>0);
		}
	}


	public function addReplyComment(){
		$author = $_POST['author'];
		$content = $_POST['content'];
		$date = $_POST['date'];
		$pid = (integer)$_POST['pid'];
		$postid = $_POST['postid'];
		$level = $_POST['level'];
		$parentAuthor = $_POST['parentAuthor'];
		R::setup("mysql:host=localhost;dbname=news;port=3307",'root','42824');
		$id = R::getCell("SELECT MAX(id) from comments WHERE postid = ?", array($postid));
		R::exec("INSERT INTO comments (id,pid,postid,content,author,date,positiveRating,negativeRating,parentAuthor) VALUES (?,?,?,?,?,?,0,0,?)",array($id+1,$pid,$postid,$content,$author,$date,$parentAuthor));
		return array("id"=>$id,"pid"=>$pid,"postid"=>$postid, "content"=>$content,"parentAuthor"=>$parentAuthor ,"author"=>$author, "date"=>$date, "positiveRating"=>0, "negativeRating"=>0,"level"=>$level);
	}


	public function getComments(){
		$postid = $_GET['postid'];
		$new_arr = array();
		R::setup("mysql:host=localhost;dbname=news;port=3307",'root','42824');
		$array = R::getAll("SELECT * FROM comments WHERE postid = ? ORDER BY pid DESC, id DESC", array($postid));
		for($i = 0, $c = count($array); $i < $c; $i++){
			$new_arr[$array[$i]['pid']][] = $array[$i];
		}
		return $new_arr;
	}

}
?>