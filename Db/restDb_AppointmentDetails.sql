-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: restDb
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AppointmentDetails`
--

DROP TABLE IF EXISTS `AppointmentDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AppointmentDetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doctorId` int NOT NULL,
  `userId` int NOT NULL,
  `hospitalId` int NOT NULL,
  `paid` varchar(10) NOT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_DOC_idx` (`doctorId`),
  KEY `FK_USR_idx` (`userId`),
  KEY `FK_HOSPTL_idx` (`hospitalId`),
  CONSTRAINT `FK_DOC` FOREIGN KEY (`doctorId`) REFERENCES `Doctors` (`id`),
  CONSTRAINT `FK_HOSPTL` FOREIGN KEY (`hospitalId`) REFERENCES `HospitalDetails` (`id`),
  CONSTRAINT `FK_USR` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AppointmentDetails`
--

LOCK TABLES `AppointmentDetails` WRITE;
/*!40000 ALTER TABLE `AppointmentDetails` DISABLE KEYS */;
INSERT INTO `AppointmentDetails` VALUES (1,1,1,1,'no','2020-04-10'),(19,2,64,3,'no','2020-04-02'),(22,2,1,3,'no','2020-04-17'),(24,2,1,3,'no','2020-04-18'),(32,2,1,3,'no','2020-04-17'),(43,1,64,1,'no','2020-04-26'),(44,2,64,3,'no','2020-04-01'),(45,2,64,3,'no','2020-04-13'),(46,2,64,3,'yes','2020-04-24'),(47,1,64,1,'no','2020-04-19');
/*!40000 ALTER TABLE `AppointmentDetails` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-13  0:59:14
