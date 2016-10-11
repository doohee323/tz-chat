<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Utils
{

  public function __construct()
  {
    $this->CI =& get_instance();
  }

  public static function session_exists()
  {
    $CI =& get_instance();
/*
    // CI 2.0.0 made $this->session private
    // this function fails for private properties in base classes (which is fixed in 5.3.3)
    if (!property_exists($this->CI, 'session'))
    {
      Utils::log_message(LOG_INFO, 'property_exists($CI, 'session') returned FALSE');
      return false;
    }
*/

    if (!@isset($CI->session))
    {
      Utils::log_message(LOG_DEBUG, 'isset($CI->session) returned FALSE');
      return false;
    }

    if (!@is_object($CI->session))
    {
      Utils::log_message(LOG_DEBUG, 'is_object($CI->session) returned FALSE');
      return false;
    }

    if (!@isset($CI->session->userdata))
    {
      Utils::log_message(LOG_DEBUG, 'isset($CI->session->userdata) returned FALSE');
      return false;
    }

    $user = $CI->session->userdata('user');

    if (empty($user))
    {
      Utils::log_message(LOG_DEBUG, "empty(userdata('user') returned TRUE");
      return false;
    }

    return true;
  }

  public static function curPageURL()
  {
    $pageURL = 'http';
    if (array_key_exists('HTTPS', $_SERVER) && $_SERVER["HTTPS"] == "on")
    {
      $pageURL .= "s";
    }
    $pageURL .= "://";
    $pageURL .= $_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"];
    return $pageURL;
  }

  public static function make_guid()
  {
    srand((double)microtime()*1000000);
    $r = rand() ;
    $u = uniqid(getmypid() . $r . (double)microtime()*1000000,1);
    $m = md5 ($u);
    return($m);
  }

  /**
   * Wrapper around codeignitor's log_message which adds class::function prefixes
   */
  public static function log_message($level, $message)
  {
    log_message($level, $message, false);
  }

  /**
   * Determines redis and scrapi ranges, rollups and bucket sizes
   */
  public static function get_params_from_range($params=null)
  {

    if (!is_array($params))
    {
      $params = $_REQUEST;
    }

    // default 1 day
    $range = array_key_exists('sRange', $params) ? $params['sRange'] : 'day';

    $return = array();
    switch ($range)
    {
      case 'hour':

        $hourType = array_key_exists('sHour', $params) ? $params['sHour'] : '2hours';
        switch ($hourType)
        {
          case '6hours':
            return array('start_time' => floor(strtotime('-6 hours')/300)*300,
                         'end_time'   => time());// data bucket size.  dup'd in redis config. converted to rollupXX for scrapi

          case '12hours':
            return array('start_time' => floor(strtotime('-12 hours')/300)*300,
                         'end_time'   => time());

          default:
          case '2hours':
            return array('start_time' => floor(strtotime('-2 hours')/300)*300,
                         'end_time'   => time());
        }

      case 'week':
        return array('start_time' => floor(strtotime('-1 week')/3600)*3600,
                     'end_time'   => time());

      case '2weeks':
        return array('start_time' => floor(strtotime('-2 weeks')/3600)*3600,
                     'end_time'   => time());

      case 'month':

        $monthType = array_key_exists('sMonth', $params) ? $params['sMonth'] : 'thismonth';
        switch ($monthType)
        {
          case 'lastmonth':
            return array('start_time' => mktime(0,0,0,date('n')-1,1,date('Y')),
                         'end_time'   => strtotime('-1 second',strtotime(date('m').'/01/'.date('Y').' 00:00:00')),
                        );

          case 'last30':
            return array('start_time' => floor(strtotime('-30 days')/3600)*3600,
                         'end_time'   => time());

          case 'last60':
            return array('start_time' => floor(strtotime('-60 days')/86400)*86400,
                         'end_time'   => time());

          default:
          case 'thismonth':
            return array('start_time' => mktime(0,0,0,date('n'),1,date('Y')),
                         'end_time'   => time());
        }

      case 'custom':
        $sStart = array_key_exists('sStart', $params) ? $params['sStart'] : date('Y-m-01');
        $sEnd   = array_key_exists('sEnd', $params)   ? $params['sEnd']   : date('Y-m-d');
        if (10 == strlen($sStart)) $sStart = $sStart . ' 00:00:00';
        if (10 == strlen($sEnd)) $sEnd = $sEnd . ' 23:59:59';

        return array('start_time' => strtotime($sStart),
                     'end_time'   => strtotime($sEnd));

      default:
      case 'day':
        return array('start_time' => floor(strtotime('-24 hours')/300)*300,
                     'end_time'   => time());
    }
  }

  public static function is_hostname($hostname)
  {
    $valid_hostname_regex = "^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$";
    return preg_match("/$valid_hostname_regex/", $hostname);
  }

  public static function is_valid_ip($ip)
  {
    return filter_var($ip, FILTER_VALIDATE_IP);
//    return $this->is_valid_ipv4($ip);
  }

  public static function parse_latitude_longitude($lat_long_string)
  {
    $regex = "^[+-]?\d+\.\d+, ?[+-]?\d+\.\d+$";
    //$regex = "^\s*-?\d{1,3}\.\d+,\s*\d{1,3}\.\d+\s*$";
    if (!preg_match("/$regex/", $lat_long_string))
    {
      return false;
    }
    $temp = explode(",", $lat_long_string);
    $lat = trim($temp[0]);
    $lon = trim($temp[1]);

    if (empty($lat) || empty($lon))
    {
      return false;
    }

    if (!is_numeric($lat) || !is_numeric($lon))
    {
      return false;
    }

    Utils::log_message(LOG_INFO, "'latitude' => $lat, 'longitude' => $lon");
    return array('latitude' => $lat, 'longitude' => $lon);
  }

  public static function set_php_memory_limit($newvalue)
  {
    // only set the memory limit if the current memory limit is less
    if (Utils::return_bytes(ini_get('memory_limit')) < Utils::return_bytes($newvalue))
    {
      Utils::log_message(LOG_NOTICE, "ini_set('memory_limit', '$newvalue')");
      ini_set('memory_limit', $newvalue);
    }
  }

  public static function return_bytes($val)
  {
    $val = trim($val);
    $last = strtolower($val[strlen($val)-1]);
    switch($last) {
        // The 'G' modifier is available since PHP 5.1.0
        case 'g':
            $val *= 1024;
        case 'm':
            $val *= 1024;
        case 'k':
            $val *= 1024;
    }
    return $val;
  }

  public static function addOrdinalNumberSuffix($num)
  {
    if (!in_array(($num % 100),array(11,12,13)))
    {
      switch ($num % 10)
      {
        // Handle 1st, 2nd, 3rd
        case 1:  return $num.'st';
        case 2:  return $num.'nd';
        case 3:  return $num.'rd';
      }
    }
    return $num.'th';
  }
}