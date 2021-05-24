-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2021 at 09:01 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `psh_game_score_table`
--

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `Id` int(255) NOT NULL,
  `Nickname` varchar(255) NOT NULL,
  `Picture` varchar(255) NOT NULL,
  `CreationDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`Id`, `Nickname`, `Picture`, `CreationDate`) VALUES
(1, 'Test', 'https://randomuser.me/api/portraits/thumb/women/37.jpg', '2021-05-20 10:50:57'),
(2, 'Test2', 'https://randomuser.me/api/portraits/thumb/men/31.jpg', '2021-05-20 11:08:21'),
(3, 'Test3', 'https://randomuser.me/api/portraits/thumb/women/83.jpg', '2021-05-21 15:57:43'),
(4, 'Test4', 'https://randomuser.me/api/portraits/thumb/women/37.jpg', '2021-05-21 18:20:12'),
(5, 'blackfrog272', 'https://randomuser.me/api/portraits/thumb/women/75.jpg', '2021-05-21 19:50:04'),
(6, 'blackbutterfly405', 'https://randomuser.me/api/portraits/thumb/women/47.jpg', '2021-05-21 20:01:01'),
(7, 'purplekoala981', 'https://randomuser.me/api/portraits/thumb/women/22.jpg', '2021-05-21 20:04:30'),
(8, 'orangebutterfly149', 'https://randomuser.me/api/portraits/thumb/women/23.jpg', '2021-05-22 09:56:57'),
(9, 'ticklishrabbit796', 'https://randomuser.me/api/portraits/thumb/women/63.jpg', '2021-05-22 09:59:57'),
(10, 'bigmouse800', 'https://randomuser.me/api/portraits/thumb/women/42.jpg', '2021-05-22 10:01:28');

-- --------------------------------------------------------

--
-- Table structure for table `scoreboard`
--

CREATE TABLE `scoreboard` (
  `Id` int(11) NOT NULL,
  `PlayerId` int(11) NOT NULL,
  `Score` int(11) NOT NULL,
  `CreationDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `scoreboard`
--

INSERT INTO `scoreboard` (`Id`, `PlayerId`, `Score`, `CreationDate`) VALUES
(1, 1, 23, '2021-05-20 11:15:05'),
(2, 3, 57, '2021-05-21 15:58:14'),
(3, 2, 97, '2021-05-21 15:58:26'),
(4, 4, 82, '2021-05-21 20:00:19'),
(5, 5, 7, '2021-05-21 20:00:19'),
(6, 6, 81, '2021-05-21 20:01:02'),
(7, 7, 96, '2021-05-21 20:04:30'),
(8, 8, 90, '2021-05-22 09:56:57'),
(9, 9, 27, '2021-05-22 10:01:28'),
(10, 10, 20, '2021-05-22 10:01:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `scoreboard`
--
ALTER TABLE `scoreboard`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `PlayerId` (`PlayerId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `scoreboard`
--
ALTER TABLE `scoreboard`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `scoreboard`
--
ALTER TABLE `scoreboard`
  ADD CONSTRAINT `FK_Player_Id` FOREIGN KEY (`PlayerId`) REFERENCES `players` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
