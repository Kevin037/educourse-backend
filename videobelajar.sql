-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 05, 2025 at 02:38 PM
-- Server version: 8.3.0
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `videobelajar`
--

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
CREATE TABLE IF NOT EXISTS `classes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category_id` int NOT NULL,
  `page_title` varchar(255) NOT NULL,
  `price` double(50,2) NOT NULL,
  `new_price` double(50,2) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `long_description` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `name`, `category_id`, `page_title`, `price`, `new_price`, `photo`, `description`, `long_description`) VALUES
(1, 'Big 4 Auditor Financial Analyst9', 1, 'Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager.', 500000.00, 250000.00, 'item9.svg', 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan  kurikulum terbaik', 'Foundations of User Experience (UX) Design adalah yang pertama dari rangkaian tujuh kursus yang akan membekali Anda dengan keterampilan yang dibutuhkan untuk melamar pekerjaan tingkat pemula dalam desain pengalaman pengguna. Desainer UX fokus pada interaksi yang dilakukan orang dengan produk seperti situs web, aplikasi seluler, dan objek fisik. Desainer UX membuat interaksi sehari-hari itu dapat digunakan, menyenangkan, dan dapat diakses. Peran seorang desainer UX tingkat pemula mungkin termasuk berempati dengan pengguna, menentukan poin rasa sakit mereka, memunculkan ide untuk solusi desain, membuat wireframe, prototipe, dan maket, dan menguji desain untuk mendapatkan umpan balik.'),
(2, 'Cig 4 Auditor Financial Analyst2', 2, 'Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager.2', 400000.00, 200000.00, 'item8.svg', 'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan  kurikulum terbaik2', 'Foundations of User Experience (UX) Design adalah yang pertama dari rangkaian tujuh kursus yang akan membekali Anda dengan keterampilan yang dibutuhkan untuk melamar pekerjaan tingkat pemula dalam desain pengalaman pengguna. Desainer UX fokus pada interaksi yang dilakukan orang dengan produk seperti situs web, aplikasi seluler, dan objek fisik. Desainer UX membuat interaksi sehari-hari itu dapat digunakan, menyenangkan, dan dapat diakses. Peran seorang desainer UX tingkat pemula mungkin termasuk berempati dengan pengguna, menentukan poin rasa sakit mereka, memunculkan ide untuk solusi desain, membuat wireframe, prototipe, dan maket, dan menguji desain untuk mendapatkan umpan balik.2');

-- --------------------------------------------------------

--
-- Table structure for table `class_categories`
--

DROP TABLE IF EXISTS `class_categories`;
CREATE TABLE IF NOT EXISTS `class_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `class_categories`
--

INSERT INTO `class_categories` (`id`, `name`) VALUES
(1, 'Pemasaran'),
(2, 'Desain'),
(3, 'Pengembangan Diri'),
(4, 'Bisnis');

-- --------------------------------------------------------

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
CREATE TABLE IF NOT EXISTS `materials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `no` varchar(255) NOT NULL,
  `question` text NOT NULL,
  `answer` varchar(255) NOT NULL,
  `class_id` int NOT NULL,
  `options` text NOT NULL,
  `file` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` (`id`, `no`, `question`, `answer`, `class_id`, `options`, `file`) VALUES
(1, '1', 'Apa kegunaan quiz?', 'b', 1, '{\"a\": \"Untuk apa yah1?\",\"b\": \"Untuk bbb1\",\"c\": \"Untuk ccc1\",\"d\": \"Untuk ddd1\"}', NULL),
(2, '2', 'Apa manfaat quiz?', 'a', 1, '{\"a\": \"Untuk apa yah?2\",\"b\": \"Untuk bbb2\",\"c\": \"Untuk ccc2\",\"d\": \"Untuk ddd2\"}', NULL),
(3, '3', 'Siapa yang menciptakan quiz?', 'd', 1, '{\"a\": \"Untuk apa yah?3\",\"b\": \"Untuk bbb3\",\"c\": \"Untuk ccc3\",\"d\": \"Untuk ddd3\"}', NULL),
(4, '1', 'Apa dampak dengan adanya quiz?', 'b', 2, '{\"a\": \"Untuk apa yah?4\",\"b\": \"Untuk bbb4\",\"c\": \"Untuk ccc4\",\"d\": \"Untuk ddd4\"}', NULL),
(5, '2', 'Siap yang mengusung adanya quiz?', 'c', 2, '{\"a\": \"Untuk apa yah?5\",\"b\": \"Untuk bbb5\",\"c\": \"Untuk ccc5\",\"d\": \"Untuk ddd5\"}', NULL),
(6, '3', 'Siapa pemenag quiz pertama di dunia?', 'd', 2, '{\"a\": \"Untuk apa yah?6\",\"b\": \"Untuk bbb6\",\"c\": \"Untuk ccc6\",\"d\": \"Untuk ddd6\"}', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
CREATE TABLE IF NOT EXISTS `modules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `duration` int NOT NULL,
  `group_name` varchar(255) NOT NULL,
  `class_id` int NOT NULL,
  `ordering` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`id`, `name`, `type`, `content`, `duration`, `group_name`, `class_id`, `ordering`) VALUES
