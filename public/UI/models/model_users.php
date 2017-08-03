<?php

class Model_Users extends Model{
	function registerUser(){
		$login = $_POST['login'];
		$password = trim($_POST['password']);
		$email = $_POST['email'];
		$userRank = 1;
		$link = mysqli_connect('localhost','root', '42824');
		mysqli_select_db($link,'news-portal');
		$query = "SET NAMES 'utf8'";
		mysqli_query($link,$query);
		$query = 'INSERT INTO users (name,password,email,rank) VALUES (\''.$login.'\',\''.$password.'\',\''.$email.'\',\''.$userRank.'\')';
		$result = mysqli_query($link,$query);
		echo "Регистрация успешная!";
		exit();
		return "Регистрация завершена успешно!";
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
			return "Данный логин уже занят!";
		}
		else
		{
			return "Логин свободен!";
		}
	}
}

?>