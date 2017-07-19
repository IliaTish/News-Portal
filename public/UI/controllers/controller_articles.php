<?php

class Controller_Articles extends Controller{

	function __construct(){
		$this->model = new Model_Articles();
		$this->view = new View();
	}

	function action_getArticle(){
		$data = $this->model->get_Article();
		$this->view->proccessData($data);
	}
}

?>