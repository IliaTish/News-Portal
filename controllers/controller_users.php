<?php

require_once 'views/view_users.php';

class Controller_Users extends Controller
{
	function __construct(){
		$this->model = new Model_Users();
		$this->view = new View_Users();
	}

	function action_registerUser(){
		$data = $this->model->registerUser();
		$this->view->sendInfo($data); 
	}

	function action_deAuthorizeUser(){
		$data = $this->model->deAuthorizeUser();
	}

	function action_getLogin(){
		$data = $this->model->getLogin();
		$this->view->sendInfo($data);
	}

	function action_eauthUser(){
		$data = $this->model->eauthUser();
		$this->view->sendInfo($data);
	}

	function action_checkLogin(){
		$data = $this->model->checkLogin();
		$this->view->sendInfo($data);
	}

	function action_checkEmail(){
		$data = $this->model->checkEmail();
		$this->view->sendInfo($data);
	}

	function action_logonUser(){
		$data = $this->model->logonUser();
		$this->view->sendInfo($data);
	}
}

?>