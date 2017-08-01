<?php

class Model_Users extends Model{
	function registerUser(){
		$userName = $_POST['userName'];
		$userPassword = $_POST['userPassword'];
		$userEmail = $_POST['userEmail'];
		$userPassword = $_POST['userDoublePassword'];
		R::setup( 'mysql:host=localhost;dbname=news-portal',
        'root', '42824');
        $user = R::dispense('users');
	}

	function checkLogin(){
		$login = $_GET['login'];
		$link = mysqli_connect('localhost','root', '42824');
		mysqli_select_db($link,'news-portal');
		$query = "SET NAMES 'utf8'";
		mysqli_query ($link,$query);
		$query = "SELECT name FROM users where name = \"".$login."\"";
		$result = mysqli_query($link,$query);
		$row = mysqli_fetch_row($result);
		if($row[0] == $login){
			echo "Данный логин уже занят!";
			exit();	
		}
		else{
			echo "Логин свободен!";
			exit();
		}
	}
}

?>