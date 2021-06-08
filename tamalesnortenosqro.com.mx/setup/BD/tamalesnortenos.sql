-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 07, 2021 at 01:18 PM
-- Server version: 5.7.26
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `tamalesnortenos`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `idAdmin` int(11) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `apellidos` varchar(60) DEFAULT NULL,
  `correoElectronico` varchar(100) DEFAULT NULL,
  `password` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`idAdmin`, `nombre`, `apellidos`, `correoElectronico`, `password`) VALUES
(51, 'Javier', 'Martinez', 'javier@icloud.com', '$2a$12$Yj7DzowrzEP8F.5LEU.kqO7dVkCt60A8bmvGt/rqTGH5VgJu4hFaG'),
(52, 'Aldomar', 'Ramírez', 'aldomar.rm@gmail.com', '$2a$12$8c5pB8WmwLPvMmwT2Y869.X.I1PoI4UNk5hjO9ggVWa6vfkvecYTG');

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
  `telefono` varchar(30) DEFAULT NULL,
  `idDistribucion` int(11) NOT NULL,
  `password` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cliente`
--

INSERT INTO `cliente` (`idCliente`, `nombre`, `apellidos`, `direccion`, `correoElectronico`, `referenciaDomicilio`, `telefono`, `idDistribucion`, `password`) VALUES
(2001, 'Javier', 'Martinez', 'Av Eugenio Garza Sada 628', 'javier@itesm.mx', 'Enfrente al Tec de Monterrey', '4499048658', 8387, '$2a$12$D1VoemwXKmGG/l5N95b57eMg1jL1EIiiykM82Dr17oyPgw9/MRpkK'),
(2002, 'Aldomar', 'Ramirez', '19 Pond street', 'aldomar@itesm.mx', 'Portón blanco', '4429587468', 8391, '$2a$12$CLlZWcUOeSe1aj/vrqEn3udu7QadjovsBKzi41SQP7wxHtnnPwlj2'),
(2003, 'Selene', 'Morales Martin del Campo', '\"Blvd. Chichimeco 2009 San Antonio de los Horcones 20900 Jesus María, Ags.\"', 'selene@itesm.mx', 'Caseta de departamentos azúl', '+52442789034', 8387, '$2a$12$2P1bqLNmxuFH.ZFVDZuZa.1R/jMg0njceBmhO4WscViZXiBpUKl.C');

-- --------------------------------------------------------

--
-- Table structure for table `distribucion`
--

CREATE TABLE `distribucion` (
  `idDistribucion` int(11) NOT NULL,
  `diaDeEntrega` varchar(15) DEFAULT NULL,
  `nombreDeColonia` varchar(50) DEFAULT NULL,
  `horaInicioEntrega` time DEFAULT NULL,
  `horaFinalEntrega` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `distribucion`
--

INSERT INTO `distribucion` (`idDistribucion`, `diaDeEntrega`, `nombreDeColonia`, `horaInicioEntrega`, `horaFinalEntrega`) VALUES
(8384, 'Viernes', 'Tejeda', '17:00:00', '19:00:00'),
(8385, 'Miercoles', 'Jurica', '17:00:00', '19:00:00'),
(8386, 'Jueves', 'El Refugio', '17:00:00', '19:00:00'),
(8387, 'Sábado', 'Juriquilla', '17:00:00', '19:00:00'),
(8388, 'Jueves', 'La Vista', '17:00:00', '19:00:00'),
(8389, 'Viernes', 'Sonterra', '17:00:00', '19:00:00'),
(8390, 'Miercoles', 'Balvanegra', '20:00:00', '22:00:00'),
(8391, 'Miercoles', 'Zibata', '17:00:00', '19:00:00'),
(8392, 'Jueves', 'Zakia', '17:00:00', '19:00:00'),
(8393, 'Viernes', 'Vista Real', '17:00:00', '19:00:00'),
(8394, 'Viernes', 'Mirador', '17:00:00', '19:00:00'),
(8395, 'Viernes', 'Milenio', '17:00:00', '19:00:00'),
(8396, 'Jueves', 'Campanario', '20:00:00', '22:00:00'),
(8397, 'Miercoles', 'Cimatario', '17:00:00', '19:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `pedido`
--

CREATE TABLE `pedido` (
  `idPedido` int(11) NOT NULL,
  `diaEntrega` varchar(200) DEFAULT NULL,
  `estatus` varchar(50) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `tipoDeEntrega` varchar(200) DEFAULT NULL,
  `cantidadTotal` int(11) DEFAULT NULL,
  `costoTotal` float DEFAULT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pedido`
--

INSERT INTO `pedido` (`idPedido`, `diaEntrega`, `estatus`, `descripcion`, `tipoDeEntrega`, `cantidadTotal`, `costoTotal`, `idCliente`, `fecha`) VALUES
(10001, 'Sábado de 17:00:00 a 19:00:00', 'En espera de pago', 'colorado: 20, verde: 15, chicharron: 15', 'domicilio', 50, 900, 2003, '2021-06-07 10:28:32'),
(10002, 'Sábado de 17:00:00 a 19:00:00', 'En espera de pago', 'verde: 20, rajas: 10, frijoles: 5, dulce: 10', 'domicilio', 45, 815, 2001, '2021-06-07 10:28:57'),
(10003, 'Miercoles de 17:00:00 a 19:00:00', 'En espera de pago', 'verde: 15, rajas: 10, dulce: 15', 'sucursal', 40, 680, 2002, '2021-06-07 10:29:23'),
(10005, 'Sábado de 17:00:00 a 19:00:00', 'En espera de pago', 'verde: 10, rajas: 10', 'domicilio', 20, 390, 2001, '2021-06-07 10:31:24');

