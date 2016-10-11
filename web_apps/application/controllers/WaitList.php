<?php
// defined('BASEPATH') OR exit('No direct script access allowed');
class WaitList extends MY_Controller {
	public function __construct() {
		parent::MY_Controller ();
		// $this->require_login();
		// $this->default_page = '/user/index';
	}
	public function waitlist() {
		$userid = $_REQUEST ['userid'];
		$userids = $_REQUEST ['userids'];
		$userids = json_decode ( $userids );
		$input = array ();
		for($i = 0; $i < count ( $userids ); $i ++) {
			if ($userids [$i] != $userid) {
				array_push ( $input, $userids [$i] );
			}
		}
		$data = array ();
		
		if (count ( $input ) > 0) {
			$this->load->model ( 'user_model' );
			// $userids = $this->user_model->getwaitlist();
			// $userids = json_decode ( $userids );
			$data = $this->user_model->userlist ( $input );
		}
		
		echo json_encode ( $data );
	}
}
?>