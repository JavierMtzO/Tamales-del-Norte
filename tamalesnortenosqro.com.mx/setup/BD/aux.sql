-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 19, 2021 at 12:26 AM
-- Server version: 5.7.26
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `tamalesnortenos`
--

-- --------------------------------------------------------

--
-- Table structure for table `cliente`
--

CREATE TABLE `cliente` (
  `idCliente` int(11) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `apellidos` varchar(60) DEFAULT NULL,
  `direccion` varchar(80) DEFAULT NULL,
  `correoElectronico` varchar(100) DEFAULT NULL,
  `referenciaDomicilio` varchar(200) DEFAULT NULL,
  `telefono` varchar(12) DEFAULT NULL,
  `idDistribucion` int(11) NOT NULL,
  `password` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cliente`
--

INSERT INTO `cliente` (`idCliente`, `nombre`, `apellidos`, `direccion`, `correoElectronico`, `referenciaDomicilio`, `telefono`, `idDistribucion`, `password`) VALUES
(1600, 'Eduardo', 'Blanco', 'Av. Industrias 403', 'Arbol de naranjas en la entrada', 'blanco@gmail.com', '4425998745\'', 8384, 'hola123'),
(1601, 'Eva', 'Espinoza', 'Himlaya 501', 'Al lado de un dentista', 'espinoza@gmail.com', '4425874126', 8385, 'hola123'),
(1602, 'Gemma', 'Frias', 'Constitucion 420', 'Atras del HEB', 'frias@gmail.com', '4425896354', 8386, 'hola123'),
(1603, 'Pablo', 'Farre', 'Av. Juarez 60', 'Casa rosa', 'farre@gmail.com', '4425893358', 8387, 'hola123'),
(1604, 'Samira', 'Llano', 'Av. Lopez Mateos 59', 'Casa con un domo', 'llano@gmail.com', '4425896542', 8388, 'hola123'),
(1605, 'Angelica', 'Ripol', 'Emiliano Zapata 83', 'Al lado de una pasteleria', 'ripol@gmail.com', '4425874569', 8389, 'hola123'),
(1606, 'Andrea', 'Zaragoza', '5 de Mayo 852', 'Puerta roja con negro', 'zaragoza@gmail.com', '4425896325', 8390, 'hola123'),
(1613, 'Javier', 'Martinez', 'Av Eugenio Garza Sada 628', 'javier@itesm.mx', 'Enfrente al Tec de Monterrey', '4499048658', 8384, '$2a$12$0/4ILwOUfk.Wes.ZYbK77uZJlolmt.czDGMEcC8pCrdVqsfzlH6/y'),
(1614, 'Aldomar', 'Ramirez', 'Av Eugenio Garza Sada 628', 'aldomar@itesm.mx', 'Portón amarillo', '4429568135', 8387, '$2a$12$v4HVmOCinl1jGE7.PBEc0OBBhccAq7fdgS8HXSHC6pFiW/omRnrLK');


ALTER TABLE `cliente`
  ADD KEY `idDistribucion` (`idDistribucion`);


ALTER TABLE `cliente`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1615;


SELECT cantidadPorProducto, idProducto, fechaPedido
FROM pedidoproducto
WHERE idPedido = 10017;

SELECT diaDeEntrega
FROM distribucion d, pedido p, cliente c
WHERE p.idCliente = c.idCliente
AND d.idDistribucion = c.idDistribucion
AND idPedido = 10016

SELECT horaInicioEntrega
FROM distribucion d, pedido p, cliente c
WHERE p.idCliente = c.idCliente
AND d.idDistribucion = c.idDistribucion
AND idPedido = 10016

SELECT horaFinalEntrega FROM distribucion d, pedido p, cliente c WHERE p.idCliente = c.idCliente AND d.idDistribucion = c.idDistribucion AND idPedido = 10016

UPDATE pedido SET etiqueta = '20017' WHERE idPedido = 10027;