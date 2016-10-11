<?php
class Account_model extends CI_Model {
	public function __construct() {
		parent::__construct ();
	}
	function accountlist($data) {
		$sql = "SELECT * FROM tzchat.account WHERE";
		if (array_key_exists ( 'userid', $data )) {
			$userid = $data ['userid'];
			$sql = $sql . " created_by = '" . $userid . "'";
		}
		$query = $this->db->query ( $sql );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		$values = $query->result_array ();
		
		$sql = "SELECT * FROM tzchat.user WHERE";
		if (array_key_exists ( 'userid', $data )) {
			$userid = $data ['userid'];
			$sql = $sql . " userid = '" . $userid . "'";
		}
		$query = $this->db->query ( $sql );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		$values2 = $query->result_array ();
		$values ['point'] = $values2 [0] ['point'];
		return $values;
	}
	function add($data) {
		if (! array_key_exists ( 'userid', $data ) || empty ( $data ['userid'] )) {
			throw new Exception ( "userid is a required field", 1001 );
		}
		
		$values = array (
				'source' => (array_key_exists ( 'source', $data ) && ! empty ( $data ['source'] )) ? $data ['source'] : NULL,
				'action' => (array_key_exists ( 'action', $data ) && ! empty ( $data ['action'] )) ? $data ['action'] : NULL,
				'point' => (array_key_exists ( 'point', $data ) && ! empty ( $data ['point'] )) ? ( int ) $data ['point'] : NULL,
				'created_at' => date ( 'Y-m-d H:i:s' ),
				'created_by' => $data ['userid'],
				'updated_at' => date ( 'Y-m-d H:i:s' ),
				'updated_by' => $data ['userid'] 
		);
		
		$query = $this->db->insert ( 'account', $values );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		
		$values ['id'] = $this->db->insert_id ();
		return $values;
	}
}
?>