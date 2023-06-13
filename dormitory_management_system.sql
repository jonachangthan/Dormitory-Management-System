-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3306
-- 產生時間： 2023-06-13 19:44:11
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
  `UserName` varchar(10) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Permission` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `account`
--

INSERT INTO `account` (`UserName`, `Password`, `Permission`) VALUES
('123', '$2a$10$DZrpcpODSuoayldJsRCUNOA8vq03TlVO4yNJJBXpFvAS4XWpqmm3.', 1),
('a1095504', '$2a$10$fxklp2YfzUbLKN7h/xX0vuh1B0CSWuz90u3whAQYWF0SpODzloXgG', 0),
('a1095505', '$2a$10$Mo2NUYl/2nU77tgWPyiSG.paOi85lfRxGAux12YnJiDfsPK98rKtS', 2),
('a1095517', '$2a$10$GN3qI/HAG5BeMCIvE7c8lunzRFbytAOFxPSJsChZ/mIuw354x7ac.', 2),
('a1095557', '$2a$10$s2HO98e2.vcFGGmADv796OXT7jFlCpSXPfjbrSw.7ZuCcOWnP2DOO', 0);

-- --------------------------------------------------------

--
-- 資料表結構 `application`
--

CREATE TABLE `application` (
  `A_Number` int(15) NOT NULL,
  `A_Date` date NOT NULL,
  `A_Approval` int(1) NOT NULL,
  `A_Bill` int(8) NOT NULL,
  `A_Student_ID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `application`
--

