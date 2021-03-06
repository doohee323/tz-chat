<?php
class Room_model extends CI_Model {
	public function __construct() {
		parent::__construct ();
	}
	function roomlist($data) {
		$sql = "SELECT A.id, A.created_by AS userid, CASE WHEN A.main != '' THEN A.main WHEN B.main != '' THEN B.main ELSE '../images/user-men.png' END AS main,";
		$sql = $sql . " B.nickname, B.age, B.gender, B.ticket_type, A.roomType, A.chatroom, A.region1, A.region2, A.title, A.detail, A.created_at";
		$sql = $sql . " FROM tzchat.room A, tzchat.user B";
		$sql = $sql . " WHERE A.created_by = B.USERID";
		// if (array_key_exists ( 'userid', $data )) {
		// $userid = $data ['userid'];
		// $sql = $sql . " AND A.created_by != '" . $userid . "'";
		// }
		if (array_key_exists ( 'gender', $data ) && ! empty ( $data ['gender'] )) {
			$sql = $sql . " AND B.gender = '" . $data ['gender'] . "'";
		}
		if (array_key_exists ( 'region1', $data ) && ! empty ( $data ['region1'] )) {
			$sql = $sql . " AND A.region1 = '" . $data ['region1'] . "'";
		}
		if (array_key_exists ( 'region2', $data ) && ! empty ( $data ['region2'] )) {
			$sql = $sql . " AND A.region2 = '" . $data ['region2'] . "'";
		}
		if (array_key_exists ( 'roomType', $data ) && ! empty ( $data ['roomType'] )) {
			$sql = $sql . " AND A.roomType = '" . $data ['roomType'] . "'";
		}
		if (array_key_exists ( 'created_at', $data ) && ! empty ( $data ['created_at'] )) {
			$sql = $sql . " AND A.created_at < " . $data ['created_at'];
		}
		
		$sql = $sql . " order by A.created_at desc";
		if (array_key_exists ( 'count', $data ) && ! empty ( $data ['count'] )) {
			$sql = $sql . " limit " . $data ['count'];
		} else {
			$sql = $sql . " limit 100";
		}
		
		$query = $this->db->query ( $sql );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		return $query->result_array ();
	}
	function room($id) {
		$sql = "SELECT * FROM tzchat.room WHERE id = '" . $id;
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
		if (! array_key_exists ( 'title', $data ) || empty ( $data ['title'] )) {
			throw new Exception ( "title is a required field", 1001 );
		}
		
		$values = array (
				'title' => (array_key_exists ( 'title', $data ) && ! empty ( $data ['title'] )) ? $data ['title'] : NULL,
				'main' => (array_key_exists ( 'main', $data ) && ! empty ( $data ['main'] )) ? $data ['main'] : NULL,
				'roomType' => (array_key_exists ( 'roomType', $data ) && ! empty ( $data ['roomType'] )) ? $data ['roomType'] : NULL,
				'chatroom' => (array_key_exists ( 'chatroom', $data ) && ! empty ( $data ['chatroom'] )) ? $data ['chatroom'] : NULL,
				'region1' => (array_key_exists ( 'region1', $data ) && ! empty ( $data ['region1'] )) ? $data ['region1'] : NULL,
				'region2' => (array_key_exists ( 'region2', $data ) && ! empty ( $data ['region2'] )) ? $data ['region2'] : NULL,
				'detail' => (array_key_exists ( 'detail', $data ) && ! empty ( $data ['detail'] )) ? $data ['detail'] : NULL,
				'created_at' => date ( 'Y-m-d H:i:s' ),
				'created_by' => $data ['userid'],
				'updated_at' => date ( 'Y-m-d H:i:s' ),
				'updated_by' => $data ['userid'] 
		);
		
		$query = $this->db->insert ( 'room', $values );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		
		if ($data ['gender'] == 'man') {
			$this->load->model ( 'user_model' );
			$user = $this->user_model->get ( array (
					'userid' => $data ['userid'] 
			) );
			$point = $user ['point'];
			$point = $point - 300;
			
			$values0 = array (
					'userid' => $data ['userid'],
					'point' => $point,
					'updated_at' => date ( 'Y-m-d H:i:s' ),
					'updated_by' => $data ['userid'] 
			);
			$this->load->model ( 'pay_model' );
			$result1 = $this->pay_model->add ( $values0 );
			$values ['point'] = $point;
		}
		
		$values ['id'] = $this->db->insert_id ();
		
		return $values;
	}
	function update($data) {
		if (! array_key_exists ( 'title', $data ) || empty ( $data ['title'] )) {
			throw new Exception ( "title is a required field", 1001 );
		}
		
		$values = array (
				'title' => (array_key_exists ( 'title', $data ) && ! empty ( $data ['title'] )) ? $data ['title'] : NULL,
				'roomType' => (array_key_exists ( 'gender', $data ) && ! empty ( $data ['gender'] )) ? $data ['gender'] : NULL,
				'region1' => (array_key_exists ( 'region1', $data ) && ! empty ( $data ['region1'] )) ? $data ['region1'] : NULL,
				'region2' => (array_key_exists ( 'region2', $data ) && ! empty ( $data ['region2'] )) ? $data ['region2'] : NULL,
				'detail' => (array_key_exists ( 'detail', $data ) && ! empty ( $data ['detail'] )) ? $data ['detail'] : NULL,
				'updated_at' => date ( 'Y-m-d H:i:s' ),
				'updated_by' => $data ['userid'] 
		);
		
		$this->db->where ( 'id', $data ['id'] );
		$query = $this->db->update ( 'room', $values );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		return $values;
	}
}
?>