(1, 'Jobs in the field of user experience', 'video', '', 20, 'Introduction to Course 1: Foundations of User Experience Design', 1, 1),
(2, 'The product development life cycle', 'video', '', 10, 'Introduction to Course 1: Foundations of User Experience Design', 1, 2),
(3, 'Jobs in the field of user experience', 'video', '', 5, 'Introduction to Course 1: Foundations of User Experience Design', 1, 3),
(4, 'The basics of user experience design', 'video', '', 20, 'Introduction to Course 1: Foundations of User Experience Design', 1, 4),
(5, 'Ngoding', 'video', '', 12, 'Introduction to design sprints', 1, 5),
(6, 'Universal design, inclusive design, and equity-focused design2', 'video', '', 15, 'Universal design, inclusive design, and equity-focused design', 1, 6),
(7, 'The product development life cycle UX', 'video', '', 23, 'Introduction to UX research', 1, 7),
(8, '2Jobs in the field of user experience', 'video', '', 12, '2Introduction to Course 1: Foundations of User Experience Design', 2, 1),
(9, '2The product development life cycle', 'video', '', 21, '2Introduction to Course 1: Foundations of User Experience Design', 2, 2),
(10, '3Jobs in the field of user experience', 'video', '', 11, '2Jobs in the field of user experience', 2, 3),
(11, '2The basics of user experience design', 'video', '', 6, '2Introduction to Course 1: Foundations of User Experience Design', 2, 4),
(12, '2Ngoding', 'video', '', 9, '2Introduction to design sprints', 2, 5),
(13, '2Universal design, inclusive design, and equity-focused design2', 'video', '', 6, '2Universal design, inclusive design, and equity-focused design', 2, 6),
(14, '2The product development life cycle UX', 'video', '', 15, '2Introduction to UX research', 2, 7);

-- --------------------------------------------------------

--
-- Table structure for table `my_classes`
--

DROP TABLE IF EXISTS `my_classes`;
CREATE TABLE IF NOT EXISTS `my_classes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(255) NOT NULL,
  `order_id` int NOT NULL,
  `module_id` int DEFAULT NULL,
  `pretest_id` int DEFAULT NULL,
  `material_id` int DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `my_classes`
--

INSERT INTO `my_classes` (`id`, `status`, `order_id`, `module_id`, `pretest_id`, `material_id`, `answer`) VALUES
(1, 'completed', 10, 8, NULL, NULL, NULL),
(2, 'completed', 10, 9, NULL, NULL, NULL),
(3, 'completed', 10, 10, NULL, NULL, NULL),
(4, 'completed', 10, 11, NULL, NULL, NULL),
(5, 'completed', 10, 12, NULL, NULL, NULL),
(6, 'completed', 10, 13, NULL, NULL, NULL),
(7, 'completed', 10, 14, NULL, NULL, NULL),
(8, 'completed', 10, NULL, 4, NULL, 'b'),
(9, 'completed', 10, NULL, 5, NULL, 'a'),
(10, 'completed', 10, NULL, 6, NULL, 'c'),
(11, 'completed', 10, NULL, NULL, 4, 'b'),
(12, 'completed', 10, NULL, NULL, 5, 'a'),
(13, 'completed', 10, NULL, NULL, 6, 'd'),
(14, 'pending', 10, 8, NULL, NULL, NULL),
(15, 'pending', 10, 9, NULL, NULL, NULL),
(16, 'pending', 10, 10, NULL, NULL, NULL),
(17, 'pending', 10, 11, NULL, NULL, NULL),
(18, 'pending', 10, 12, NULL, NULL, NULL),
(19, 'pending', 10, 13, NULL, NULL, NULL),
(20, 'pending', 10, 14, NULL, NULL, NULL),
(21, 'pending', 10, NULL, 4, NULL, NULL),
(22, 'pending', 10, NULL, 5, NULL, NULL),
(23, 'pending', 10, NULL, 6, NULL, NULL),
(24, 'pending', 10, NULL, NULL, 4, NULL),
(25, 'pending', 10, NULL, NULL, 5, NULL),
(26, 'pending', 10, NULL, NULL, 6, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `price` double(50,2) NOT NULL,
  `status` enum('pending','success','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'pending',
  `class_completed` tinyint NOT NULL DEFAULT '0',
  `user_id` int NOT NULL,
  `class_id` int NOT NULL,
  `pretest_score` double(50,2) DEFAULT NULL,
  `quiz_score` double(50,2) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `completed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `no`, `price`, `status`, `class_completed`, `user_id`, `class_id`, `pretest_score`, `quiz_score`, `created_at`, `completed_at`) VALUES
