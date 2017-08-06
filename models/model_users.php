<?php

require_once __DIR__. DIRECTORY_SEPARATOR .'..\libraries\rb.php';

class Model_Users extends Model{
	function registerUser(){
		$login = trim($_POST['login']);
		$password = $_POST['password'];
		$email = $_POST['email'];
		$passwordHash = password_hash($password, PASSWORD_DEFAULT);
		$userRank = 1;
		R::setup('mysql:host=localhost;dbname=news;port=3307','root','42824');
		R::exec("INSERT INTO users (login,password,email,rank) VALUES (?,?,?,?)", array($login,$passwordHash,$email,$userRank));
		return true;
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
		R::setup('mysql:host=localhost;dbname=news;port=3307','root','42824');
		$user = R::getRow("SELECT login FROM users where login = ?", array($login));
		//$query = "SELECT login FROM users where login = \"".$login."\"";
		if($user){
			return false;
		}
		else
		{
			return true;
		}
	}

	function checkEmail(){
		$email = $_GET['email'];
		if(filter_var($email,FILTER_VALIDATE_EMAIL)){
			return true;
		} 
		else{
			return false;
		}
	}

}

?>