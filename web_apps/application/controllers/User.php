<?php
// defined('BASEPATH') OR exit('No direct script access allowed');
class User extends MY_Controller {
	public function __construct() {
		parent::MY_Controller ();
		// $this->require_login();
		// $this->default_page = '/user/index';
	}
	
	// http://www.tzchat.local/user?test=1
	public function index() {
		// $this->input->get ( 'test' );
		// $this->input->post ( 'test' );
		$this->load->model ( 'user_model' );
		
		$data ['result'] = $this->user_model->getData ();
		$data ['page_title'] = "Registration Page!";
		echo json_encode ( $data );
	}
	public function get($params) {
		$params = json_decode ( urldecode ( $params ), 1 );
		
		$this->load->model ( 'user_model' );
		$return = $this->user_model->get ( $params );
		
		echo json_encode ( $return );
	}
	public function login($params) {
		$params = json_decode ( urldecode ( $params ), 1 );
		
		$this->load->model ( 'user_model' );
		$return = $this->user_model->login ( $params );
		
		echo json_encode ( $return );
	}
	public function add() {
		$user = $_REQUEST ['user'];
		$params = json_decode ( urldecode ( $user ), 1 );
		unset ( $params ['passwd2'] );
		
		$this->load->model ( 'user_model' );
		$return = $this->user_model->add ( $params );
		
		echo json_encode ( $return );
	}
	public function user_list() {
		$this->load->model ( 'user_model' );
		
		$data ['result'] = $this->user_model->getData ( '' );
		$data ['page_title'] = "Registration Page!";
		echo json_encode ( $data );
	}
	
	// http://www.tzchat.local/registration/ajax_test
	public function ajax_test() {
		$this->load->model ( 'user_model' );
		
		$data ['result'] = $this->user_model->getData ();
		$data ['page_title'] = "Registration Page!";
		echo json_encode ( $data );
	}
}
?>