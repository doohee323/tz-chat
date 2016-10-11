CREATE DATABASE  IF NOT EXISTS `tzchat` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `tzchat`;
-- MySQL dump 10.13  Distrib 5.6.13, for osx10.6 (i386)
--
-- Host: 192.168.82.170    Database: tzchat
-- ------------------------------------------------------
-- Server version	5.6.31-0ubuntu0.14.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(20) DEFAULT NULL,
  `passwd` varchar(100) DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `gender` varchar(10) NOT NULL,
  `age` int(3) NOT NULL,
  `email` varchar(50) NOT NULL,
  `region1` varchar(10) DEFAULT NULL,
  `region2` varchar(10) DEFAULT NULL,
  `meeting_type` varchar(50) DEFAULT NULL,
  `talk_style` varchar(50) DEFAULT NULL,
  `parttime` varchar(45) DEFAULT NULL,
  `agreement` varchar(10) NOT NULL,
  `privacy` varchar(10) NOT NULL,
  `main` varchar(100) NOT NULL,
  `sub1` varchar(100) NOT NULL,
  `sub2` varchar(100) NOT NULL,
  `sub3` varchar(100) NOT NULL,
  `keyword` varchar(100) NOT NULL,
  `height` int(3) NOT NULL,
  `weight` int(3) NOT NULL,
  `blood` varchar(2) NOT NULL,
  `scholar` varchar(20) NOT NULL,
  `job` varchar(50) NOT NULL,
  `favorite` varchar(100) NOT NULL,
  `ideal` varchar(100) NOT NULL,
  `phone_no` varchar(20) NOT NULL,
  `phone_confirm` varchar(3) NOT NULL,
  `sms` varchar(3) NOT NULL,
  `message` varchar(200) NOT NULL,
  `point` int(20) NOT NULL,
  `ticket_type` varchar(10) DEFAULT NULL,
  `ticket_expired` datetime DEFAULT NULL,
  `partner_yn` varchar(20) DEFAULT NULL,
  `partner_id` varchar(20) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(20) NOT NULL,
  `created_ip` varchar(45) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(20) NOT NULL,
  `updated_ip` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_unique` (`id`),
  UNIQUE KEY `userid_UNIQUE` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (12,'doogee323','123qwe','듀이3','woman',14,'doohee323@naver.com','서울특별시','강남구',NULL,NULL,NULL,'','','http://192.168.82.170/uploads/php5x6nip.jpg','../images/profile-ex.png','../images/profile-ex.png','../images/profile-ex.png','',0,0,'','','','','','','','','bbbb',0,'','0000-00-00 00:00:00',NULL,NULL,'2016-09-21 22:09:57','doogee323',NULL,'2016-10-10 22:35:08','doogee323','192.168.82.1'),(26,'dootee323','123QWE','듀티','man',19,'doohee323@naver.com','서울특별시','강남구',NULL,NULL,NULL,'','','http://192.168.82.170/uploads/phpmbmdie.jpg','../images/profile-ex.png','../images/profile-ex.png','../images/profile-ex.png','',0,0,'','','','','','','','','',0,NULL,NULL,NULL,NULL,'2016-09-24 05:30:01','dootee323',NULL,'2016-09-24 05:30:52','dootee323',NULL),(31,'doosee323','123QWE','듀시','woman',15,'doohee323@naver.com','서울특별시','강남구',NULL,NULL,NULL,'','','http://192.168.82.170/uploads/phpnwnjwu.jpg','../images/profile-ex.png','../images/profile-ex.png','../images/profile-ex.png','',0,0,'O형','고졸','자영업','','','','','','',800,'','0000-00-00 00:00:00',NULL,NULL,'2016-09-26 17:33:44','doosee323',NULL,'2016-10-11 04:03:27','doosee323','192.168.82.1'),(32,'doowee323','123QWE','듀위','woman',15,'doohee323@naver.com','서울특별시','강남구',NULL,NULL,NULL,'','','images/user-women.png','','','','',0,0,'','','','','','','','','',0,'','0000-00-00 00:00:00',NULL,NULL,'2016-09-26 22:01:52','doowee323',NULL,'2016-10-10 22:43:28','doowee323','192.168.82.1'),(33,'doohee323','123QWE','듀이','man',0,'','서울특별시','강남구',NULL,NULL,NULL,'','','','','','','',0,0,'','','','','','01022469447','n','','',2,'silver',NULL,'n','','2016-10-10 04:23:04','doohee323',NULL,'2016-10-11 03:59:56','doohee323','192.168.82.1');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-10 21:16:27
