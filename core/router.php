<?php
class Route
{
	static function start()
	{
		$controller_name = 'Main';
		$action_name = 'index';
		$routes = explode('/', $_SERVER['REQUEST_URI']);
		
		if (!empty($routes[2]) )
		{	
			$controller_name = $routes[2];
		}
		
		if ( !empty($routes[3]) )
		{
			$action_array = explode('?', $routes[3]);
			$action_name = $action_array[0];
		}

		$model_name = 'Model_'.$controller_name;
		$controller_name = 'Controller_'.$controller_name;
		$action_name = 'action_'.$action_name;

		$model_file = strtolower($model_name).'.php';
		$model_path = "models/".$model_file;
		if(file_exists($model_path))
		{
			include "models/".$model_file;
		}

		$controller_file = strtolower($controller_name).'.php';
		$controller_path = "controllers/".$controller_file;
		if(file_exists($controller_path))
		{
			include "controllers/".$controller_file;
		}
		else
		{
			Route::ErrorPage404();
		}
		

		$controller = new $controller_name;
		$action = $action_name;
		if(method_exists($controller, $action))
		{
			$controller->$action();
		}
		else
		{
			Route::ErrorPage404();
		}
	
	}
	
	function ErrorPage404()
	{
        $host = 'http://'.$_SERVER['HTTP_HOST'].'/';
        header('HTTP/1.1 404 Not Found');
		header("Status: 404 Not Found");
		header('Location:'.$host.'404');
    }
}
?>