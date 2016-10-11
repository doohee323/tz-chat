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
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `roomid` varchar(50) DEFAULT NULL,
  `content` longtext,
  `reserve` int(11) DEFAULT NULL,
  `man_ip` varchar(45) DEFAULT NULL,
  `woman_ip` varchar(45) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(20) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (326,'doosee323_doohee323','[{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phppjlhse.jpg\",\"text\":\"IxA\",\"clock\":\"\\uc624\\uc804 7\\uc2dc 54\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phppjlhse.jpg\",\"text\":\"IxA\",\"clock\":\"\\uc624\\uc804 7\\uc2dc 54\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phppjlhse.jpg\",\"text\":\"IxA\",\"clock\":\"\\uc624\\uc804 7\\uc2dc 54\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phppjlhse.jpg\",\"text\":\"IxA\",\"clock\":\"\\uc624\\uc804 7\\uc2dc 54\\ubd84\"},{\"userid\":\"doosee323\",\"image\":\"http:\\/\\/localhost:9009\\/images\\/user-women.png\",\"text\":\"IxA\",\"clock\":\"\\uc624\\uc804 7\\uc2dc 55\\ubd84\"},{\"userid\":\"doosee323\",\"image\":\"http:\\/\\/localhost:9009\\/images\\/user-women.png\",\"text\":\"IxA\",\"clock\":\"\\uc624\\uc804 7\\uc2dc 55\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phppjlhse.jpg\",\"text\":\"IxA\",\"clock\":\"\\uc624\\uc804 7\\uc2dc 55\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phppjlhse.jpg\",\"text\":\"IxA\",\"clock\":\"\\uc624\\uc804 7\\uc2dc 55\\ubd84\"}]',100,'1','2','2016-10-02 14:56:06','doohee323','2016-10-02 14:56:06','doohee323'),(327,'doosee323_doohee323','[{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phppjlhse.jpg\",\"text\":\"IxA\",\"clock\":\"\\uc624\\uc804 7\\uc2dc 59\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phppjlhse.jpg\",\"text\":\"IxA\",\"clock\":\"\\uc624\\uc804 7\\uc2dc 59\\ubd84\"}]',100,'1','2','2016-10-02 14:59:39','doohee323','2016-10-02 14:59:39','doohee323'),(328,'doosee323_doohee323','[{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/localhost:9009\\/\",\"text\":\"IxA\",\"clock\":\"\\uc624\\uc804 7\\uc2dc 59\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/localhost:9009\\/\",\"text\":\"IxA\",\"clock\":\"\\uc624\\uc804 7\\uc2dc 59\\ubd84\"}]',100,'1','2','2016-10-02 15:00:50','doosee323','2016-10-02 15:00:50','doosee323'),(339,'doosee323_doohee323','[{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/localhost:9009\\/\",\"text\":\"Iwo\",\"clock\":\"\\uc624\\uc804 8\\uc2dc 17\\ubd84\"}]',50,'1','2','2016-10-02 15:17:32','doosee323','2016-10-02 15:17:32','doosee323'),(344,'doosee323_doohee323','[{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phppjlhse.jpg\",\"text\":\"Iwo\",\"clock\":\"\\uc624\\uc804 8\\uc2dc 29\\ubd84\"},{\"userid\":\"doosee323\",\"image\":\"images\\/user-women.png\",\"text\":\"Ewo\",\"clock\":\"\\uc624\\uc804 8\\uc2dc 29\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phppjlhse.jpg\",\"text\":\"Mw5A\",\"clock\":\"\\uc624\\uc804 8\\uc2dc 29\\ubd84\"},{\"userid\":\"doosee323\",\"image\":\"images\\/user-women.png\",\"text\":\"Mwo\",\"clock\":\"\\uc624\\uc804 8\\uc2dc 29\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phppjlhse.jpg\",\"text\":\"Cw5A\",\"clock\":\"\\uc624\\uc804 8\\uc2dc 29\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phppjlhse.jpg\",\"text\":\"EzDMYFgUyA\",\"clock\":\"\\uc624\\uc804 8\\uc2dc 29\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phppjlhse.jpg\",\"text\":\"Iwo\",\"clock\":\"\\uc624\\uc804 8\\uc2dc 31\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phppjlhse.jpg\",\"text\":\"Ew5A\",\"clock\":\"\\uc624\\uc804 8\\uc2dc 31\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phppjlhse.jpg\",\"text\":\"MxA\",\"clock\":\"\\uc624\\uc804 8\\uc2dc 32\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phppjlhse.jpg\",\"text\":\"MxA\",\"clock\":\"\\uc624\\uc804 8\\uc2dc 32\\ubd84\"}]',300,'1','2','2016-10-02 15:32:29','doosee323','2016-10-02 15:32:29','doosee323'),(345,'doosee323_doohee323','[{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phpsj776s.jpg\",\"text\":\"Iwo\",\"clock\":\"\\uc624\\ud6c4 3\\uc2dc 20\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phpsj776s.jpg\",\"text\":\"IxA\",\"clock\":\"\\uc624\\ud6c4 11\\uc2dc 21\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phpsj776s.jpg\",\"text\":\"ExA\",\"clock\":\"\\uc624\\ud6c4 11\\uc2dc 21\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phpsj776s.jpg\",\"text\":\"MxA\",\"clock\":\"\\uc624\\ud6c4 11\\uc2dc 21\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phpsj776s.jpg\",\"text\":\"CxA\",\"clock\":\"\\uc624\\ud6c4 11\\uc2dc 21\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phpsj776s.jpg\",\"text\":\"KxA\",\"clock\":\"\\uc624\\ud6c4 11\\uc2dc 21\\ubd84\"}]',NULL,'192.168.82.1',NULL,'2016-10-06 06:23:29','doohee323','2016-10-06 06:23:29','doohee323'),(346,'doosee323_doohee323','[{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phpsj776s.jpg\",\"text\":\"IxA\",\"clock\":\"\\uc624\\ud6c4 4\\uc2dc 30\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phpsj776s.jpg\",\"text\":\"IxA\",\"clock\":\"\\uc624\\ud6c4 4\\uc2dc 30\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phpsj776s.jpg\",\"text\":\"IxA\",\"clock\":\"\\uc624\\ud6c4 4\\uc2dc 30\\ubd84\"},{\"userid\":\"doosee323\",\"image\":\"http:\\/\\/localhost:9009\\/images\\/user-women.png\",\"text\":\"ExA\",\"clock\":\"\\uc624\\ud6c4 4\\uc2dc 30\\ubd84\"}]',100,'1','2','2016-10-02 23:36:33','doohee323','2016-10-02 23:36:33','doohee323'),(347,'doosee323_doohee323','[{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phpsj776s.jpg\",\"text\":\"IxA\",\"clock\":\"\\uc624\\ud6c4 6\\uc2dc 6\\ubd84\"}]',50,'1','2','2016-10-03 01:06:37','doosee323','2016-10-03 01:06:37','doosee323'),(349,'doosee323_doohee323','[{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phpsj776s.jpg\",\"text\":\"Iwo\",\"clock\":\"\\uc624\\ud6c4 3\\uc2dc 20\\ubd84\"}]',NULL,'1','2','2016-10-05 22:28:28','doohee323','2016-10-05 22:28:28','doohee323'),(350,'doosee323_doohee323','[{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phpsj776s.jpg\",\"text\":\"IxA\",\"clock\":\"\\uc624\\ud6c4 11\\uc2dc 24\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phpsj776s.jpg\",\"text\":\"IxA\",\"clock\":\"\\uc624\\ud6c4 11\\uc2dc 24\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phpsj776s.jpg\",\"text\":\"IxA\",\"clock\":\"\\uc624\\ud6c4 11\\uc2dc 24\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phpsj776s.jpg\",\"text\":\"ExA\",\"clock\":\"\\uc624\\ud6c4 11\\uc2dc 24\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phpsj776s.jpg\",\"text\":\"ExA\",\"clock\":\"\\uc624\\ud6c4 11\\uc2dc 24\\ubd84\"},{\"userid\":\"doohee323\",\"image\":\"http:\\/\\/192.168.82.170\\/uploads\\/phpsj776s.jpg\",\"text\":\"ExA\",\"clock\":\"\\uc624\\ud6c4 11\\uc2dc 24\\ubd84\"}]',NULL,'192.168.82.1',NULL,'2016-10-06 06:24:28','doohee323','2016-10-06 06:24:28','doohee323');
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-10 21:16:30
