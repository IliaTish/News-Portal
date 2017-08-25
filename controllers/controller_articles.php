<?php

require_once 'views/view_articles.php';

class Controller_Articles extends Controller
{
	function __construct(){
		$this->model = new Model_Articles();
		$this->view = new View_Articles();
	}

	function action_getArticle(){
		$data = $this->model->getArticle();
		$this->view->generateArticle($data);
	}

	function action_getArticlesByTag(){
		$data = $this->model->getArticlesByTag();
		$this->view->generateArticles($data);
	}

	function action_addArticle(){
		$data = $this->model->addArticle();
		//$this->view->sendInfo($data);
	}

	function action_getArticles(){
		$data = $this->model->getArticles();
		$this->view->generateArticles($data);
	}
}

?>