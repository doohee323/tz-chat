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
-- Table structure for table `agent`
--

DROP TABLE IF EXISTS `agent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `main` varchar(100) DEFAULT NULL,
  `agentType` varchar(45) DEFAULT NULL,
  `parttime` varchar(45) DEFAULT NULL,
  `region1` varchar(45) DEFAULT NULL,
  `region2` varchar(45) DEFAULT NULL,
  `detail` varchar(2000) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(20) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_unique` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agent`
--

LOCK TABLES `agent` WRITE;
/*!40000 ALTER TABLE `agent` DISABLE KEYS */;
INSERT INTO `agent` VALUES (1,'a1','http://192.168.82.170/uploads/php7cgnay.jpg','유형1',NULL,'서울특별시','강남','addd1','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(2,'a2',NULL,'유형1',NULL,'서울특별시','강남','addd2','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(3,'a3',NULL,'유형1',NULL,'서울특별시','강남','addd3','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(4,'a4',NULL,'유형1',NULL,'서울특별시','강남','addd4','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(5,'a5',NULL,'유형1',NULL,'서울특별시','강북','addd5','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(6,'a6',NULL,'유형2',NULL,'서울특별시','강북','addd6','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(7,'a7',NULL,'유형2',NULL,'서울특별시','강북','addd7','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(8,'a8',NULL,'유형2',NULL,'서울특별시','강북','addd8','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(9,'a9',NULL,'유형2',NULL,'서울특별시','강북','addd9','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(10,'a10',NULL,'유형2',NULL,'인천특별시','동인천','addd10','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(11,'a11',NULL,'유형2',NULL,'인천특별시','동인천','addd11','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(12,'a12',NULL,'유형2',NULL,'인천특별시','동인천','addd12','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(13,'a13',NULL,'유형2',NULL,'인천특별시','동인천','addd13','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(14,'a14',NULL,'유형2',NULL,'인천특별시','동인천','addd14','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(15,'a15',NULL,'유형2',NULL,'인천특별시','동인천','addd15','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(16,'a16',NULL,'유형3',NULL,'인천특별시','동인천','addd16','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(17,'a17',NULL,'유형3',NULL,'인천특별시','동인천','addd17','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(18,'a18',NULL,'유형3',NULL,'인천특별시','동인천','addd18','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(19,'a19',NULL,'유형3',NULL,'인천특별시','동인천','addd19','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(20,'a20',NULL,'유형3',NULL,'인천특별시','동인천','addd20','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(21,'a21',NULL,'유형3',NULL,'인천특별시','서인천','addd21','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(22,'a22',NULL,'유형3',NULL,'인천특별시','서인천','addd22','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(23,'a23',NULL,'유형3',NULL,'인천특별시','서인천','addd23','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(24,'a24',NULL,'유형3',NULL,'인천특별시','서인천','addd24','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(56,'aaaa',NULL,NULL,NULL,'인천특별시','서인천','addd','2016-09-18 23:18:54','doohee323','2016-09-18 23:18:54','doohee323'),(57,'aaaa',NULL,NULL,NULL,'해외','r1','addd','2016-09-19 20:48:53','doohee323','2016-09-19 20:48:53','doohee323'),(58,'111111111',NULL,NULL,NULL,'서울특별시','강남구','addd','2016-09-19 20:49:36','doohee323','2016-09-19 20:49:36','doohee323'),(59,'2222222',NULL,NULL,NULL,'서울특별시','강남구','addd','2016-09-19 20:52:15','doohee323','2016-09-19 20:52:15','doohee323'),(60,'3333',NULL,NULL,NULL,'서울특별시','강남구','addd','2016-09-19 20:54:27','doohee323','2016-09-19 20:54:27','doohee323'),(61,'33333',NULL,NULL,NULL,'서울특별시','강남구','addd','2016-09-19 20:54:41','doohee323','2016-09-19 20:54:41','doohee323'),(62,'55555','http://192.168.82.170/uploads/php7cgnay.jpg',NULL,NULL,'서울특별시','강남구','addd','2016-09-19 20:55:49','doohee323','2016-09-19 20:55:49','doohee323'),(63,'aaaa',NULL,NULL,NULL,'서울특별시','강남구','addd','2016-09-19 22:56:45','doohee323','2016-09-19 22:56:45','doohee323'),(64,'aaaa',NULL,NULL,NULL,'서울특별시','강남구','adddaaa','2016-09-19 23:03:44','doohee323','2016-09-19 23:03:44','doohee323'),(65,'aaaa',NULL,NULL,NULL,'서울특별시','강남구','adddsss','2016-09-19 23:05:03','doohee323','2016-09-19 23:05:03','doohee323'),(66,'aaaa',NULL,NULL,NULL,'서울특별시','강남구','adddq','2016-09-19 23:08:02','doohee323','2016-09-19 23:08:02','doohee323'),(67,'aaaa','http://192.168.82.170/uploads/php1h9cjh.jpg',NULL,NULL,'서울특별시','강남구','adddq','2016-09-19 23:08:07','doohee323','2016-09-19 23:08:07','doohee323'),(68,'aaaa','http://192.168.82.170/uploads/phpyruqel.jpg',NULL,NULL,'서울특별시','강남구','addd','2016-09-20 17:05:58','doohee323','2016-09-20 17:05:58','doohee323'),(69,'aaaa','http://192.168.82.170/uploads/phpyruqel.jpg','유형1','50,000원','서울특별시','강남구','addd','2016-09-20 17:09:26','doohee323','2016-09-20 17:09:26','doohee323'),(70,'sdfsdf','http://192.168.82.170/uploads/phpnsk9zu.jpg','유형3','200,000원','강원도','서대문구','asasfdasdf','2016-09-27 20:29:22','doosee323','2016-09-27 20:29:22','doosee323'),(71,'sadfasdfsdafsadfsdf','http://192.168.82.170/uploads/phpm0m2yi.jpg','유형2','100,000원','대전광역시','서대문구','sdfsadf','2016-09-29 05:19:49','doosee323','2016-09-29 05:19:49','doosee323'),(72,'sadfasdfsdafsadfsdf','http://192.168.82.170/uploads/phpm0m2yi.jpg','유형2','100,000원','대전광역시','서대문구','sdfsadf','2016-09-29 05:21:23','doosee323','2016-09-29 05:21:23','doosee323'),(73,'sadfasdfsdafsadfsdf','http://192.168.82.170/uploads/phpm0m2yi.jpg','유형2','100,000원','대전광역시','서대문구','sdfsadf','2016-09-29 05:21:33','doosee323','2016-09-29 05:21:33','doosee323'),(74,'sadfasdfsdafsadfsdf','http://192.168.82.170/uploads/phpm0m2yi.jpg','유형2','100,000원','대전광역시','서대문구','sdfsadf','2016-09-29 05:21:56','doosee323','2016-09-29 05:21:56','doosee323'),(75,'sadfasdfsdafsadfsdf','http://192.168.82.170/uploads/phpm0m2yi.jpg','유형2','100,000원','대전광역시','서대문구','sdfsadf','2016-09-29 05:22:24','doosee323','2016-09-29 05:22:24','doosee323'),(76,'sadfasdfsdafsadfsdf','http://192.168.82.170/uploads/phpm0m2yi.jpg','유형2','100,000원','대전광역시','서대문구','sdfsadf','2016-09-29 05:23:13','doosee323','2016-09-29 05:23:13','doosee323'),(77,'sadfasdfsdafsadfsdf','http://192.168.82.170/uploads/phpm0m2yi.jpg','유형2','100,000원','대전광역시','서대문구','sdfsadf','2016-09-29 05:23:26','doosee323','2016-09-29 05:23:26','doosee323'),(78,'222','images/user-women.png','유형2','50,000원','서울특별시','서대문구','12213','2016-09-29 05:24:46','doosee323','2016-09-29 05:24:46','doosee323'),(79,'111','images/user-women.png','유형2','200,000원','서울특별시','종로구','111','2016-09-29 06:48:46','doosee323','2016-09-29 06:48:46','doosee323'),(80,'22223','images/user-women.png','유형2','100,000원','대전광역시','은평구','123123','2016-09-29 06:49:16','doosee323','2016-09-29 06:49:16','doosee323'),(81,'sdfsdaf','images/user-women.png','유형2','200,000원','대전광역시','종로구','sdfsadf','2016-09-29 06:50:23','doosee323','2016-09-29 06:50:23','doosee323'),(82,'dsfsdf','http://192.168.82.170/uploads/phppjlhse.jpg','유형2','100,000원','서울특별시','종로구','sdf','2016-09-29 07:28:04','doohee323','2016-09-29 07:28:04','doohee323'),(83,'11','images/user-women.png','유형1','100,000원','강원도','종로구','1','2016-09-30 02:21:06','doosee323','2016-09-30 02:21:06','doosee323'),(84,'1',NULL,'유형1','100,000원','서울특별시','종로구','1','2016-10-02 15:43:04','doohee323','2016-10-02 15:43:04','doohee323'),(85,'3','http://192.168.82.170/uploads/phpiewd7a.jpg','유형2','100,000원','서울특별시','종로구','3','2016-10-02 15:43:25','doohee323','2016-10-02 15:43:25','doohee323'),(86,'제목제목',NULL,'유형2','100,000원','서울특별시','종로구','상세내용상세내용상세내용','2016-10-03 00:02:58','doosee323','2016-10-03 00:02:58','doosee323');
/*!40000 ALTER TABLE `agent` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-10 21:16:25
