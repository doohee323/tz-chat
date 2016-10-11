<?php
// defined('BASEPATH') OR exit('No direct script access allowed');
class Talk extends MY_Controller {
	public function __construct() {
		parent::MY_Controller ();
		// $this->require_login();
		// $this->default_page = '/talk/index';
	}
	public function add() {
		$talk = $_REQUEST ['talk'];
		$params = json_decode ( urldecode ( $talk ), 1 );
		
		$this->load->model ( 'talk_model' );
		$return = $this->talk_model->add ( $params );
		
		echo json_encode ( $return );
	}
	public function talklist($data) {
		$data = json_decode ( urldecode ( $data ), 1 );
		if (array_key_exists ( 'gender', $data ) && $data ['gender'] == "all") {
			unset ( $data ['gender'] );
		}
		$this->load->model ( 'talk_model' );
		$data = $this->talk_model->talklist ( $data );
		
		echo json_encode ( $data );
	}
}
?>