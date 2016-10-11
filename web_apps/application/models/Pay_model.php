<?php
class Pay_model extends CI_Model {
	public function __construct() {
		parent::__construct ();
	}
	function paylist($data) {
		$sql = "SELECT *";
		$sql = $sql . " FROM tzchat.pay A";
		$sql = $sql . " limit 100";
		
		$query = $this->db->query ( $sql );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		return $query->result_array ();
	}
	function add($data) {
		$result1 = array ();
		
		if (array_key_exists ( 'item_type', $data ) && strrpos ( $data ['item_type'], "정기권" ) > - 1) {
			if (array_key_exists ( 'ticket_type', $data )) {
				$this->load->model ( 'ticket_model' );
				$result1 = $this->ticket_model->get ( array (
						'ticket_type' => $data ['ticket_type'] 
				) );
				$data ['point'] = $result1 ['point'];
			}
		}
		
		if (array_key_exists ( 'point', $data )) {
			$this->load->model ( 'user_model' );
			$user = $this->user_model->get ( $data );
			$point = $user ['point'];
			$point = $data ['point'] + $point;
			$data ['point'] = $point;
			
			if (array_key_exists ( 'period', $result1 )) {
				$period = $result1 ['period'];
				$date = new DateTime ();
				date_add ( $date, date_interval_create_from_date_string ( $period . ' days' ) );
				$data ['ticket_expired'] = date_format ( $date, 'Y-m-d H:i:s' );
			}
			
			$query = $this->user_model->updatePoint ( $data );
			if (false === $query) {
				$error = $this->db->error ();
				throw new Exception ( $error ['message'], 500 );
			}
			$data ['point'] = $query ['point'];
		}
		
		$values = array (
				'pay_type' => (array_key_exists ( 'pay_type', $data ) && ! empty ( $data ['pay_type'] )) ? $data ['pay_type'] : NULL,
				'item_type' => (array_key_exists ( 'item_type', $data ) && ! empty ( $data ['item_type'] )) ? $data ['item_type'] : NULL,
				'ticket_type' => (array_key_exists ( 'ticket_type', $data ) && ! empty ( $data ['ticket_type'] )) ? $data ['ticket_type'] : NULL,
				'ticket_expired' => (array_key_exists ( 'ticket_expired', $data ) && ! empty ( $data ['ticket_expired'] )) ? $data ['ticket_expired'] : NULL,
				'point' => (array_key_exists ( 'point', $data ) && ! empty ( $data ['point'] )) ? ( int ) $data ['point'] : NULL,
				'status' => (array_key_exists ( 'status', $data ) && ! empty ( $data ['status'] )) ? $data ['status'] : NULL,
				'partner_yn' => (array_key_exists ( 'partner_yn', $data ) && ! empty ( $data ['partner_yn'] )) ? $data ['partner_yn'] : NULL,
				'partner_id' => (array_key_exists ( 'partner_id', $data ) && ! empty ( $data ['partner_id'] )) ? $data ['partner_id'] : NULL,
				'created_at' => date ( 'Y-m-d H:i:s' ),
				'created_ip' => $_SERVER ['REMOTE_ADDR'],
				'created_by' => $data ['userid'] 
		);
		
		$query = $this->db->insert ( 'pay', $values );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		$values ['id'] = $this->db->insert_id ();
		return $values;
	}
	function update($data) {
		if (! array_key_exists ( 'title', $data ) || empty ( $data ['title'] )) {
			throw new Exception ( "title is a required field", 1001 );
		}
		
		$values = array (
				'pay_type' => (array_key_exists ( 'pay_type', $data ) && ! empty ( $data ['pay_type'] )) ? $data ['pay_type'] : NULL,
				'item_type' => (array_key_exists ( 'item_type', $data ) && ! empty ( $data ['item_type'] )) ? $data ['item_type'] : NULL,
				'ticket_type' => (array_key_exists ( 'ticket_type', $data ) && ! empty ( $data ['ticket_type'] )) ? $data ['ticket_type'] : NULL,
				'point' => (array_key_exists ( 'point', $data ) && ! empty ( $data ['point'] )) ? ( int ) $data ['point'] : NULL,
				'status' => (array_key_exists ( 'status', $data ) && ! empty ( $data ['status'] )) ? $data ['status'] : NULL,
				'partner_yn' => (array_key_exists ( 'partner_yn', $data ) && ! empty ( $data ['partner_yn'] )) ? $data ['partner_yn'] : NULL,
				'partner_id' => (array_key_exists ( 'partner_id', $data ) && ! empty ( $data ['partner_id'] )) ? $data ['partner_id'] : NULL,
				'updated_at' => date ( 'Y-m-d H:i:s' ),
				'updated_by' => $data ['userid'] 
		);
		
		$this->db->where ( 'id', $data ['id'] );
		$query = $this->db->update ( 'pay', $values );
		if (false === $query) {
			$error = $this->db->error ();
			throw new Exception ( $error ['message'], 500 );
		}
		return $values;
	}
}
?>