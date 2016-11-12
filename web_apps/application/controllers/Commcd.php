<?php
// defined('BASEPATH') OR exit('No direct script access allowed');
class Commcd extends MY_Controller {
	public function __construct() {
		parent::MY_Controller ();
		// $this->require_login();
		// $this->default_page = '/room/index';
	}
	public function list() {
		$this->load->model ( 'commcd_model' );
		$data = $this->commcd_model->list ();
		
		echo json_encode ( $data );
	}
}
?>