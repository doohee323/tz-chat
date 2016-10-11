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
-- Table structure for table `talk`
--

DROP TABLE IF EXISTS `talk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `talk` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `main` varchar(100) DEFAULT NULL,
  `region1` varchar(45) DEFAULT NULL,
  `region2` varchar(45) DEFAULT NULL,
  `detail` varchar(2000) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(20) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_unique` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `talk`
--

LOCK TABLES `talk` WRITE;
/*!40000 ALTER TABLE `talk` DISABLE KEYS */;
INSERT INTO `talk` VALUES (28,'http://192.168.82.170/uploads/php7cgnay.jpg','서울','강남','addd1','2016-09-19 22:48:25','doohee323','2016-09-19 22:48:25','doohee323'),(29,'http://192.168.82.170/uploads/phprcfj4j.jpg','서울','강남','addd1','2016-09-19 22:56:19','doohee323','2016-09-19 22:56:19','doohee323'),(30,'http://192.168.82.170/uploads/phppjlhse.jpg','서울특별시','강남구','addd1','2016-09-27 14:44:51','doohee323','2016-09-27 14:44:51','doohee323'),(31,'http://192.168.82.170/uploads/phppjlhse.jpg','서울특별시','강남구','addd1','2016-09-27 16:05:44','doohee323','2016-09-27 16:05:44','doohee323'),(32,'http://192.168.82.170/uploads/phppjlhse.jpg','서울특별시','강남구','2222addd','2016-09-27 16:05:52','doohee323','2016-09-27 16:05:52','doohee323'),(33,'http://192.168.82.170/uploads/phpp8lbqq.jpg','서울특별시','강남구','addd1','2016-09-27 20:22:34','doosee323','2016-09-27 20:22:34','doosee323'),(34,'images/user-women.png','대전광역시','서구','sdfasd','2016-09-29 06:53:42','doosee323','2016-09-29 06:53:42','doosee323'),(35,'images/user-women.png','대전광역시','유성구','sdfasdf','2016-09-29 06:53:56','doosee323','2016-09-29 06:53:56','doosee323'),(36,'images/user-women.png','서울특별시','서대문구','sdf','2016-09-29 06:54:31','doosee323','2016-09-29 06:54:31','doosee323'),(37,'images/user-women.png','강원도','양양군','sdfdsf','2016-09-29 06:54:43','doosee323','2016-09-29 06:54:43','doosee323'),(38,'images/user-women.png','서울특별시','종로구','asdsda','2016-09-29 06:57:03','doosee323','2016-09-29 06:57:03','doosee323'),(39,'images/user-women.png','서울특별시','서대문구','sadsad','2016-09-29 06:57:22','doosee323','2016-09-29 06:57:22','doosee323'),(40,'http://192.168.82.170/uploads/phppjlhse.jpg','서울특별시','서대문구','sdfsdf','2016-09-29 07:28:27','doohee323','2016-09-29 07:28:27','doohee323'),(41,'http://192.168.82.170/uploads/phppjlhse.jpg','강원도','강릉시','1111','2016-09-30 02:17:40','doohee323','2016-09-30 02:17:40','doohee323'),(42,'http://192.168.82.170/uploads/phppjlhse.jpg','강원도','강릉시','1111','2016-09-30 02:18:16','doohee323','2016-09-30 02:18:16','doohee323'),(43,'http://192.168.82.170/uploads/phppjlhse.jpg','강원도','강릉시','1111','2016-09-30 02:18:21','doohee323','2016-09-30 02:18:21','doohee323'),(44,'http://192.168.82.170/uploads/phppjlhse.jpg','강원도','강릉시','1111','2016-09-30 02:18:35','doohee323','2016-09-30 02:18:35','doohee323'),(45,'http://192.168.82.170/uploads/phppjlhse.jpg','강원도','강릉시','1111','2016-09-30 02:19:21','doohee323','2016-09-30 02:19:21','doohee323'),(46,'http://192.168.82.170/uploads/phppjlhse.jpg','서울특별시','서대문구','111','2016-09-30 02:19:32','doohee323','2016-09-30 02:19:32','doohee323'),(47,'images/user-women.png','서울특별시','종로구','111','2016-09-30 02:21:27','doosee323','2016-09-30 02:21:27','doosee323'),(48,NULL,'서울특별시','서대문구','ㄴㅇㄹ','2016-10-02 23:57:13','doosee323','2016-10-02 23:57:13','doosee323'),(49,'http://192.168.82.170/uploads/phpnwnjwu.jpg','서울특별시','서대문구','새누리당이 2일 \'국정감사 보이콧\' 철회를 선언했다. 이 같은 결정 직후 이정현 대표는 단식을 중단하고 병원으로 이송됐다.\n\n이 대표는 이날 소속 의원들에게 보낸 메시지를 통해 \"4일부터 국감에 전원 임해주실 것을 간곡하게 부탁한다\"며 \"국회의장 중립 유지 방법은 다른 방식으로 계속될 것\"이라고 밝혔다. 이에 새누리당 의원들은 이날 오후 비공개 의원총회를 열고 \'국감 보이콧\' 철회를 만장일치로 추인했다.\n\n정진석 원내대표는 이날 의총 직후 기자간담회를 하고 \"새누리당은 국민의 뜻에 순응하기로 했다\"며 \"오는 4일부터 국감에 복귀해 정상적으로 국회운영에 참여하고 모든 책임을 다해 성실하게 의정활동에 임하겠다\"고 말했다. 하지만 정 원내대표는 \"거듭되는 국회의장의 정치적 중립성 훼손을 방치할 수 없다\"며 \"국회의장의 중립 의무를 강화하려는 방안을 마련하기 위해 여야 간 밀도 있는 논의를 진행하겠다\"고 말해 이번 사태의 불씨가 여전함을 드러냈다.','2016-10-02 23:59:50','doosee323','2016-10-02 23:59:50','doosee323');
/*!40000 ALTER TABLE `talk` ENABLE KEYS */;
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
