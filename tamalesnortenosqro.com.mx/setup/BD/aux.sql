-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 02, 2021 at 02:44 PM
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

CREATE TABLE `admin` (
  `idAdmin` int(11) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `apellidos` varchar(60) DEFAULT NULL,
  `correoElectronico` varchar(100) DEFAULT NULL,
  `password` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `admin`
  ADD PRIMARY KEY (`idAdmin`);

ALTER TABLE `admin`
  MODIFY `idAdmin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- Dumping data for table `cliente`
--
INSERT INTO `admin` (`nombre`, `apellidos`, `correoElectronico`, `password`) VALUES
('Javier', 'Martinez', 'javier@icloud.mx', '$2a$12$0/4ILwOUfk.Wes.ZYbK77uZJlolmt.czDGMEcC8pCrdVqsfzlH6/y');


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

ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idCliente`),
  ADD UNIQUE KEY `idCliente` (`idCliente`),
  ADD UNIQUE KEY `correoElectronico` (`correoElectronico`),
  ADD KEY `idDistribucion` (`idDistribucion`);

ALTER TABLE `cliente`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2001;

--
-- Dumping data for table `cliente`
--
INSERT INTO `cliente` (`nombre`, `apellidos`, `direccion`, `correoElectronico`, `referenciaDomicilio`, `telefono`, `idDistribucion`, `password`) VALUES
('Javier', 'Martinez', 'Av Eugenio Garza Sada 628', 'javier@itesm.mx', 'Enfrente al Tec de Monterrey', '4499048658', 8384, '$2a$12$0/4ILwOUfk.Wes.ZYbK77uZJlolmt.czDGMEcC8pCrdVqsfzlH6/y'),
('Aldomar', 'Ramirez', '19 Pond street', 'aldomar@itesm.mx', 'Portón blanco', '4429587468', 8391, '$2a$12$CLlZWcUOeSe1aj/vrqEn3udu7QadjovsBKzi41SQP7wxHtnnPwlj2');



CREATE TABLE `distribucion` (
  `idDistribucion` int(11) NOT NULL,
  `diaDeEntrega` varchar(15) DEFAULT NULL,
  `nombreDeColonia` varchar(50) DEFAULT NULL,
  `horaInicioEntrega` time DEFAULT NULL,
  `horaFinalEntrega` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `distribucion`
  ADD PRIMARY KEY (`idDistribucion`);
  
ALTER TABLE `distribucion`
  MODIFY `idDistribucion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8384;

INSERT INTO `distribucion` (`diaDeEntrega`, `nombreDeColonia`, `horaInicioEntrega`, `horaFinalEntrega`) VALUES
('Viernes', 'Tejeda', '17:00:00', '19:00:00'),
('Miercoles', 'Jurica', '17:00:00', '19:00:00'),
('Jueves', 'El Refugio', '17:00:00', '19:00:00'),
('Sábado', 'Juriquilla', '17:00:00', '19:00:00'),
('Jueves', 'La Vista', '17:00:00', '19:00:00'),
('Viernes', 'Sonterra', '17:00:00', '19:00:00'),
('Viernes', 'Balvanegra', '17:00:00', '19:00:00'),
('Miercoles', 'Zibata', '17:00:00', '19:00:00'),
('Jueves', 'Zakia', '17:00:00', '19:00:00'),
('Viernes', 'Vista Real', '17:00:00', '19:00:00'),
('Viernes', 'Mirador', '17:00:00', '19:00:00'),
('Viernes', 'Milenio', '17:00:00', '19:00:00'),
('Lunes', 'Campanario', '19:00:00', '20:00:00'),
('Miercoles', 'Cimatario', '17:00:00', '19:00:00');
-- --------------------------------------------------------
--
-- Table structure for table `pedido`
--
CREATE TABLE `pedido` (
  `idPedido` int(11) NOT NULL,
  `etiqueta` int(11) DEFAULT NULL,
  `diaEntrega` varchar(200) DEFAULT NULL,
  `estatus` varchar(50) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `tipoDeEntrega` varchar(200) DEFAULT NULL,
  `cantidadTotal` int(11) DEFAULT NULL,
  `costoTotal` float DEFAULT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idPromocion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `pedido`
  ADD PRIMARY KEY (`idPedido`),
  ADD KEY `idPromocion` (`idPromocion`),
  ADD KEY `idCliente` (`idCliente`);

ALTER TABLE `pedido`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;

-- --------------------------------------------------------


CREATE TABLE `pedidoproducto` (
  `idProducto` int(11) NOT NULL,
  `idPedido` int(11) NOT NULL,
  `fechaPedido` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cantidadPorProducto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `pedidoproducto`
  ADD PRIMARY KEY (`idProducto`,`idPedido`,`fechaPedido`),
  ADD KEY `idProducto` (`idProducto`),
  ADD KEY `idPedido` (`idPedido`);


-- --------------------------------------------------------


CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `nombreProducto` varchar(80) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `existencia` int(11) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `imagenProducto` varchar(200) DEFAULT NULL,
  `sku` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`);

INSERT INTO `producto` (`idProducto`, `nombreProducto`, `precio`, `existencia`, `descripcion`, `imagenProducto`, `sku`) VALUES
(1, 'Colorado', 17, 10, 'Masa hidratada con un ligero color rojizo relleno de carne de cerdo desmenuzada guisada con chile guajillo', 'img/tamales-sabor-4.png', 'colorado'),
(2, 'Verde de pollo', 17, 10, 'Masa delgada, rellena con pollo desmenuzado en salsa verde', 'img/tamales-sabor-2.png', 'verde'),
(3, 'Rajas con queso', 17, 10, 'Masa rellena de rajas en escabeche con queso panela', 'img/tamales-sabor-5.png', 'rajas'),
(4, 'Chicharron', 17, 10, 'Tamal de masa muy delgada relleno de un guiso de chicharrón tipo carnitas', 'img/tamales-sabor-3.png', 'chicharron'),
(5, 'Frijoles norteños', 17, 10, 'Masa delgada rellena de frijoles norteños (guisado con chile guajillo) y queso panela', 'img/tamales-sabor-6.png', 'frijoles'),
(6, 'Dulce', 17, 10, 'Tamal con pasas, coco y naranja, sin colorantes', 'img/tamales-sabor-1.png', 'dulce');

ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
-- --------------------------------------------------------

--
-- Table structure for table `promocion`
--

CREATE TABLE `promocion` (
  `idPromocion` int(11) NOT NULL,
  `descripcion` varchar(80) DEFAULT NULL,
  `fechaInicio` date DEFAULT NULL,
  `fechaFinal` date DEFAULT NULL,
  `imagenPromocion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `promocion`
  ADD PRIMARY KEY (`idPromocion`);

ALTER TABLE `promocion`
  MODIFY `idPromocion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=502;

INSERT INTO `promocion` (`idPromocion`, `descripcion`, `fechaInicio`, `fechaFinal`, `imagenPromocion`) VALUES
(2001, ' 2 x 1 en tamales dulces', '2021-05-20', '2021-06-20', 'img/tamales-promocion-1.jpg');








