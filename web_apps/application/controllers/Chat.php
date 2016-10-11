<?php
// defined('BASEPATH') OR exit('No direct script access allowed');
class Chat extends MY_Controller {
	public function __construct() {
		parent::MY_Controller ();
		// $this->require_login();
		// $this->default_page = '/chat/index';
	}
	public function add() {
		$chat = $_REQUEST ['chat'];
		$params = json_decode ( urldecode ( $chat ), 1 );
		
		$this->load->model ( 'chat_model' );
		$return = $this->chat_model->add ( $params );
		
		echo json_encode ( $return );
	}
	public function update() {
		$chat = $_REQUEST ['chat'];
		$params = json_decode ( urldecode ( $chat ), 1 );
		
		$this->load->model ( 'chat_model' );
		$return = $this->chat_model->update ( $params );
		
		echo json_encode ( $return );
	}
	public function backup() {
		$history = $_REQUEST ['history'];
		$params = json_decode ( urldecode ( $history ), 1 );
		
		$this->load->model ( 'chat_model' );
		$data = $this->chat_model->backup ( $params );
		
		echo json_encode ( $data );
	}
	public function restore() {
		$roomid = $_REQUEST ['roomid'];
		
		$return = array ();
		if (empty ( $roomid )) {
			echo json_encode ( $return );
			return;
		}
		
		$this->load->model ( 'chat_model' );
		$return = $this->chat_model->restore ( $roomid );
		
		echo json_encode ( $return );
	}
	public function chatlist() {
		$target = $_REQUEST ['target'];
		$this->load->model ( 'chat_model' );
		$data = $this->chat_model->chatlist ( $target );
		
		echo json_encode ( $data );
	}
}
?>