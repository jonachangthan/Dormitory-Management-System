-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3306
-- 產生時間： 2023-05-27 19:52:28
-- 伺服器版本： 10.4.25-MariaDB
-- PHP 版本： 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `dormitory_management_system`
--

-- --------------------------------------------------------

--
-- 資料表結構 `account`
--

CREATE TABLE `account` (
  `ID` int(10) NOT NULL,
  `UserName` varchar(15) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Permission` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `account`
--

INSERT INTO `account` (`ID`, `UserName`, `Password`, `Permission`) VALUES
(1, 'a1095500', '$2a$10$YciSZdHmSv0f0FYg/YB5d.wFERjJkrFJc5Z3b4iPI1D4gNPuC5rmK', 0),
(2, '123', '$2a$10$DZrpcpODSuoayldJsRCUNOA8vq03TlVO4yNJJBXpFvAS4XWpqmm3.', 1),
(3, 'def', '$2a$10$cphR.s3cqCQyj9adfbv/I.30oxU8aJtsBeNYU0P0DewqUdrK2chQe', 0),
(4, 'a', '$2a$10$uJ3iIrxKvhDIH86U39kaXO81ZaxnUuPsi4fep2owDd61WLeTFkjSi', 0);

-- --------------------------------------------------------

--
-- 資料表結構 `application`
--

CREATE TABLE `application` (
  `A_Number` int(15) NOT NULL,
  `A_Academic_Year` int(3) NOT NULL,
  `A_Semester` char(1) NOT NULL,
  `A_Date` date NOT NULL,
  `A_Approval` int(1) NOT NULL,
  `A_Bill` int(8) NOT NULL,
  `A_Student_ID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `application`
--

INSERT INTO `application` (`A_Number`, `A_Academic_Year`, `A_Semester`, `A_Date`, `A_Approval`, `A_Bill`, `A_Student_ID`) VALUES
(1, 111, '上', '2022-05-15', 1, 0, 'a'),
(2, 111, '上', '2022-12-08', 0, 0, 'b'),
(13, 111, '上', '2023-01-07', 1, 0, 'def');

-- --------------------------------------------------------

--
-- 資料表結構 `bulletin`
--

CREATE TABLE `bulletin` (
  `B_Number` int(4) NOT NULL,
  `B_Content` varchar(100) NOT NULL,
  `B_Date` date NOT NULL,
  `B_Time` time NOT NULL,
  `B_Manager_ID` varchar(10) NOT NULL,
  `B_Title` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `bulletin`
--

INSERT INTO `bulletin` (`B_Number`, `B_Content`, `B_Date`, `B_Time`, `B_Manager_ID`, `B_Title`) VALUES
(42, '這個', '2022-12-30', '21:03:16', '123', NULL),
(43, '這個2\r\n', '2022-12-30', '21:03:46', '123', NULL),
(44, '這個3', '2022-12-30', '21:05:26', '123', '那個2'),
(45, 'sdfg', '2022-12-30', '21:07:22', '123', 'sdfg'),
(46, 'dghsdf', '2022-12-30', '21:07:47', '123', 'dfsg'),
(47, 'sdfhsh', '2022-12-30', '21:10:43', '123', 'sfgdfs'),
(48, 'fdghjddfg', '2022-12-30', '21:11:12', '123', 'dfghsdfg'),
(49, 'gfhdfg', '2022-12-30', '21:14:09', '123', 'sdagfdgh'),
(50, 'gsgfdhdfg', '2022-12-30', '21:16:57', '123', 'sdfghsdf'),
(51, 'asdgfasdg', '2022-12-30', '21:17:57', '123', 'sdfasd'),
(52, 'gsfhfg', '2022-12-30', '21:19:06', '123', 'fdghdfs'),
(53, 'dsfghdfh', '2022-12-30', '21:20:51', '123', 'dsfgsdfg'),
(54, 'dfh', '2022-12-30', '21:22:50', '123', 'dfg'),
(56, '內容', '2023-01-06', '21:44:51', '123', '標題'),
(57, '內容2', '2023-01-06', '21:47:12', '123', '標題2'),
(58, '內容3', '2023-01-06', '21:50:00', '123', '標題3'),
(59, '內\'榮4', '2023-01-06', '21:51:21', '123', '標題4');

-- --------------------------------------------------------

--
-- 資料表結構 `dormitory`
--

CREATE TABLE `dormitory` (
  `D_Number` int(3) NOT NULL,
  `D_Building_No` int(3) NOT NULL,
  `D_Capacity` int(2) NOT NULL,
  `D_Cost` int(8) NOT NULL,
  `D_Current_Quantity` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `dormitory`
--

INSERT INTO `dormitory` (`D_Number`, `D_Building_No`, `D_Capacity`, `D_Cost`, `D_Current_Quantity`) VALUES
(1, 1, 4, 8800, 0),
(1, 2, 4, 5544422, 4),
(1, 3, 4, 10, 0),
(1, 4, 5, 123321, 5),
(1, 5, 6, 95624, 1),
(2, 1, 4, 8800, 2),
(2, 2, 4, 5544422, 4),
(2, 3, 4, 10, 0),
(2, 4, 5, 123321, 5),
(2, 5, 6, 95624, 0),
(3, 1, 4, 8800, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `dormitory_building`
--

CREATE TABLE `dormitory_building` (
  `DB_Number` int(3) NOT NULL,
  `DB_Name` varchar(20) NOT NULL,
  `DB_Manager_ID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `dormitory_building`
--

INSERT INTO `dormitory_building` (`DB_Number`, `DB_Name`, `DB_Manager_ID`) VALUES
(1, '學生第一宿舍(OA-男)', '123'),
(2, '學生第一宿舍(OB-女)', '234'),
(3, '學生第二宿舍(OE-男)', '123'),
(4, '學生第二宿舍(OF-女)', '234'),
(5, '綜合宿舍(B01-男)', '123');

-- --------------------------------------------------------

--
-- 資料表結構 `equipment`
--

CREATE TABLE `equipment` (
  `E_Number` int(5) NOT NULL,
  `E_Type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `equipment`
--

INSERT INTO `equipment` (`E_Number`, `E_Type`) VALUES
(1, '椅子'),
(2, '桌子'),
(3, '電視'),
(11, '冷氣'),
(13, '冷氣遙控器');

-- --------------------------------------------------------

--
-- 資料表結構 `equipment_in_dormitory`
--

CREATE TABLE `equipment_in_dormitory` (
  `E_D_Dormitory_No` int(3) NOT NULL,
  `E_D_Building_No` int(3) NOT NULL,
  `E_D_Equipment_No` int(5) NOT NULL,
  `E_D_Quantity` int(5) NOT NULL,
  `E_D_Condition` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `equipment_in_dormitory`
--

INSERT INTO `equipment_in_dormitory` (`E_D_Dormitory_No`, `E_D_Building_No`, `E_D_Equipment_No`, `E_D_Quantity`, `E_D_Condition`) VALUES
(1, 1, 1, 4, '3號椅子損毀'),
(1, 1, 2, 3, '沒壞，我打辛酸的'),
(1, 1, 3, 1, '');

-- --------------------------------------------------------

--
-- 資料表結構 `manager`
--

CREATE TABLE `manager` (
  `M_ID` varchar(10) NOT NULL,
  `M_Phone` varchar(10) NOT NULL,
  `M_Name` varchar(10) NOT NULL,
  `M_Email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `manager`
--

INSERT INTO `manager` (`M_ID`, `M_Phone`, `M_Name`, `M_Email`) VALUES
('123', '45646546', '123', 'sdfgsd'),
('234', '234', '234', '234'),
('a1095500', '912345678', '測試人員', 'a1095500manager@gmail.com');

-- --------------------------------------------------------

--
-- 資料表結構 `message`
--

CREATE TABLE `message` (
  `M_Number` int(4) NOT NULL,
  `M_Content` varchar(100) NOT NULL,
  `M_Date` date NOT NULL,
  `M_Time` time NOT NULL,
  `M_Student_ID` varchar(10) NOT NULL,
  `M_Title` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `message`
--

INSERT INTO `message` (`M_Number`, `M_Content`, `M_Date`, `M_Time`, `M_Student_ID`, `M_Title`) VALUES
(2, 'gfhfgsd', '2022-12-25', '16:06:25', 'a', NULL),
(3, 'fhgg', '2022-12-25', '16:11:17', 'a', NULL),
(4, 'hgfh', '2022-12-30', '22:40:13', 'def', 'fdsg'),
(5, '留言', '2022-12-30', '22:41:27', 'def', 'fsdg'),
(6, '內容', '2023-01-06', '21:52:20', 'def', '標題'),
(7, '內容2', '2023-01-06', '21:53:18', 'def', '標題2');

-- --------------------------------------------------------

--
-- 資料表結構 `student`
--

CREATE TABLE `student` (
  `S_ID` varchar(10) NOT NULL,
  `S_Department` varchar(10) NOT NULL,
  `S_Name` varchar(10) NOT NULL,
  `S_Academic_Year` int(3) NOT NULL,
  `S_Email` varchar(20) NOT NULL,
  `S_Phone` varchar(10) NOT NULL,
  `S_Sex` char(1) NOT NULL,
  `S_Dormitory_No` int(3) DEFAULT NULL,
  `S_Building_No` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `student`
--

INSERT INTO `student` (`S_ID`, `S_Department`, `S_Name`, `S_Academic_Year`, `S_Email`, `S_Phone`, `S_Sex`, `S_Dormitory_No`, `S_Building_No`) VALUES
('a', '西洋語文學系', 'b', 111, 'd', '0', '男', 2, 1),
('A1095517', '生命科學系', '黃', 111, 'd', '900000000', '男', NULL, NULL),
('b', '運動競技學系', 's', 109, 'fg', '0', '女', NULL, NULL),
('def', '建築學系', 'ds', 111, 'dsaf@gmail.com', '123215', '男', 1, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `violation_record`
--

CREATE TABLE `violation_record` (
  `VR_Number` int(5) NOT NULL,
  `VR_Date` date NOT NULL,
  `VR_Content` varchar(50) NOT NULL,
  `VR_Penalty` varchar(50) NOT NULL,
  `VR_Student_ID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `violation_record`
--

INSERT INTO `violation_record` (`VR_Number`, `VR_Date`, `VR_Content`, `VR_Penalty`, `VR_Student_ID`) VALUES
(1, '2222-12-12', 'bad', 'good', 'b'),
(2, '2022-12-14', 'asdgafdhdfhhadfgh', 'dafhdfghd', 'a'),
(8, '2222-12-12', '愛嘴砲', '大過一隻隻', 'def');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`ID`);

--
-- 資料表索引 `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`A_Number`),
  ADD KEY `A_Student_ID` (`A_Student_ID`);

--
-- 資料表索引 `bulletin`
--
ALTER TABLE `bulletin`
  ADD PRIMARY KEY (`B_Number`),
  ADD KEY `B_Manager_ID` (`B_Manager_ID`);

--
-- 資料表索引 `dormitory`
--
ALTER TABLE `dormitory`
  ADD PRIMARY KEY (`D_Number`,`D_Building_No`),
  ADD KEY `D_Building_No` (`D_Building_No`);

--
-- 資料表索引 `dormitory_building`
--
ALTER TABLE `dormitory_building`
  ADD PRIMARY KEY (`DB_Number`),
  ADD KEY `DB_Manager_ID` (`DB_Manager_ID`);

--
-- 資料表索引 `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`E_Number`);

--
-- 資料表索引 `equipment_in_dormitory`
--
ALTER TABLE `equipment_in_dormitory`
  ADD PRIMARY KEY (`E_D_Dormitory_No`,`E_D_Building_No`,`E_D_Equipment_No`),
  ADD KEY `E_D_Equipment_No` (`E_D_Equipment_No`);

--
-- 資料表索引 `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`M_ID`);

--
-- 資料表索引 `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`M_Number`),
  ADD KEY `M_Student_ID` (`M_Student_ID`);

--
-- 資料表索引 `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`S_ID`),
  ADD KEY `S_Dormitory_No` (`S_Dormitory_No`,`S_Building_No`);

--
-- 資料表索引 `violation_record`
--
ALTER TABLE `violation_record`
  ADD PRIMARY KEY (`VR_Number`),
  ADD KEY `VR_Student_ID` (`VR_Student_ID`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `account`
--
ALTER TABLE `account`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `application`
--
ALTER TABLE `application`
  MODIFY `A_Number` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `bulletin`
--
ALTER TABLE `bulletin`
  MODIFY `B_Number` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `equipment`
--
ALTER TABLE `equipment`
  MODIFY `E_Number` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `message`
--
ALTER TABLE `message`
  MODIFY `M_Number` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `violation_record`
--
ALTER TABLE `violation_record`
  MODIFY `VR_Number` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `application`
--
ALTER TABLE `application`
  ADD CONSTRAINT `application_ibfk_1` FOREIGN KEY (`A_Student_ID`) REFERENCES `student` (`S_ID`) ON DELETE CASCADE;

--
-- 資料表的限制式 `bulletin`
--
ALTER TABLE `bulletin`
  ADD CONSTRAINT `bulletin_ibfk_1` FOREIGN KEY (`B_Manager_ID`) REFERENCES `manager` (`M_ID`);

--
-- 資料表的限制式 `dormitory`
--
ALTER TABLE `dormitory`
  ADD CONSTRAINT `dormitory_ibfk_1` FOREIGN KEY (`D_Building_No`) REFERENCES `dormitory_building` (`DB_Number`);

--
-- 資料表的限制式 `dormitory_building`
--
ALTER TABLE `dormitory_building`
  ADD CONSTRAINT `dormitory_building_ibfk_1` FOREIGN KEY (`DB_Manager_ID`) REFERENCES `manager` (`M_ID`);

--
-- 資料表的限制式 `equipment_in_dormitory`
--
ALTER TABLE `equipment_in_dormitory`
  ADD CONSTRAINT `equipment_in_dormitory_ibfk_1` FOREIGN KEY (`E_D_Dormitory_No`,`E_D_Building_No`) REFERENCES `dormitory` (`D_Number`, `D_Building_No`),
  ADD CONSTRAINT `equipment_in_dormitory_ibfk_2` FOREIGN KEY (`E_D_Equipment_No`) REFERENCES `equipment` (`E_Number`);

--
-- 資料表的限制式 `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`M_Student_ID`) REFERENCES `student` (`S_ID`) ON DELETE NO ACTION;

--
-- 資料表的限制式 `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`S_Dormitory_No`,`S_Building_No`) REFERENCES `dormitory` (`D_Number`, `D_Building_No`);

--
-- 資料表的限制式 `violation_record`
--
ALTER TABLE `violation_record`
  ADD CONSTRAINT `violation_record_ibfk_1` FOREIGN KEY (`VR_Student_ID`) REFERENCES `student` (`S_ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
