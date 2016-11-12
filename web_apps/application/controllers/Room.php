<?php
// defined('BASEPATH') OR exit('No direct script access allowed');
class Room extends MY_Controller {
	public function __construct() {
		parent::MY_Controller ();
		// $this->require_login();
		// $this->default_page = '/room/index';
	}
	public function add() {
		$room = $_REQUEST ['room'];
		$params = json_decode ( urldecode ( $room ), 1 );
		unset ( $params ['passwd2'] );
		
		$this->load->model ( 'room_model' );
		$return = $this->room_model->add ( $params );
		
		echo json_encode ( $return );
	}
	public function roomlist($data) {
		$data = json_decode ( urldecode ( $data ), 1 );
		if (array_key_exists ( 'gender', $data ) && $data ['gender'] == "all") {
			unset ( $data ['gender'] );
		}
		$this->load->model ( 'room_model' );
		$data = $this->room_model->roomlist ( $data );
		
		echo json_encode ( $data );
	}
}
?>