<?php

require_once 'views/view_articles.php';

class Controller_Articles extends Controller
{
	function __construct(){
		$this->model = new Model_Articles();
		$this->view = new View_Articles();
	}

	function action_getArticle(){
		$data = $this->model->get_Article();
		$this->view->generateArticle($data);
	}

	function action_addArticle(){
		$this->model->add_Article();
	}

	function action_getArticles(){
		$data = $this->model->get_Articles();
		$this->view->generateArticles($data);
	}
}

?>