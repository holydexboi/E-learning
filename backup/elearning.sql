-- MariaDB dump 10.19  Distrib 10.11.4-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: elearning
-- ------------------------------------------------------
-- Server version	10.11.4-MariaDB-1~deb12u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activations`
--

DROP TABLE IF EXISTS `activations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activations` (
  `id` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `valid` tinyint(1) DEFAULT 1,
  `created_at` timestamp(6) NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activations`
--

LOCK TABLES `activations` WRITE;
/*!40000 ALTER TABLE `activations` DISABLE KEYS */;
INSERT INTO `activations` VALUES
('3bfdd329-e6c0-4cdd-8980-c4158c324477','ESTJtB',1,'2024-01-22 16:27:50.194783'),
('42247fd1-eef5-4ec2-929e-d5d8055036e7','Fn_kqV',1,'2024-01-22 16:26:57.204374'),
('4e8ac77c-a980-4db9-bcb4-5fdf3765c84b','XpZnUM',1,'2024-01-22 16:27:51.844748'),
('59206daf-2488-4026-ac94-28b145c7037b','LhJYoF',1,'2024-01-22 10:07:42.814137'),
('61357ab3-0f89-4437-9576-0f03ce58d234','dYCAw2',0,'2024-01-22 11:30:54.467643'),
('d3aaa6bc-266d-4cdb-8958-85561dc754a6','dIqliO',1,'2024-01-22 16:27:53.099365'),
('d506df13-2654-46c3-999c-f6e74e0d21c3','UC895o',0,'2024-01-22 16:27:57.248020'),
('eb8782ba-5231-4097-8a53-891aab0eaacf','1Ucicy',1,'2024-01-22 16:27:55.817609'),
('f1fed4af-46e9-4099-bd9a-40a791b84ec8','-ZLlF3',1,'2024-01-22 16:27:54.466551');
/*!40000 ALTER TABLE `activations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses` (
  `id` varchar(255) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `grade` varchar(255) DEFAULT NULL,
  `banner` varchar(255) DEFAULT NULL,
  `review` int(11) DEFAULT 0,
  `rate` float(8,2) DEFAULT 0.00,
  `created_at` timestamp(6) NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`),
  KEY `courses_subject_foreign` (`subject`),
  KEY `courses_grade_foreign` (`grade`),
  CONSTRAINT `courses_grade_foreign` FOREIGN KEY (`grade`) REFERENCES `grades` (`id`),
  CONSTRAINT `courses_subject_foreign` FOREIGN KEY (`subject`) REFERENCES `subjects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES
('686fc411-efbd-4283-a365-6ef5ea52cfba','e68f1de0-d048-44df-9288-e7b59db671f1','864d11e8-e2da-4630-a933-6e77cc02cd72','./uploads/images/course/S9zzF0Ft816p1HJW0KorO.png',0,0.00,'2024-01-22 08:57:39.073607'),
('dda4fc30-a94b-48b4-ab01-c29c72839a57','40cf14dd-7d4a-47b4-8590-5c9cee94b339','864d11e8-e2da-4630-a933-6e77cc02cd72','./uploads/images/course/u1FxUZWV6VpDiZK1QEbGq.jpeg',0,0.00,'2024-01-21 19:32:22.260493');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grades`
--

DROP TABLE IF EXISTS `grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grades` (
  `id` varchar(255) NOT NULL,
  `level` varchar(255) DEFAULT NULL,
  `created_at` timestamp(6) NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grades`
--

LOCK TABLES `grades` WRITE;
/*!40000 ALTER TABLE `grades` DISABLE KEYS */;
INSERT INTO `grades` VALUES
('09e6bdec-2712-43fd-97fd-588a1afa6657','Basic 2','2024-01-20 20:24:02.126029'),
('23c5d06e-5dcc-4c94-b896-c7d1c989b2a8','Basic 6','2024-01-20 20:24:27.060130'),
('84cf3d6e-2972-499b-a592-fb08db1b9a07','Basic 3','2024-01-20 20:24:12.226537'),
('864d11e8-e2da-4630-a933-6e77cc02cd72','Basic 1','2024-01-20 20:23:53.948463'),
('a242f847-6969-4e11-a7e1-7922436c83f8','Basic 4','2024-01-20 20:24:16.880770'),
('ea6b87b2-2c10-4173-b15a-18ffc1a862af','Basic 5','2024-01-20 20:24:22.195929');
/*!40000 ALTER TABLE `grades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructors`
--

DROP TABLE IF EXISTS `instructors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instructors` (
  `id` varchar(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `profilePic` varchar(255) DEFAULT NULL,
  `review` int(11) DEFAULT 0,
  `gender` enum('male','female') DEFAULT NULL,
  `rate` float(8,2) DEFAULT 0.00,
  `created_at` timestamp(6) NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructors`
--

LOCK TABLES `instructors` WRITE;
/*!40000 ALTER TABLE `instructors` DISABLE KEYS */;
/*!40000 ALTER TABLE `instructors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lessons`
--

DROP TABLE IF EXISTS `lessons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lessons` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `course` varchar(255) DEFAULT NULL,
  `description` longblob DEFAULT NULL,
  `instructorName` varchar(255) DEFAULT NULL,
  `instructorPic` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `doc` varchar(255) DEFAULT NULL,
  `duration` float(8,2) DEFAULT NULL,
  `created_at` timestamp(6) NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`),
  KEY `lessons_course_foreign` (`course`),
  CONSTRAINT `lessons_course_foreign` FOREIGN KEY (`course`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lessons`
--

LOCK TABLES `lessons` WRITE;
/*!40000 ALTER TABLE `lessons` DISABLE KEYS */;
INSERT INTO `lessons` VALUES
('301fb40b-14fc-4669-a46f-3a92e4f80a15','Test Lesson','dda4fc30-a94b-48b4-ab01-c29c72839a57',' ','Yan Gui','/uploads/images/instructor/YbB4F19451KSc9A-qCol0.jpeg',NULL,'/uploads/documents/1oXO1wNCnp2zJPKg6gnna.pdf',4.00,'2024-01-21 21:47:21.560612'),
('41616f32-ab90-4403-8083-07e2f752e0c7','Vocabulary','dda4fc30-a94b-48b4-ab01-c29c72839a57','null','Richard Achonye','/uploads/images/instructor/ok0E_6-f8FnWPfoNV3ISF.jpeg',NULL,'/uploads/documents/Yn2u_5BQGLoCjKl6GtMJn.pdf',10.00,'2024-01-21 19:34:01.401205'),
('65e5a7e4-c637-4ca2-88f5-a9ee8a09ad8a','Test Lesson','dda4fc30-a94b-48b4-ab01-c29c72839a57',' ','Yan Gui','/uploads/images/instructor/I03APE4F32G9CVp-994R2.jpeg',NULL,'/uploads/documents/arHif25Ri6J3UdeLM1SS6.pdf',4.00,'2024-01-21 21:00:03.236751'),
('f2d74bbc-6eaa-4083-9086-a39359bbaa4f','Whole Numbers','686fc411-efbd-4283-a365-6ef5ea52cfba','Today, we\'re going to talk about something really important in mathematics called \"whole numbers. Now, whole numbers are like the numbers we use to count things—like toys, candies, or even friends in the classroom.\r\n','Ubec','/uploads/images/instructor/9KSnuOF5RwSrNZnraVlvl.png',NULL,'/uploads/documents/Fz3oIgQ1eTWx22xfC1Bpn.pdf',30.00,'2024-01-22 09:00:51.789155');
/*!40000 ALTER TABLE `lessons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subjects` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp(6) NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES
('218a381b-585c-447b-acfe-27f58d9c9763','Basic science',NULL,'2024-01-20 18:55:42.718817'),
('3c6c96da-d6e2-4c5c-8932-921b0b4d9e9a','CRS',NULL,'2024-01-20 18:57:04.361489'),
('3e93db8a-1446-455f-b411-89d2feb15c53','IRS',NULL,'2024-01-20 18:57:31.138546'),
('40cf14dd-7d4a-47b4-8590-5c9cee94b339','English',NULL,'2024-01-20 18:54:18.613723'),
('46afc20e-9e8f-47e1-9a18-1a2982ce3446','Social studies',NULL,'2024-01-20 18:56:43.890053'),
('5c348024-8499-4d10-958f-8540f4a22cc8','Health education',NULL,'2024-01-20 18:56:21.619261'),
('605f580b-742e-44b6-98d5-3cafc1113e17','Literatures',NULL,'2024-01-20 19:00:52.542694'),
('70c94fb4-48d3-412f-9987-d453a9521ed8','French',NULL,'2024-01-20 18:57:49.947722'),
('8a194368-55fe-4b75-bb35-2d7851b09c1e','Computer science',NULL,'2024-01-20 18:59:24.849624'),
('ba58078c-c008-41b9-a8ef-0e7316303ecb','Quantative Analysis',NULL,'2024-01-20 18:59:01.901929'),
('c38e0b20-f6a6-441a-8cee-d6be0e58ad1f','Verbal reasoning',NULL,'2024-01-20 18:58:40.732592'),
('e68f1de0-d048-44df-9288-e7b59db671f1','Mathematics',NULL,'2024-01-20 18:54:58.017984');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tests`
--

DROP TABLE IF EXISTS `tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tests` (
  `id` varchar(255) NOT NULL,
  `question` varchar(255) DEFAULT NULL,
  `optionA` varchar(255) DEFAULT NULL,
  `optionB` varchar(255) DEFAULT NULL,
  `optionC` varchar(255) DEFAULT NULL,
  `optionD` varchar(255) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `lesson` varchar(255) DEFAULT NULL,
  `duration` float(8,2) DEFAULT NULL,
  `created_at` timestamp(6) NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`),
  KEY `tests_lesson_foreign` (`lesson`),
  CONSTRAINT `tests_lesson_foreign` FOREIGN KEY (`lesson`) REFERENCES `lessons` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tests`
--

LOCK TABLES `tests` WRITE;
/*!40000 ALTER TABLE `tests` DISABLE KEYS */;
INSERT INTO `tests` VALUES
('1a7147f0-c1b2-4512-b8ed-4b2cdc8afd42','Click the word that does not belong:',NULL,NULL,NULL,NULL,'desk','multiple-choice','41616f32-ab90-4403-8083-07e2f752e0c7',NULL,'2024-01-21 19:39:37.100875'),
('24ae53ff-b5f4-4955-bb3c-027865563024','The big, yellow ___ is in the sky.',NULL,NULL,NULL,NULL,'Sun','multiple-choice','41616f32-ab90-4403-8083-07e2f752e0c7',NULL,'2024-01-21 19:39:37.071675'),
('45118979-b667-45eb-894b-8a0e1557c8a5','Which of the following is a whole number?',NULL,NULL,NULL,NULL,'6','multiple-choice','f2d74bbc-6eaa-4083-9086-a39359bbaa4f',NULL,'2024-01-22 09:05:50.459490'),
('a151cd1e-a436-4591-9582-65629c409994','I have a red ____.',NULL,NULL,NULL,NULL,'sun','multiple-choice','41616f32-ab90-4403-8083-07e2f752e0c7',NULL,'2024-01-21 19:39:37.078394'),
('ae4d6e37-d2c7-42aa-8e44-e25d81ed3864','What comes after the number 4?',NULL,NULL,NULL,NULL,'5','multiple-choice','f2d74bbc-6eaa-4083-9086-a39359bbaa4f',NULL,'2024-01-22 09:05:50.438801'),
('b26154de-0bd5-4798-a282-ba16aae41b41','What number is in the middle of 1 and 3?',NULL,NULL,NULL,NULL,'2','multiple-choice','f2d74bbc-6eaa-4083-9086-a39359bbaa4f',NULL,'2024-01-22 09:05:50.446142'),
('b3f234dd-0091-4c3f-a6b7-86e2f78eba6d','If you have zero candies, how many candies do you have?',NULL,NULL,NULL,NULL,'0','multiple-choice','f2d74bbc-6eaa-4083-9086-a39359bbaa4f',NULL,'2024-01-22 09:05:50.454010'),
('c4736203-7158-4a7a-8a7a-d52113e16ce7','How many fingers do you have on one hand?',NULL,NULL,NULL,NULL,'5','multiple-choice','f2d74bbc-6eaa-4083-9086-a39359bbaa4f',NULL,'2024-01-22 09:05:50.432768'),
('ede0cdc5-ae9f-4989-83df-6991d73924a6','The ___ is shining brightly in the sky.',NULL,NULL,NULL,NULL,'sun','multiple-choice','41616f32-ab90-4403-8083-07e2f752e0c7',NULL,'2024-01-21 19:39:37.097319');
/*!40000 ALTER TABLE `tests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usercourses`
--

DROP TABLE IF EXISTS `usercourses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usercourses` (
  `id` varchar(255) NOT NULL,
  `user` varchar(255) DEFAULT NULL,
  `course` varchar(255) DEFAULT NULL,
  `lessons` varchar(255) DEFAULT NULL,
  `status` enum('inprogress','completed') DEFAULT NULL,
  `progress` int(11) DEFAULT NULL,
  `created_at` timestamp(6) NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`),
  KEY `usercourses_user_foreign` (`user`),
  KEY `usercourses_course_foreign` (`course`),
  CONSTRAINT `usercourses_course_foreign` FOREIGN KEY (`course`) REFERENCES `courses` (`id`),
  CONSTRAINT `usercourses_user_foreign` FOREIGN KEY (`user`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usercourses`
--

LOCK TABLES `usercourses` WRITE;
/*!40000 ALTER TABLE `usercourses` DISABLE KEYS */;
/*!40000 ALTER TABLE `usercourses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `verify` tinyint(1) DEFAULT 0,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `grade` varchar(255) DEFAULT NULL,
  `profilePic` varchar(255) DEFAULT NULL,
  `created_at` timestamp(6) NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_userid_unique` (`userId`),
  KEY `users_grade_foreign` (`grade`),
  CONSTRAINT `users_grade_foreign` FOREIGN KEY (`grade`) REFERENCES `grades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
('0d14fc04-df45-4a8f-b48f-ba5dc158e983','455447','$2b$10$rkiCXnIcnzJjwPWlnuMp8uVe0xlyX4eG0YXwH0PSOS0Td1gRpGXgu',NULL,0,NULL,NULL,NULL,1,'admin@e-learning.com',NULL,NULL,NULL,NULL,'2024-01-21 19:23:51.229012'),
('6df72c42-105b-4fda-9bbd-91bcb7c3ae6d','9088332','$2b$10$1OMz5Aw8L08rvmWNOuDwde0GIDTjENIVpYjSNxDIv/UqfpPG3bvLq','',1,'aje','dammy','Abia',NULL,NULL,'female','1999-01-01',NULL,'/uploads/images/user/08GexVRuLf-eKNSNe7EHj.jpeg','2024-01-22 11:31:32.310806'),
('a4506064-6e08-4040-afc0-374c7dc1fe3b','7215135','$2b$10$yoJJhOxn/3yl31k7mW52rOIACvvphwugO9iY96oDnYlm06/Z98Kv6','',0,'Babatunde','Aje','Lagos',NULL,NULL,'male','1999-01-01',NULL,NULL,'2024-01-23 11:02:24.546212'),
('d0a5b5fb-2e21-4779-becc-9cec65af5bef','7876944','$2b$10$I0PhzSLVxsAPe43I8KdREOM9w17rR3mIMU..Dr/E7cEbRBusJRYZS','',0,'Babatunde','Aje','Lagos',NULL,NULL,'male','1999-01-01',NULL,NULL,'2024-01-23 10:04:20.151274');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertests`
--

DROP TABLE IF EXISTS `usertests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usertests` (
  `id` varchar(255) NOT NULL,
  `user` varchar(255) DEFAULT NULL,
  `lesson` varchar(255) DEFAULT NULL,
  `tests` varchar(255) DEFAULT NULL,
  `score` float(8,2) DEFAULT NULL,
  `status` enum('inprogress','completed') DEFAULT NULL,
  `created_at` timestamp(6) NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`),
  KEY `usertests_user_foreign` (`user`),
  KEY `usertests_lesson_foreign` (`lesson`),
  CONSTRAINT `usertests_lesson_foreign` FOREIGN KEY (`lesson`) REFERENCES `tests` (`lesson`),
  CONSTRAINT `usertests_user_foreign` FOREIGN KEY (`user`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertests`
--

LOCK TABLES `usertests` WRITE;
/*!40000 ALTER TABLE `usertests` DISABLE KEYS */;
INSERT INTO `usertests` VALUES
('0411e3b1-94e3-491a-a99a-954ac3c9fce0','9088332','f2d74bbc-6eaa-4083-9086-a39359bbaa4f','',0.00,NULL,'2024-01-22 13:10:54.820495'),
('0d8c6906-a11b-4443-bef2-ca6abc1cd65b','9088332','f2d74bbc-6eaa-4083-9086-a39359bbaa4f','',0.00,NULL,'2024-01-22 13:18:22.340377'),
('11113f9f-5c18-4c6e-b548-b59cc7f56850','9088332','f2d74bbc-6eaa-4083-9086-a39359bbaa4f','',0.00,NULL,'2024-01-22 13:18:45.537075'),
('13c24958-f028-46d6-898f-59f8d8082a75','9088332','f2d74bbc-6eaa-4083-9086-a39359bbaa4f','',0.00,NULL,'2024-01-22 13:21:06.036571'),
('2186d799-bf04-489b-b406-3615e73a7c78','9088332','f2d74bbc-6eaa-4083-9086-a39359bbaa4f','',0.00,NULL,'2024-01-22 13:20:15.290966'),
('3a6c09dc-5c17-4be3-8308-28c96c0d7854','9088332','41616f32-ab90-4403-8083-07e2f752e0c7','',0.00,NULL,'2024-01-22 12:53:11.004103'),
('44d4f57f-f87b-4003-b819-c1c4f21760bf','9088332','f2d74bbc-6eaa-4083-9086-a39359bbaa4f','',0.00,NULL,'2024-01-22 13:18:34.682897'),
('4eb54dfd-7692-45bc-b01e-81a2775469db','9088332','f2d74bbc-6eaa-4083-9086-a39359bbaa4f','',0.00,NULL,'2024-01-22 12:44:37.432343'),
('4ef1241b-fb92-4c66-9751-04876810797c','9088332','f2d74bbc-6eaa-4083-9086-a39359bbaa4f','',0.00,NULL,'2024-01-22 13:22:56.529233'),
('54de99ee-e4f0-4a8a-a162-7aa8654cbe03','9088332','f2d74bbc-6eaa-4083-9086-a39359bbaa4f','',0.00,NULL,'2024-01-22 12:08:21.097045'),
('55d8d884-7458-4d1f-9d36-37aa72633d67','9088332','f2d74bbc-6eaa-4083-9086-a39359bbaa4f','',0.00,NULL,'2024-01-22 13:10:59.115574'),
('5d8a3976-606b-450c-981e-e3700ca3fb98','9088332','f2d74bbc-6eaa-4083-9086-a39359bbaa4f','',0.00,NULL,'2024-01-22 12:12:22.882698'),
('9bc733bb-216e-425f-b228-fe48dc023b44','9088332','f2d74bbc-6eaa-4083-9086-a39359bbaa4f','',0.00,NULL,'2024-01-22 13:17:38.691402'),
('aa079a22-4801-4c39-8a90-cdc8deb28dd7','9088332','f2d74bbc-6eaa-4083-9086-a39359bbaa4f','',0.00,NULL,'2024-01-22 13:22:06.101541'),
('befb6ebb-268b-4dbd-b875-df6d0f35b33f','9088332','41616f32-ab90-4403-8083-07e2f752e0c7','',0.00,NULL,'2024-01-22 12:12:59.441061'),
('c1ca88e6-c825-4166-afe7-1af6a5d4d202','9088332','f2d74bbc-6eaa-4083-9086-a39359bbaa4f','',0.00,NULL,'2024-01-22 13:15:54.387035'),
('ea697dd5-2f5e-4119-b78e-f0e8a9a6a2a3','9088332','f2d74bbc-6eaa-4083-9086-a39359bbaa4f','',0.00,NULL,'2024-01-22 13:20:27.883190'),
('eac809e7-2cfc-4b7d-99c6-1b1dcf0f7ffd','9088332','f2d74bbc-6eaa-4083-9086-a39359bbaa4f','',0.00,NULL,'2024-01-22 13:14:00.152866'),
('f4dc68da-3a2a-418c-b536-3b1a2acdd080','9088332','f2d74bbc-6eaa-4083-9086-a39359bbaa4f','',0.00,NULL,'2024-01-22 13:17:45.997718'),
('fea120db-5d20-41ae-8961-902227d40757','9088332','f2d74bbc-6eaa-4083-9086-a39359bbaa4f','',0.00,NULL,'2024-01-22 13:15:32.972112');
/*!40000 ALTER TABLE `usertests` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-23 13:07:44
