<?php
// defined('BASEPATH') OR exit('No direct script access allowed');
class Agent extends MY_Controller {
	public function __construct() {
		parent::MY_Controller ();
		// $this->require_login();
		// $this->default_page = '/agent/index';
	}
	public function add() {
		$agent = $_REQUEST ['agent'];
		$params = json_decode ( urldecode ( $agent ), 1 );
		unset ( $params ['passwd2'] );
		
		$this->load->model ( 'agent_model' );
		$return = $this->agent_model->add ( $params );
		
		echo json_encode ( $return );
	}
	public function agentlist($data) {
		$data = json_decode ( urldecode ( $data ), 1 );
		if (array_key_exists ( 'gender', $data ) && $data ['gender'] == "all") {
			unset ( $data ['gender'] );
		}
		$this->load->model ( 'agent_model' );
		$data = $this->agent_model->agentlist ( $data );
		
		echo json_encode ( $data );
	}
}
?>