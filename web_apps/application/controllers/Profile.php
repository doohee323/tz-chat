<?php
// defined('BASEPATH') OR exit('No direct script access allowed');
class Profile extends MY_Controller {
	public function __construct() {
		parent::MY_Controller ();
		// $this->require_login();
		// $this->default_page = '/profile/index';
	}
	public function add() {
		$return = array ();
		
		if ($_FILES ['file'] ['name']) {
			$valid_file = true;
			
			if (! $_FILES ['file'] ['error']) {
				$new_file_name = strtolower ( $_FILES ['file'] ['tmp_name'] );
				$new_file_name = str_replace ( '/tmp/', '/tmp/uploads/', $new_file_name ) . ".jpg";
				// Utils::log_message ( LOG_ERR, "============$new_file_name=======" . $new_file_name );
				$file_path = substr ( $new_file_name, 0, strrpos ( $new_file_name, "/" ) );
				ini_set ( 'display_errors', 'On' );
				if (! file_exists ( $file_path )) {
					$ret = mkdir ( $file_path, 0775, true );
				}
				
				if ($_FILES ['file'] ['size'] > (1024000)) {
					$valid_file = false;
					$message = 'Oops!  Your file\'s size is to large.';
				}
				
				if ($valid_file) {
					$ret = move_uploaded_file ( $_FILES ['file'] ['tmp_name'], $new_file_name );
					$message = 'Congratulations!  Your file was accepted.';
				}
				
				$return ['file'] = $_FILES ['file'];
				$new_file_name = str_replace ( '/tmp/', '', $new_file_name );
				$return ['file'] = $this->url_origin ( $_SERVER ) . "/" . $new_file_name;
			} else {
				$message = 'Ooops!  Your upload triggered the following error:  ' . $_FILES ['file'] ['error'];
			}
		}
		
		
		
		echo json_encode ( $return );
	}
	public function save() {
		$user = $_REQUEST ['user'];
		$params = json_decode ( urldecode ( $user ), 1 );
		unset ( $params ['passwd2'] );
		
		$this->load->model ( 'user_model' );
		$return = $this->user_model->profile ( $params );
		
		
		
		echo json_encode ( $return );
	}
	
	public function update() {
		$user = $_REQUEST ['user'];
		$params = json_decode ( urldecode ( $user ), 1 );
	
		$this->load->model ( 'user_model' );
		$return = $this->user_model->update ( $params );
	
		
		
		echo json_encode ( $return );
	}
	
	public function changePasswd() {
		$user = $_REQUEST ['user'];
		$params = json_decode ( urldecode ( $user ), 1 );
	
		$this->load->model ( 'user_model' );
		$return = $this->user_model->changePasswd ( $params );
	
		
		
		echo json_encode ( $return );
	}
	
	function url_origin($s, $use_forwarded_host = false) {
		$ssl = (! empty ( $s ['HTTPS'] ) && $s ['HTTPS'] == 'on');
		$sp = strtolower ( $s ['SERVER_PROTOCOL'] );
		$protocol = substr ( $sp, 0, strpos ( $sp, '/' ) ) . (($ssl) ? 's' : '');
		$port = $s ['SERVER_PORT'];
		$port = ((! $ssl && $port == '80') || ($ssl && $port == '443')) ? '' : ':' . $port;
		$host = ($use_forwarded_host && isset ( $s ['HTTP_X_FORWARDED_HOST'] )) ? $s ['HTTP_X_FORWARDED_HOST'] : (isset ( $s ['HTTP_HOST'] ) ? $s ['HTTP_HOST'] : null);
		$host = isset ( $host ) ? $host : $s ['SERVER_NAME'] . $port;
		return $protocol . '://' . $host;
	}
	public function full_url($s, $use_forwarded_host = false) {
		return url_origin ( $s, $use_forwarded_host ) . $s ['REQUEST_URI'];
	}
}

?>