-- --------------------------------------------------------

--
-- Table structure for table `pedidoproducto`
--

CREATE TABLE `pedidoproducto` (
  `idProducto` int(11) NOT NULL,
  `idPedido` int(11) NOT NULL,
  `fechaPedido` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cantidadPorProducto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pedidoproducto`
--

INSERT INTO `pedidoproducto` (`idProducto`, `idPedido`, `fechaPedido`, `cantidadPorProducto`) VALUES
(1, 10001, '2021-06-07 10:28:38', 20),
(2, 10001, '2021-06-07 10:28:38', 15),
(2, 10002, '2021-06-07 10:29:05', 20),
(2, 10003, '2021-06-07 10:29:30', 15),
(2, 10005, '2021-06-07 10:31:24', 10),
(3, 10002, '2021-06-07 10:29:05', 10),
(3, 10003, '2021-06-07 10:29:30', 10),
(3, 10005, '2021-06-07 10:31:24', 10),
(4, 10001, '2021-06-07 10:28:38', 15),
(5, 10002, '2021-06-07 10:29:05', 5),
(6, 10002, '2021-06-07 10:29:05', 10),
(6, 10003, '2021-06-07 10:29:30', 15),
(9, 10001, '2021-06-07 12:29:09', 0);

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

--
-- Dumping data for table `producto`
--

INSERT INTO `producto` (`idProducto`, `nombreProducto`, `precio`, `descripcion`, `imagenProducto`, `sku`) VALUES
(1, 'Colorado', 17, 'Masa hidratada con un ligero color rojizo relleno de carne de cerdo desmenuzada guisada con chile guajillo', 'img/tamales-sabor-4.png', 'colorado'),
(2, 'Verde de pollo  ', 17, 'Masa delgada, rellena con pollo desmenuzado en salsa verde', 'img/tamales-sabor-2.png', 'verde'),
(3, 'Rajas con queso', 17, 'Masa rellena de rajas en escabeche con queso panela', 'img/tamales-sabor-5.png', 'rajas'),
(4, 'Chicharrón  ', 17, 'Tamal de masa muy delgada relleno de un guiso de chicharrón tipo migas', 'img/tamales-sabor-3.png', 'chicharron'),
(5, 'Frijoles norteños', 17, 'Masa delgada rellena de frijoles norteños (guisado con chile guajillo) y queso panela', 'img/tamales-sabor-6.png', 'frijoles'),
(6, 'Dulce', 17, 'Tamal con pasas, coco y naranja, sin colorantes', 'img/tamales-sabor-1.png', 'dulce');

-- --------------------------------------------------------

--
-- Table structure for table `promocion`
--

CREATE TABLE `promocion` (
  `idPromocion` int(11) NOT NULL,
  `descripcion` varchar(80) DEFAULT NULL,
  `imagenPromocion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `promocion`
--

INSERT INTO `promocion` (`idPromocion`, `descripcion`, `imagenPromocion`) VALUES
(2001, 'En tu primer compra en línea. ¡Llévate un tamal gratis!', 'img/tamales-promocion-2.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`idAdmin`),
  ADD UNIQUE KEY `idAdmin` (`idAdmin`),
  ADD UNIQUE KEY `correoElectronico` (`correoElectronico`);

--
-- Indexes for table `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idCliente`),
  ADD UNIQUE KEY `idCliente` (`idCliente`),
  ADD UNIQUE KEY `correoElectronico` (`correoElectronico`),
  ADD KEY `idDistribucion` (`idDistribucion`);

--
-- Indexes for table `distribucion`
--
ALTER TABLE `distribucion`
  ADD PRIMARY KEY (`idDistribucion`);

--
-- Indexes for table `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`idPedido`),
  ADD UNIQUE KEY `idPedido` (`idPedido`),
  ADD KEY `idCliente` (`idCliente`);

--
-- Indexes for table `pedidoproducto`
--
ALTER TABLE `pedidoproducto`
  ADD PRIMARY KEY (`idProducto`,`idPedido`,`fechaPedido`),
  ADD KEY `idProducto` (`idProducto`),
  ADD KEY `idPedido` (`idPedido`);

--
-- Indexes for table `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`),
  ADD UNIQUE KEY `idProducto` (`idProducto`);

--
-- Indexes for table `promocion`
--
ALTER TABLE `promocion`
  ADD PRIMARY KEY (`idPromocion`),
  ADD UNIQUE KEY `idPromocion` (`idPromocion`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `idAdmin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2004;

--
-- AUTO_INCREMENT for table `distribucion`
--
ALTER TABLE `distribucion`
  MODIFY `idDistribucion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8398;

--
-- AUTO_INCREMENT for table `pedido`
--
ALTER TABLE `pedido`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10006;

--
-- AUTO_INCREMENT for table `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `promocion`
--
ALTER TABLE `promocion`
  MODIFY `idPromocion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2002;
