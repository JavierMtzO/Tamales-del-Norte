-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 07, 2021 at 07:02 AM
-- Server version: 5.7.26
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `tamalesnortenos`
--

-- --------------------------------------------------------

--
-- Table structure for table `promocion`
--

CREATE TABLE `promocion` (
  `idPromocion` int(11) NOT NULL,
  `descripcion` varchar(80) DEFAULT NULL,
  `imagenPromocion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `promocion`
ADD UNIQUE KEY `idPromocion` (`idPromocion`),
  ADD PRIMARY KEY (`idPromocion`);
ALTER TABLE `promocion`
  MODIFY `idPromocion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2001;
--
-- Dumping data for table `promocion`
--

INSERT INTO `promocion` (`descripcion`, `imagenPromocion`) VALUES
(' 2 x 1 en tamales dulces','img/tamales-promocion-2.jpg');


