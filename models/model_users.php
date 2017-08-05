<?php

require_once __DIR__. DIRECTORY_SEPARATOR .'..\libraries\rb.php';

class Model_Users extends Model{
	function registerUser(){
		$login = trim($_POST['login']);
		$password = $_POST['password'];
		$email = $_POST['email'];
		$passwordHash = password_hash($password, PASSWORD_DEFAULT);
		$userRank = 1;
		$link = mysqli_connect('localhost','root', '42824');
		mysqli_select_db($link,'news');
		$query = "SET NAMES 'utf8'";
		mysqli_query($link,$query);
		$query = 'INSERT INTO users (login,password,email,rank) VALUES (\''.$login.'\',\''.$passwordHash.'\',\''.$email.'\',\''.$userRank.'\')';
		$result = mysqli_query($link,$query);
		echo "Регистрация успешная!";
		exit();
		return "Регистрация завершена успешно!";
	}

	function logonUser(){
		$login = $_POST['login'];
		$password = $_POST['password'];
		R::setup('mysql:host=localhost;dbname=news;port=3307','root','42824');
		$user = R::getRow("SELECT password FROM users where login = ?", array($login));
		if($user){
			if(password_verify($password,$user['password'])){
				return json_encode(array('message'=>"Авторизация прошла успешно!Выполняется вход, ожидайте...", 'result'=>true));;
			}
			else
			{
				$obj = json_encode(array('message'=>'Неверный пароль!', 'result'=>false));
				return $obj;
			}
		} 
		else{
			return json_encode(array('message'=>"Пользователь с таким логином не найден!", 'result'=>false));
		}
	}

	function checkLogin(){
		$login = $_GET['login'];
		$link = mysqli_connect('localhost','root', '42824');
		mysqli_select_db($link,'news');
		$query = "SET NAMES 'utf8'";
		mysqli_query ($link,$query);
		$query = "SELECT login FROM users where login = \"".$login."\"";
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

	function checkEmail(){
		$email = $_GET['email'];
		if(filter_var($email,FILTER_VALIDATE_EMAIL)){
			return "Email указан верно!";
		} 
		else{
			return "Email указан не верно!";
		}
	}

}

?>