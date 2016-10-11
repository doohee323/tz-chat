<?php
if (! defined ( 'BASEPATH' ))
	exit ( 'No direct script access' );

/**
 * Extending the Core Controller class
 *
 * code in /libraries/MY_Controller.php allow you to use your controllers normally,
 * and it will (in fact) extend your MY_Controller.
 * 
 * @see http://codeigniter.com/user_guide/general/core_classes.html
 */
class MY_Controller extends CI_Controller {
	public $user = null;
	public $notifications = array ();
	public $default_page = '/home/';
	public $served_from = 'N/A';
	public $autoload_session = true;
	public $autoload_database = true;
	public $branding = null;
	protected $template = null;
	public function MY_Controller() {
		parent::__construct ();
		
		if (defined ( 'ENABLE_PROFILER' ) && ENABLE_PROFILER) {
			// enable_profile checks for is_bool, which is false for any variables or constants
			$this->output->enable_profiler ( true );
		}
		
		$method = strtoupper ( $this->input->server ( 'REQUEST_METHOD' ) );
		if (! in_array ( $method, array (
				'GET',
				'DELETE',
				'POST',
				'PUT' 
		) )) {
			return $method = 'GET';
		}
		//Utils::log_message ( LOG_NOTICE, $method . ' ' . Utils::curPageURL () );
		
		// Block access to _base
		$url = parse_url ( Utils::curPageURL () );
		$current_path = $url ['path'];
		
		$parts = explode ( '/', $current_path );
		if (is_array ( $parts ) && array_key_exists ( 1, $parts ) && '_base' == $parts [1]) {
			show_error ( 'Access denied', 403 );
			return;
		}
		
		try {
			if ($this->autoload_database) {
				$this->load->database ();
			}
			
// 			if ($this->autoload_session) {
// 				$this->load->library ( 'session' );
// 			}
		} catch ( Exception $e ) {
			show_error ( $e->getMessage (), 503 );
			return;
		}
		
// 		$this->load->model ( 'auth_model' );
// 		if ($this->auth_model->is_logged_in ()) {
// 			$this->user = $this->user_model->profile ();
// 		}

		$served_from = shell_exec ( "hostname" );
		
		$this->served_from = $served_from;

		header ( "Access-Control-Allow-Origin: *" );
		header ( "Access-Control-Allow-Methods: GET, PUT, POST, OPTIONS" );
		
	}
	protected function require_login($redirect = true) {
		if (! $this->auth_model->is_logged_in ()) {
			if ($redirect) {
				// won't use braning library cause we don't want to redirect to /ops
				$path = ('cloudmonitor' == DASHBOARD_PRODUCT_VIEW) ? 'cm' : 'fd';
				redirect ( "/$path/user/login" );
			} else {
				show_error ( 'You must be logged in to view this page', 403 );
			}
		}
	}
	protected function require_permission($permission_level) {
		if (! $this->auth_model->has_permission ( $permission_level )) {
			// show_error("You don't have access to the url you where trying to reach.", 403);
			redirect ( $this->path ( '/app/user/logout' ) );
		}
	}
}