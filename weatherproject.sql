-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2023 at 05:52 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `weatherproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `cityhistory`
--

CREATE TABLE `cityhistory` (
  `cityname` varchar(50) NOT NULL,
  `requesttime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cityhistory`
--

INSERT INTO `cityhistory` (`cityname`, `requesttime`) VALUES
('Shanghai', '2023-05-23 01:15:20'),
('Mumbai', '2023-05-23 01:16:04'),
('Moscow', '2023-05-23 01:18:53'),
('Jeddah', '2023-05-23 01:19:47'),
('Rajshahi', '2023-05-23 20:02:42'),
('Barcelona', '2023-05-24 09:28:31'),
('Melbourne', '2023-05-24 09:32:04'),
('Virginia', '2023-05-24 09:34:27'),
('Germany', '2023-05-24 09:41:32'),
('dortmund', '2023-05-24 09:42:26'),
('dortmund', '2023-05-24 09:44:45'),
('Virginia', '2023-05-24 09:45:01'),
('dortmund', '2023-05-24 09:45:14'),
('Tokyo', '2023-05-24 09:49:21'),
('Chittagong', '2023-05-24 09:49:38'),
('Khulna', '2023-05-24 09:49:46'),
('Mumbai', '2023-05-24 09:50:02'),
('Bangalore', '2023-05-24 09:50:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cityhistory`
--
ALTER TABLE `cityhistory`
  ADD PRIMARY KEY (`requesttime`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