INSERT INTO `application` (`A_Number`, `A_Date`, `A_Approval`, `A_Bill`, `A_Student_ID`) VALUES
(25, '2023-06-13', 2, 0, 'a1095504'),
(27, '2023-06-13', 1, 0, 'a1095557');

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
(57, 'modify by 123', '2023-01-06', '21:47:12', '123', ' modify'),
(60, 'test tt', '2023-06-08', '22:13:53', '123', '123 test'),
(73, 'ㄚㄚㄚ ㄚㄚㄚㄚㄚㄚ', '2023-06-13', '01:10:52', '123', '超商浩克');

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
(0, 6, 4, 9200, 0),
(1, 1, 4, 8800, 1),
(1, 2, 4, 9200, 4),
(1, 3, 4, 9600, 0),
(1, 4, 5, 10000, 5),
(1, 5, 6, 10400, 2),
(1, 6, 4, 9200, 0),
(2, 1, 4, 8800, 2),
(2, 2, 4, 9200, 2),
(2, 3, 4, 9600, 0),
(2, 4, 5, 10000, 5),
(2, 5, 6, 10400, 1),
(3, 1, 4, 8800, 2),
(3, 2, 4, 9200, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `dormitory_building`
--

CREATE TABLE `dormitory_building` (
  `DB_Number` int(3) NOT NULL,
  `DB_Name` varchar(20) NOT NULL,
  `DB_Manager_ID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `dormitory_building`
--

INSERT INTO `dormitory_building` (`DB_Number`, `DB_Name`, `DB_Manager_ID`) VALUES
(1, '學生第一宿舍(OA-男)', 'a1095517'),
(2, ' 學生第一宿舍(OB-女)', 'a1095505'),
(3, ' 學生第二宿舍(OE-男)', 'a1095517'),
(4, ' 學生第二宿舍(OF-女)', 'a1095505'),
(5, ' 綜合宿舍(B01-男)', 'a1095517'),
(6, '太牛逼了大樓', 'a1095505');

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
(13, '冷氣遙控器'),
(15, '櫃子');

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
(1, 1, 2, 3, ''),
(1, 1, 3, 1, 'test2'),
(3, 2, 15, 2, '');

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
('123', '0912123122', '123', 'a1095550manager@gmail.com'),
('a1095505', '0905005005', '張家展', 'a1095505@mail.nuk.edu.tw'),
('a1095517', '0917117117', '黃鴻銘', 'a1095517@mail.nuk.edu.tw');

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
(14, '乳題', '2023-06-12', '03:09:12', 'a1095505', '地板有水'),
(15, '乳題', '2023-06-13', '00:58:34', 'a1095505', '真的假的???');

-- --------------------------------------------------------

--
-- 資料表結構 `student`
--

CREATE TABLE `student` (
  `S_ID` varchar(10) NOT NULL,
  `S_Department` varchar(10) NOT NULL,
  `S_Name` varchar(10) NOT NULL,
  `S_Academic_Year` varchar(30) NOT NULL,
  `S_Email` varchar(100) NOT NULL,
  `S_Phone` varchar(10) NOT NULL,
  `S_Sex` char(1) NOT NULL,
  `S_Dormitory_No` int(3) DEFAULT NULL,
  `S_Building_No` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `student`
--

INSERT INTO `student` (`S_ID`, `S_Department`, `S_Name`, `S_Academic_Year`, `S_Email`, `S_Phone`, `S_Sex`, `S_Dormitory_No`, `S_Building_No`) VALUES
('a1095504', '工藝與創意設計學系', '謝欣儀', '111', 'a1095504@mail.nuk.edu.tw', '0904004004', '男', 1, 1),
('a1095557', '亞太工商管理學系', '陳柏安', '112', 'a1095557@mail.nuk.edu.tw', '0912345678', '男', 3, 1);

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
(13, '2022-06-12', '愛嘴砲', '小過一支', 'a1095504');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`UserName`) USING BTREE;

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
  ADD KEY `D_Building_No` (`D_Building_No`) USING BTREE;

--
-- 資料表索引 `dormitory_building`
--
ALTER TABLE `dormitory_building`
  ADD PRIMARY KEY (`DB_Number`),
  ADD KEY `dormitory_building_ibfk_1` (`DB_Manager_ID`);

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
-- 使用資料表自動遞增(AUTO_INCREMENT) `application`
--
ALTER TABLE `application`
  MODIFY `A_Number` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `bulletin`
--
ALTER TABLE `bulletin`
  MODIFY `B_Number` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `equipment`
--
ALTER TABLE `equipment`
  MODIFY `E_Number` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `message`
--
ALTER TABLE `message`
  MODIFY `M_Number` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `violation_record`
--
ALTER TABLE `violation_record`
  MODIFY `VR_Number` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `application`
--
ALTER TABLE `application`
  ADD CONSTRAINT `application_ibfk_1` FOREIGN KEY (`A_Student_ID`) REFERENCES `account` (`UserName`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `bulletin`
--
ALTER TABLE `bulletin`
  ADD CONSTRAINT `bulletin_ibfk_1` FOREIGN KEY (`B_Manager_ID`) REFERENCES `account` (`UserName`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `dormitory`
--
ALTER TABLE `dormitory`
  ADD CONSTRAINT `dormitory_ibfk_1` FOREIGN KEY (`D_Building_No`) REFERENCES `dormitory_building` (`DB_Number`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `dormitory_building`
--
ALTER TABLE `dormitory_building`
  ADD CONSTRAINT `dormitory_building_ibfk_1` FOREIGN KEY (`DB_Manager_ID`) REFERENCES `account` (`UserName`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- 資料表的限制式 `equipment_in_dormitory`
--
ALTER TABLE `equipment_in_dormitory`
  ADD CONSTRAINT `equipment_in_dormitory_ibfk_1` FOREIGN KEY (`E_D_Dormitory_No`,`E_D_Building_No`) REFERENCES `dormitory` (`D_Number`, `D_Building_No`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equipment_in_dormitory_ibfk_2` FOREIGN KEY (`E_D_Equipment_No`) REFERENCES `equipment` (`E_Number`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `manager`
--
ALTER TABLE `manager`
  ADD CONSTRAINT `manager_ibfk_1` FOREIGN KEY (`M_ID`) REFERENCES `account` (`UserName`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`M_Student_ID`) REFERENCES `account` (`UserName`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`S_Dormitory_No`,`S_Building_No`) REFERENCES `dormitory` (`D_Number`, `D_Building_No`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `student_ibfk_2` FOREIGN KEY (`S_ID`) REFERENCES `account` (`UserName`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `violation_record`
--
ALTER TABLE `violation_record`
  ADD CONSTRAINT `violation_record_ibfk_1` FOREIGN KEY (`VR_Student_ID`) REFERENCES `account` (`UserName`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
