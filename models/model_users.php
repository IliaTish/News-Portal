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

	function generateSalt(){
		$salt = '';
		$saltLength = 8;
		for($i=0; $i<$saltLength; $i++) {
			$salt .= chr(mt_rand(33,126));
		}
		return $salt;
	}

	function eauthUser(){
		session_start();
		if(empty($_SESSION['auth']) or $_SESSION['auth'] == false){
			if(!empty($_COOKIE['login']) and !empty($_COOKIE)){
				$login = $_COOKIE['login'];
				$key = $_COOKIE['key'];
				R::setup('mysql:host=localhost;dbname=news;port=3307','root', '42824');
				$user = R::getRow("SELECT * from users WHERE login = ? AND cookie = ?",array($login,$key));
				if($user){
					$_SESSION['auth'] = true;
					$_SESSION['login'] = $login;
					return json_encode(array("message"=>"Пользователь авторизован через куки!", "cookie"=>true, "login"=>$_SESSION['login']));
				}
				return json_encode(array("message"=>"Пользователь с такими куками не обнаружен!", "cookie"=>false));
			}
			return json_encode(array("message"=>"Куки пользователя не обнаружены!", "cookie"=>false));
		}
		else{
			return json_encode(array("message"=>"Пользователь авторизован через сессию!", "session"=>true, "login"=>$_SESSION["login"]));
		}
	}

	function logonUser(){
		$login = $_POST['login'];
		$password = $_POST['password'];
		R::setup('mysql:host=localhost;dbname=news;port=3307','root','42824');
		$user = R::getRow("SELECT password FROM users where login = ?", array($login));
		if($user){
			if(password_verify($password,$user['password'])){
				session_start();
				$_SESSION['auth'] = true;
				$_SESSION['login'] = $login;
				if(isset($_POST['rememberMe'])){
					$key = Model_Users::generateSalt();
					setcookie('login', $login, time()+60*60*24*30);
					setcookie('key', $key, time()+60*60*24*30);
					R::exec("UPDATE users SET cookie = ? WHERE login = ?", array($key,$login));
				}
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