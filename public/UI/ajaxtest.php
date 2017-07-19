<?php
class AjaxTest{
	static function start(){
		$routes = explode("/", $_SERVER["REQUEST_URI"]);
		echo $routes[5];
	}
}
?>