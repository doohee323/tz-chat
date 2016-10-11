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
-- Table structure for table `pay`
--

DROP TABLE IF EXISTS `pay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pay` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pay_type` varchar(10) DEFAULT NULL,
  `item_type` varchar(10) DEFAULT NULL,
  `ticket_type` varchar(10) DEFAULT NULL,
  `point` int(20) NOT NULL,
  `status` varchar(10) DEFAULT NULL,
  `ticket_expired` datetime DEFAULT NULL,
  `partner_yn` varchar(20) DEFAULT NULL,
  `partner_id` varchar(20) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(20) NOT NULL,
  `created_ip` varchar(45) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pay`
--

LOCK TABLES `pay` WRITE;
/*!40000 ALTER TABLE `pay` DISABLE KEYS */;
INSERT INTO `pay` VALUES (38,'카드결재','30일 정기권','silver',1010,'','2016-10-09 06:20:44','n','','2016-10-06 06:20:44','doohee323','192.168.82.1','2016-10-10 06:18:27',''),(39,'폰결재','100포인트','silver',1100,NULL,NULL,NULL,NULL,'2016-10-06 06:20:59','doohee323','192.168.82.1','2016-10-06 06:20:59',''),(40,'카드결재','500포인트','silver',1600,NULL,NULL,NULL,NULL,'2016-10-06 06:21:16','doohee323','192.168.82.1','2016-10-06 06:21:16',''),(41,'폰결재','100포인트','silver',1200,NULL,NULL,NULL,NULL,'2016-10-06 06:23:51','doohee323','192.168.82.1','2016-10-06 06:23:51',''),(42,'무통장입금',NULL,NULL,1900,NULL,NULL,NULL,NULL,'2016-10-06 06:24:05','doohee323','192.168.82.1','2016-10-06 06:24:05',''),(43,'카드결재','30일 정기권','silver',1000,NULL,'2016-10-09 06:27:05',NULL,NULL,'2016-10-06 06:27:05','doohee323','192.168.82.1','2016-10-06 06:27:05',''),(44,'무통장입금','silver 정기권','silver',2000,NULL,'2016-10-09 06:27:10',NULL,NULL,'2016-10-06 06:27:10','doohee323','192.168.82.1','2016-10-06 06:27:10',''),(45,'카드결재','30일 정기권','silver',1000,NULL,'2016-10-09 06:20:44',NULL,NULL,'2016-10-07 07:20:44','doohee323','192.168.82.1','2016-10-06 06:20:44',''),(46,'폰결재','100포인트','silver',1100,NULL,NULL,NULL,NULL,'2016-10-07 07:20:44','doohee323','192.168.82.1','2016-10-06 06:20:59',''),(47,'카드결재','500포인트','silver',1600,NULL,NULL,NULL,NULL,'2016-10-07 07:20:44','doohee323','192.168.82.1','2016-10-06 06:21:16',''),(48,'폰결재','100포인트','silver',1200,NULL,NULL,NULL,NULL,'2016-10-07 07:20:44','doohee323','192.168.82.1','2016-10-06 06:23:51',''),(49,'무통장입금',NULL,NULL,1900,NULL,NULL,NULL,NULL,'2016-10-07 07:20:44','doohee323','192.168.82.1','2016-10-06 06:24:05',''),(50,'카드결재','30일 정기권','silver',1000,NULL,'2016-10-09 06:27:05',NULL,NULL,'2016-10-07 07:20:44','doohee323','192.168.82.1','2016-10-06 06:27:05',''),(51,'무통장입금','silver 정기권','silver',2000,NULL,'2016-10-09 06:27:10',NULL,NULL,'2016-10-07 07:20:44','doohee323','192.168.82.1','2016-10-06 06:27:10',''),(52,'폰결재','100포인트','silver',2100,NULL,NULL,NULL,NULL,'2016-10-08 03:08:16','doohee323','192.168.82.1','2016-10-08 03:08:16',''),(53,'무통장입금','500포인트','silver',2600,NULL,NULL,NULL,NULL,'2016-10-08 03:08:34','doohee323','192.168.82.1','2016-10-08 03:08:34','');
/*!40000 ALTER TABLE `pay` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-10 21:16:28
