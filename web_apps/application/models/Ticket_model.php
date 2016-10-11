<?php
class Ticket_model extends CI_Model {
	public function __construct() {
		parent::__construct ();
	}
	function ticketlist($data) {
		$sql = "SELECT * FROM tzchat.ticket WHERE use_yn = 'y'";
		$query = $this->db->query ( $sql );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		return $query->result_array ();
	}
	function get($params) {
		$sql = "SELECT * FROM tzchat.ticket WHERE ticket_type = '" . $params ['ticket_type'] . "'";
		$query = $this->db->query ( $sql );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		$return = array ();
		foreach ( $query->result_array () as $row ) {
			$return = $row;
		}
		return $return;
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
		
		$query = $this->db->insert ( 'ticket', $values );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		
		$values ['id'] = $this->db->insert_id ();
		return $values;
	}
}
?>