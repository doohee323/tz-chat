<?php
class User_model extends CI_Model {
	public function __construct() {
		parent::__construct ();
	}
	function get($params) {
		$sql = "SELECT * FROM tzchat.user WHERE ";
		if (array_key_exists ( 'userid', $params )) {
			$userid = $params ['userid'];
			$sql = $sql . " userid = '" . $userid . "'";
		}
		if (array_key_exists ( 'nickname', $params )) {
			$nickname = $params ['nickname'];
			$sql = $sql . " nickname = '" . $nickname . "'";
		}
		if (array_key_exists ( 'passwd', $params )) {
			$passwd = $params ['passwd'];
			$sql = $sql . " AND passwd = '" . $passwd . "'";
		}
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
	function login($params) {
		if (! array_key_exists ( 'userid', $params ) || empty ( $params ['userid'] )) {
			throw new Exception ( "userid is a required field", 1001 );
		}
		if (! array_key_exists ( 'passwd', $params ) || empty ( $params ['passwd'] )) {
			throw new Exception ( "passwd is a required field", 1001 );
		}
		$return = $this->get ( $params );
		
		if (count ( $return ) > 0) {
			$values = array (
					'updated_ip' => $_SERVER ['REMOTE_ADDR'],
					'updated_at' => date ( 'Y-m-d H:i:s' ),
					'updated_by' => $params ['userid'] 
			);
			$this->db->where ( 'userid', $params ['userid'] );
			$query = $this->db->update ( 'user', $values );
			if (false === $query) {
				$error = $this->db->error ();
				throw new Exception ( $error ['message'], 500 );
			}
		}
		return $return;
	}
	function userlist($userids) {
		$input = "";
		for($i = 0; $i < count ( $userids ); $i ++) {
			$input = $input . ",'" . $userids [$i] . "'";
		}
		$input = substr ( $input, 1, strlen ( $input ) );
		$sql = "SELECT * FROM tzchat.user WHERE userid in (" . $input . ")";
		$query = $this->db->query ( $sql );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		return $query->result_array ();
	}
	function getwaitlist() {
		$req_url = "http://192.168.82.1:3000/talklist";
		$ch = curl_init ();
		
		// Get request
		curl_setopt ( $ch, CURLOPT_URL, $req_url );
		curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
		
		// // Post request
		// $req_url2 = substr ( $req_url, 0, strpos ( $req_url, '?' ) );
		// $post_params = substr ( $req_url, strpos ( $req_url, '?' ) + 1, strlen ( $req_url ) );
		// curl_setopt ( $ch, CURLOPT_URL, $req_url2 );
		// curl_setopt ( $ch, CURLOPT_POST, 1 );
		// curl_setopt ( $ch, CURLOPT_POSTFIELDS, $post_params );
		// curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
		
		$raw_response = curl_exec ( $ch );
		curl_close ( $ch );
		return $raw_response;
	}
	function add($data) {
		if (! array_key_exists ( 'userid', $data ) || empty ( $data ['userid'] )) {
			throw new Exception ( "userid is a required field", 1001 );
		}
		
		if (array_key_exists ( 'gender', $data )) {
			$gender = $data ['gender'];
			if ($gender == 'man') {
				$data ['main'] = "images/user-men.png";
			} else {
				$data ['main'] = "images/user-women.png";
			}
		}
		
		$values = array (
				'userid' => $data ['userid'],
				'passwd' => $data ['passwd'],
				// 'passwd' => md5 ( $data ['passwd'] ),
				'nickname' => (array_key_exists ( 'nickname', $data ) && ! empty ( $data ['nickname'] )) ? $data ['nickname'] : NULL,
				'gender' => (array_key_exists ( 'gender', $data ) && ! empty ( $data ['gender'] )) ? $data ['gender'] : NULL,
				'age' => (array_key_exists ( 'age', $data ) && ! empty ( $data ['age'] )) ? ( int ) $data ['age'] : NULL,
				'email' => (array_key_exists ( 'email', $data ) && ! empty ( $data ['email'] )) ? $data ['email'] : NULL,
				'region1' => (array_key_exists ( 'region1', $data ) && ! empty ( $data ['region1'] )) ? $data ['region1'] : NULL,
				'region2' => (array_key_exists ( 'region2', $data ) && ! empty ( $data ['region2'] )) ? $data ['region2'] : NULL,
				'meeting_type' => (array_key_exists ( 'meeting_type', $data ) && ! empty ( $data ['meeting_type'] )) ? $data ['meeting_type'] : NULL,
				'talk_style' => (array_key_exists ( 'talk_style', $data ) && ! empty ( $data ['talk_style'] )) ? $data ['talk_style'] : NULL,
				'main' => (array_key_exists ( 'main', $data ) && ! empty ( $data ['main'] )) ? $data ['main'] : NULL,
				'created_at' => date ( 'Y-m-d H:i:s' ),
				'created_by' => $data ['userid'],
				'updated_at' => date ( 'Y-m-d H:i:s' ),
				'updated_by' => $data ['userid'] 
		);
		
		$query = $this->db->insert ( 'user', $values );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		
		$values ['id'] = $this->db->insert_id ();
		return $values;
	}
	function profile($data) {
		if (! array_key_exists ( 'id', $data ) || empty ( $data ['id'] )) {
			throw new Exception ( "id is a required field", 1001 );
		}
		
		$values = array (
				'id' => $data ['id'],
				'userid' => $data ['userid'],
				'gender' => (array_key_exists ( 'gender', $data ) && ! empty ( $data ['gender'] )) ? $data ['gender'] : NULL,
				'nickname' => (array_key_exists ( 'nickname', $data ) && ! empty ( $data ['nickname'] )) ? $data ['nickname'] : NULL,
				'age' => (array_key_exists ( 'age', $data ) && ! empty ( $data ['age'] )) ? ( int ) $data ['age'] : NULL,
				'region1' => (array_key_exists ( 'region1', $data ) && ! empty ( $data ['region1'] )) ? $data ['region1'] : NULL,
				'region2' => (array_key_exists ( 'region2', $data ) && ! empty ( $data ['region2'] )) ? $data ['region2'] : NULL,
				'meeting_type' => (array_key_exists ( 'meeting_type', $data ) && ! empty ( $data ['meeting_type'] )) ? $data ['meeting_type'] : NULL,
				'talk_style' => (array_key_exists ( 'talk_style', $data ) && ! empty ( $data ['talk_style'] )) ? $data ['talk_style'] : NULL,
				
				'keyword' => (array_key_exists ( 'keyword', $data ) && ! empty ( $data ['keyword'] )) ? $data ['keyword'] : NULL,
				'height' => (array_key_exists ( 'height', $data ) && ! empty ( $data ['height'] )) ? ( int ) $data ['height'] : NULL,
				'weight' => (array_key_exists ( 'weight', $data ) && ! empty ( $data ['weight'] )) ? ( int ) $data ['weight'] : NULL,
				'blood' => (array_key_exists ( 'blood', $data ) && ! empty ( $data ['blood'] )) ? $data ['blood'] : NULL,
				'scholar' => (array_key_exists ( 'scholar', $data ) && ! empty ( $data ['scholar'] )) ? $data ['scholar'] : NULL,
				'job' => (array_key_exists ( 'job', $data ) && ! empty ( $data ['job'] )) ? $data ['job'] : NULL,
				'message' => (array_key_exists ( 'message', $data ) && ! empty ( $data ['message'] )) ? $data ['message'] : NULL,
				'favorite' => (array_key_exists ( 'favorite', $data ) && ! empty ( $data ['favorite'] )) ? $data ['favorite'] : NULL,
				'ideal' => (array_key_exists ( 'ideal', $data ) && ! empty ( $data ['ideal'] )) ? $data ['ideal'] : NULL,
				
				'main' => (array_key_exists ( 'main', $data ) && ! empty ( $data ['main'] )) ? $data ['main'] : NULL,
				'sub1' => (array_key_exists ( 'sub1', $data ) && ! empty ( $data ['sub1'] )) ? $data ['sub1'] : NULL,
				'sub2' => (array_key_exists ( 'sub2', $data ) && ! empty ( $data ['sub2'] )) ? $data ['sub2'] : NULL,
				'sub3' => (array_key_exists ( 'sub3', $data ) && ! empty ( $data ['sub3'] )) ? $data ['sub3'] : NULL,
				
				'updated_at' => date ( 'Y-m-d H:i:s' ),
				'updated_by' => $data ['userid'] 
		);
		
		$this->db->where ( 'id', $data ['id'] );
		$query = $this->db->update ( 'user', $values );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		return $values;
	}
	function update($data) {
		if (! array_key_exists ( 'id', $data ) || empty ( $data ['id'] )) {
			throw new Exception ( "id is a required field", 1001 );
		}
		
		$values = array (
				'userid' => $data ['userid'],
				'phone_no' => (array_key_exists ( 'phone_no', $data ) && ! empty ( $data ['phone_no'] )) ? $data ['phone_no'] : NULL,
				'phone_confirm' => (array_key_exists ( 'phone_confirm', $data ) && ! empty ( $data ['phone_confirm'] )) ? $data ['phone_confirm'] : NULL,
				'sms' => (array_key_exists ( 'sms', $data ) && ! empty ( $data ['sms'] )) ? $data ['sms'] : NULL,
				'message' => (array_key_exists ( 'message', $data ) && ! empty ( $data ['message'] )) ? $data ['message'] : NULL,
				'updated_at' => date ( 'Y-m-d H:i:s' ),
				'updated_by' => $data ['userid'] 
		);
		
		$this->db->where ( 'id', $data ['id'] );
		$query = $this->db->update ( 'user', $values );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		return $values;
	}
	function changePasswd($data) {
		if (! array_key_exists ( 'id', $data ) || empty ( $data ['id'] )) {
			throw new Exception ( "id is a required field", 1001 );
		}
		$data ['passwd'] = $data ['passwd1'];
		
		$values = array (
				'passwd' => $data ['passwd'] 
		);
		// 'passwd' => md5 ( $data ['passwd'] ),
		$this->db->where ( 'id', $data ['id'] );
		$query = $this->db->update ( 'user', $values );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		return $values;
	}
	function getData($userid) {
		$sql = "SELECT * FROM tzchat.USER";
		// if ($limit) {
		// $sql .= " LIMIT $limit";
		// }
		
		if (! empty ( $userid )) {
			$sql .= " WHERE USERID = " . $userid;
		}
		
		$query = $this->db->query ( $sql );
		
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		
		$return = array ();
		foreach ( $query->result_array () as $row ) {
			$return [$row ['USERID']] = $row;
		}
		return $return;
	}
	function updatePoint($data) {
		if (! array_key_exists ( 'userid', $data ) || empty ( $data ['userid'] )) {
			throw new Exception ( "userid is a required field", 1001 );
		}
		
		$values = array (
				'point' => (array_key_exists ( 'point', $data ) && ! empty ( $data ['point'] )) ? ( int ) $data ['point'] : NULL,
				'updated_at' => date ( 'Y-m-d H:i:s' ),
				'updated_by' => $data ['userid'] 
		);
		if (array_key_exists ( 'ticket_type', $data ) || ! empty ( $data ['ticket_type'] )) {
			$values ['ticket_type'] = $data ['ticket_type'];
		}
		if (array_key_exists ( 'ticket_expired', $data ) || ! empty ( $data ['ticket_expired'] )) {
			$values ['ticket_expired'] = $data ['ticket_expired'];
		}
		
		$this->db->where ( 'userid', $data ['userid'] );
		$query = $this->db->update ( 'user', $values );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		return $data;
	}
	function changePoint($data, $type) {
		if (! array_key_exists ( 'userid', $data ) || empty ( $data ['userid'] )) {
			throw new Exception ( "userid is a required field", 1001 );
		}
		
		$user = $this->get ( array (
				'userid' => $data ['userid'] 
		) );
		$ori_point = $user ['point'];
		if ($type == 'plus') {
			$point = $ori_point + $data ['point'];
		} else if ($type == 'minus') {
			$point = $ori_point - $data ['point'];
		}
		$data ['point'] = $point;
		
		$this->db->where ( 'userid', $data ['userid'] );
		$query = $this->db->update ( 'user', $data );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		return $data;
	}
}
?>