-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 07, 2021 at 11:57 AM
-- Server version: 5.7.26
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `tamalesnortenos`
--

-- --------------------------------------------------------

--
-- Table structure for table `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `nombreProducto` varchar(80) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `imagenProducto` varchar(200) DEFAULT NULL,
  `sku` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `producto`
  ADD UNIQUE KEY `idProducto` (`idProducto`);

ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Dumping data for table `producto`
--

INSERT INTO `producto` (`nombreProducto`, `precio`, `descripcion`, `imagenProducto`, `sku`) VALUES
('Colorado', 17, 'Masa hidratada con un ligero color rojizo relleno de carne de cerdo desmenuzada guisada con chile guajillo', 'img/tamales-sabor-4.png', 'colorado'),
('Verde de pollo  ', 17, 'Masa delgada, rellena con pollo desmenuzado en salsa verde', 'img/tamales-sabor-2.png', 'verde'),
('Rajas con queso', 17, 'Masa rellena de rajas en escabeche con queso panela', 'img/tamales-sabor-5.png', 'rajas'),
('Chicharrón  ', 17, 'Tamal de masa muy delgada relleno de un guiso de chicharrón tipo migas', 'img/tamales-sabor-3.png', 'chicharron'),
('Frijoles norteños', 17, 'Masa delgada rellena de frijoles norteños (guisado con chile guajillo) y queso panela', 'img/tamales-sabor-6.png', 'frijoles'),
('Dulce', 17, 'Tamal con pasas, coco y naranja, sin colorantes', 'img/tamales-sabor-1.png', 'dulce');


