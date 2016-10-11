<?php
if (! defined ( 'BASEPATH' ))
	exit ( 'No direct script access' );
class MY_Loader extends CI_Loader {
	/**
	 */
	function mview($view = array(), $vars = array(), $return = FALSE) {
		$return_value = '';
		if (is_array ( $view )) {
			foreach ( $view as $current_index => $current_view ) {
				$current_vars = $vars;
				if (is_array ( $vars [$current_index] )) {
					$current_vars = $vars [$current_index];
				}
				$result = $this->view ( $current_view, $current_vars, $return );
				if (is_string ( $result )) {
					$return_value .= $result;
				}
			}
			return $result;
		} else {
			return $this->view ( $view, $vars, $return );
		}
	}
	
	/**
	 */
	function bview($view, $vars = array(), $return = FALSE) {
		$nview = array (
				'templates/header',
				'templates/utils',
				'templates/leftmenu' 
		);
		array_push ( $nview, $view );
		array_push ( $nview, 'templates/footer' );
		
		$header = array ();
		$utils = array ();
		$leftmenu = array ();
		$footer = array ();
		$nvars = array (
				$header,
				$utils,
				$leftmenu 
		);
		array_push ( $nvars, $vars );
		array_push ( $nvars, $footer );
		
		return $this->mview ( $nview, $nvars );
	}
}
