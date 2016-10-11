<?php
class Commcd_model extends CI_Model {
	public function __construct() {
		parent::__construct ();
	}
	function list() {
		$sql = "SELECT grp_id, lvl, id, name, sn FROM tzchat.comm_cd WHERE use_yn = 'y' order by lvl, grp_id, sn";
		$query = $this->db->query ( $sql );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		return $query->result_array ();
	}
}
?>