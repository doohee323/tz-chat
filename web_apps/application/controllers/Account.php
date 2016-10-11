<?php
// defined('BASEPATH') OR exit('No direct script access allowed');
class Account extends MY_Controller {
	public function __construct() {
		parent::MY_Controller ();
		// $this->require_login();
		// $this->default_page = '/account/index';
	}
	public function add() {
		$account = $_REQUEST ['account'];
		$params = json_decode ( urldecode ( $account ), 1 );
		
		$this->load->model ( 'account_model' );
		$return = $this->account_model->add ( $params );
		
		echo json_encode ( $return );
	}
	public function accountlist($data) {
		$data = json_decode ( urldecode ( $data ), 1 );
		
		$this->load->model ( 'account_model' );
		$data = $this->account_model->accountlist ( $data );
		
		echo json_encode ( $data );
	}
}
?>