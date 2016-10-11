<?php
// defined('BASEPATH') OR exit('No direct script access allowed');
class Pay extends MY_Controller {
	public function __construct() {
		parent::MY_Controller ();
		// $this->require_login();
		// $this->default_page = '/pay/index';
	}
	public function add() {
		$pay = $_REQUEST ['pay'];
		$params = json_decode ( urldecode ( $pay ), 1 );
		
		$this->load->model ( 'pay_model' );
		$return = $this->pay_model->add ( $params );
		
		echo json_encode ( $return );
	}
	public function paylist($data) {
		$data = json_decode ( urldecode ( $data ), 1 );
		$this->load->model ( 'pay_model' );
		$data = $this->pay_model->paylist ( $data );
		
		echo json_encode ( $data );
	}
}
?>