<?php
class Clientq_model extends CI_Model {
	public function __construct() {
		parent::__construct ();
	}
	function clientqlist($data) {
		$sql = "SELECT * FROM tzchat.clientq limit 100";
		$query = $this->db->query ( $sql );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		
		$query = $this->db->query ( $sql );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		return $query->result_array ();
	}
	
	function add($data) {
		if (! array_key_exists ( 'title', $data ) || empty ( $data ['title'] )) {
			throw new Exception ( "title is a required field", 1001 );
		}
		
		$values = array (
				'title' => (array_key_exists ( 'title', $data ) && ! empty ( $data ['title'] )) ? $data ['title'] : NULL,
				'email' => (array_key_exists ( 'email', $data ) && ! empty ( $data ['email'] )) ? $data ['email'] : NULL,
				'detail' => (array_key_exists ( 'detail', $data ) && ! empty ( $data ['detail'] )) ? $data ['detail'] : NULL,
				'created_at' => date ( 'Y-m-d H:i:s' ),
				'created_by' => $data ['userid'],
				'updated_at' => date ( 'Y-m-d H:i:s' ),
				'updated_by' => $data ['userid'] 
		);
		
		$query = $this->db->insert ( 'client_q', $values );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		
		$values ['id'] = $this->db->insert_id ();
		return $values;
	}
}
?>