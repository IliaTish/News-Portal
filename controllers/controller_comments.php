<?php

require_once 'views/view_comments.php';

class Controller_Comments extends Controller
{
	function __construct(){
		$this->model = new Model_Comments();
		$this->view = new View_Comments();
	}

	function action_getComments(){
		$data = $this->model->getComments();
		$this->view->generateComments($data);
	}
}

?>