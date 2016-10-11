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
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roomid` varchar(45) DEFAULT NULL,
  `source` varchar(20) DEFAULT NULL,
  `target` varchar(20) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `detail` varchar(100) DEFAULT NULL,
  `reject` varchar(45) DEFAULT NULL,
  `reserve` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(20) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_unique` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=351 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (326,'doosee323_doohee323','doosee323','doohee323','closed','1',NULL,NULL,'2016-10-02 14:53:29','doosee323','2016-10-02 14:58:14','doosee323'),(327,'doosee323_doohee323','doosee323','doohee323','closed','111',NULL,NULL,'2016-10-02 14:59:00','doosee323','2016-10-02 14:59:23','doosee323'),(328,'doosee323_doohee323','doosee323','doohee323','closed','11',NULL,NULL,'2016-10-02 14:59:46','doosee323','2016-10-02 15:00:00','doosee323'),(329,'doosee323_doohee323','doosee323','doohee323','closed','1',NULL,NULL,'2016-10-02 15:02:49','doosee323','2016-10-02 15:03:35','doosee323'),(330,'doosee323_doohee323','doosee323','doohee323','closed','1',NULL,NULL,'2016-10-02 15:03:54','doosee323','2016-10-02 15:04:13','doohee323'),(331,'doosee323_doohee323','doosee323','doohee323','closed','1',NULL,NULL,'2016-10-02 15:04:34','doosee323','2016-10-02 15:06:12','doohee323'),(332,'doosee323_doohee323','doosee323','doohee323','closed','1',NULL,NULL,'2016-10-02 15:06:22','doosee323','2016-10-02 15:11:03','doohee323'),(333,'doosee323_doohee323','doosee323','doohee323','reject','111',NULL,NULL,'2016-10-02 15:11:09','doosee323','2016-10-02 15:11:12','doohee323'),(334,'doosee323_doohee323','doosee323','doohee323','reject','1',NULL,NULL,'2016-10-02 15:11:46','doosee323','2016-10-02 15:12:11','doohee323'),(335,'doosee323_doohee323','doosee323','doohee323','closed','1',NULL,NULL,'2016-10-02 15:12:24','doosee323','2016-10-02 15:14:35','doosee323'),(336,'doosee323_doohee323','doosee323','doohee323','closed','1',NULL,NULL,'2016-10-02 15:14:57','doosee323','2016-10-02 15:15:27','doosee323'),(337,'doosee323_doohee323','doosee323','doohee323','closed','1',NULL,NULL,'2016-10-02 15:15:33','doosee323','2016-10-02 15:15:44','doosee323'),(338,'doosee323_doohee323','doosee323','doohee323','reject','1',NULL,NULL,'2016-10-02 15:16:41','doosee323','2016-10-02 15:16:52','doohee323'),(339,'doosee323_doohee323','doosee323','doohee323','closed','1',NULL,NULL,'2016-10-02 15:17:02','doosee323','2016-10-02 15:17:32','doohee323'),(340,'doosee323_doohee323','doosee323','doohee323','reject','111',NULL,NULL,'2016-10-02 15:17:44','doosee323','2016-10-02 15:19:21','doohee323'),(341,'doosee323_doohee323','doosee323','doohee323','reject','sdfsdf',NULL,NULL,'2016-10-02 15:27:16','doosee323','2016-10-02 15:27:21','doohee323'),(342,'doosee323_doohee323','doosee323','doohee323','reject','1',NULL,NULL,'2016-10-02 15:28:33','doosee323','2016-10-02 15:28:36','doohee323'),(343,'doosee323_doohee323','doosee323','doohee323','closed','222',NULL,NULL,'2016-10-02 15:28:42','doosee323','2016-10-02 15:28:49','doosee323'),(344,'doosee323_doohee323','doohee323','doosee323','closed','111',NULL,NULL,'2016-10-02 15:29:06','doohee323','2016-10-02 15:35:11','doohee323'),(345,'doosee323_doohee323','doohee323','doosee323','closed','111',NULL,NULL,'2016-10-02 15:31:29','doohee323','2016-10-06 06:23:35','doohee323'),(346,'doosee323_doohee323','doosee323','doohee323','closed','111',NULL,NULL,'2016-10-02 23:30:10','doosee323','2016-10-03 01:04:35','doohee323'),(347,'doosee323_doohee323','doohee323','doosee323','closed','1',NULL,NULL,'2016-10-03 01:06:27','doohee323','2016-10-03 01:06:44','doosee323'),(348,'doosee323_doohee323','doohee323','doosee323','closed','1',NULL,NULL,'2016-10-03 04:37:00','doohee323','2016-10-03 04:40:15','doohee323'),(349,'doosee323_doohee323','doohee323','doosee323','closed','111',NULL,NULL,'2016-10-04 17:31:59','doohee323','2016-10-06 06:23:40','doohee323'),(350,'doosee323_doohee323','doohee323','doosee323','closed','111',NULL,NULL,'2016-10-06 06:24:05','doohee323','2016-10-06 06:24:28','doohee323');
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
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