(4, NULL, 200000.00, 'pending', 0, 0, 1, NULL, NULL, '2025-04-27 06:38:50', NULL),
(3, NULL, 200000.00, 'pending', 0, 0, 1, NULL, NULL, '2025-04-27 06:37:26', NULL),
(5, NULL, 200000.00, 'success', 0, 7, 1, NULL, NULL, '2025-04-27 06:38:58', NULL),
(6, NULL, 200000.00, 'pending', 0, 7, 1, NULL, NULL, '2025-04-27 06:42:18', NULL),
(7, NULL, 200000.00, 'pending', 0, 7, 1, NULL, NULL, '2025-04-27 06:42:40', NULL),
(8, 'HEL/VI/17457362506738', 200000.00, 'pending', 0, 7, 1, NULL, NULL, '2025-04-27 06:44:10', NULL),
(9, 'HEL/VI/17457363314989', 200000.00, 'pending', 0, 7, 1, NULL, NULL, '2025-04-27 06:45:31', NULL),
(10, 'HEL/VI/174573637049710', 200000.00, 'success', 1, 7, 2, 33.33, 0.00, '2025-04-27 06:46:10', '2025-04-28 14:53:30'),
(11, 'HEL/VI/174573639337011', 200000.00, 'success', 0, 7, 1, NULL, NULL, '2025-04-27 06:46:33', NULL),
(12, 'HEL/VI/174576008547812', 0.00, 'pending', 0, 7, 1, NULL, NULL, '2025-04-27 13:21:25', NULL),
(13, 'HEL/VI/174585214055713', 200000.00, 'pending', 0, 7, 1, NULL, NULL, '2025-04-28 14:55:40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
CREATE TABLE IF NOT EXISTS `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `payment_method` varchar(255) NOT NULL,
  `order_id` int NOT NULL,
  `paid_at` datetime DEFAULT NULL,
  `expired_at` datetime NOT NULL,
  `status` enum('pending','paid','cancelled') NOT NULL DEFAULT 'pending',
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `payment_method`, `order_id`, `paid_at`, `expired_at`, `status`, `updated_at`) VALUES
(1, 'ovo', 5, '2025-04-27 07:14:54', '2025-04-27 07:37:26', 'paid', '2025-04-27 07:14:54'),
(2, 'bca', 6, NULL, '2025-04-27 07:38:50', 'pending', '0000-00-00 00:00:00'),
(3, 'bca', 7, NULL, '2025-04-27 07:38:58', 'pending', '0000-00-00 00:00:00'),
(4, 'bca', 8, NULL, '2025-04-27 07:44:10', 'pending', '0000-00-00 00:00:00'),
(5, 'linkaja', 9, NULL, '2025-04-27 07:45:31', 'pending', '2025-04-28 14:56:36'),
(6, 'bca', 10, '2025-04-28 14:56:43', '2025-04-27 07:46:10', 'paid', '2025-04-28 14:56:43'),
(7, 'bca', 11, '2025-04-27 23:21:30', '2025-04-27 07:46:33', 'paid', '2025-04-27 23:21:30'),
(8, 'undefined', 12, NULL, '2025-04-27 14:21:25', 'pending', NULL),
(9, 'bca', 13, NULL, '2025-04-28 15:55:40', 'pending', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pretests`
--

DROP TABLE IF EXISTS `pretests`;
CREATE TABLE IF NOT EXISTS `pretests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `no` int NOT NULL,
  `question` text NOT NULL,
  `answer` varchar(255) NOT NULL,
  `class_id` int NOT NULL,
  `options` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pretests`
--

INSERT INTO `pretests` (`id`, `no`, `question`, `answer`, `class_id`, `options`) VALUES
(1, 1, 'Apakah Kegunaan CSS ?', 'b', 1, '{\"a\": \"Untuk apa yah?1\",\"b\": \"Untuk bbb1\",\"c\": \"Untuk ccc1\",\"d\": \"Untuk ddd1\"}'),
(2, 2, 'Apakah kegunaan html ?', 'c', 1, '{\"a\": \"Untuk apa yah?2\",\"b\": \"Untuk bbb2\",\"c\": \"Untuk ccc2\",\"d\": \"Untuk ddd2\"}'),
(3, 3, 'Apakah kegunaan pertnyaan ini ?', 'a', 1, '{\"a\": \"Untuk apa yah?3\",\"b\": \"Untuk bbb3\",\"c\": \"Untuk ccc3\",\"d\": \"Untuk ddd3\"}'),
(4, 1, 'Mengapa belajar itu penting?', 'b', 2, '{\"a\": \"Untuk apa yah?4\",\"b\": \"Untuk bbb4\",\"c\": \"Untuk ccc4\",\"d\": \"Untuk ddd4\"}'),
(5, 2, 'Apa kegunaan belajar bisnis ?', 'd', 2, '{\"a\": \"Untuk apa yah?5\",\"b\": \"Untuk bbb5\",\"c\": \"Untuk ccc5\",\"d\": \"Untuk ddd5\"}'),
(6, 3, 'Mengapa menjadi sukses itu penting?', 'a', 2, '{\"a\": \"Untuk apa yah?6\",\"b\": \"Untuk bbb6\",\"c\": \"Untuk ccc6\",\"d\": \"Untuk ddd6\"}');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rating` int NOT NULL,
  `description` text,
  `order_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tutors`
--

DROP TABLE IF EXISTS `tutors`;
CREATE TABLE IF NOT EXISTS `tutors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `photo` varchar(255) NOT NULL,
  `class_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tutors`
--

INSERT INTO `tutors` (`id`, `name`, `company`, `position`, `description`, `photo`, `class_id`) VALUES
(1, 'Bosque', 'Shopee', 'Manager', 'Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.', 'avatar1.svg', 1),
(2, 'Mbappe', 'Shopee', 'Staff', 'Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.', 'avatar2.svg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `no_hp` int NOT NULL,
  `password` varchar(255) NOT NULL,
  `photo` text,
  `verification_token` varchar(255) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `no_hp`, `password`, `photo`, `verification_token`, `is_verified`) VALUES
(1, 'ksatria708@gmail.com', 'kevin', 878888888, '123321', NULL, NULL, 0),
(7, 'ksatria888@gmail.com', 'nivek', 3333333, '$2b$10$4m5gYQgx5fU7/eVIgFPkSu4np5frLyxajqWb4yJ4GNZR.6QqPLXce', NULL, NULL, 0),
(8, 'ksatria888@gmail.com', 'nivek', 895421111, '$2b$10$FLMobG5vZkQXqnG2tV5wEONvv1yHFCd9/usejUf6QhYsSXz/Gz/aW', NULL, NULL, 0),
(9, 'ksatria888@gmail.com', 'nivek', 895421111, '$2b$10$zxXIX6teoWUB3uNEd.N/J.t91t72IvxPiJZGTLq6w2x3chLnc7ACa', NULL, NULL, 0),
(10, 'ksatria888@gmail.com', 'nivek', 895421111, '$2b$10$6g/8BF/Hnd.J0iKkldXQHOBBW.c9fUi7AZgERl.s8UBtoxPLR7Ba6', NULL, NULL, 0),
(11, 'ksatria889@gmail.com', 'Kevin Satria2', 895421111, '$2b$10$GBGZgW94Lh8A1vCZbrPH.eAD7dMmXcGfLAgx22uMWkUGTILx/Etnq', NULL, NULL, 0),
(22, 'ksatria889@gmail.com', 'Kevin Satria2', 895421111, '$2b$10$PPtdt8k.P6s9Mp7F9zyTSuq7k.HC54z121eF4EVV6uYzoA92UT8sS', NULL, '5637808c-42be-49c0-90a6-1d57c3a9920c', 0),
(23, 'kevinsatriacorp@gmail.com', 'Kevin Satria2', 895421111, '$2b$10$b9CqvcaXZZXbwJ3H60LnHuthYzCcvoxeqathQ5tL6GeGGs1Wv0rw6', '1746413943063-455102640.jpg', NULL, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
