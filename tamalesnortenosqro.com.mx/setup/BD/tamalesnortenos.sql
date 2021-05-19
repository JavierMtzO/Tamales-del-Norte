-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 19, 2021 at 01:32 PM
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
(1614, 'Aldomar', 'Ramirez', 'Av Eugenio Garza Sada 628', 'aldomar@itesm.mx', 'Portón amarillo', '4429568135', 8387, '$2a$12$v4HVmOCinl1jGE7.PBEc0OBBhccAq7fdgS8HXSHC6pFiW/omRnrLK'),
(1615, 'Miguel', 'Martinez', 'Av Eugenio Garza Sada 628', 'miguel@itesm.mx', 'Enfrente al Tec de Monterrey', '4499048658', 8384, '$2a$12$F2dZMt4sdA1cGGpa..zNY.e1u66l73XApu2zCtWyi/Ujz8WJDcF/O');

-- --------------------------------------------------------

--
-- Table structure for table `descuento`
--

CREATE TABLE `descuento` (
  `idDescuento` int(11) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `Porcentaje` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `descuento`
--

INSERT INTO `descuento` (`idDescuento`, `descripcion`, `Porcentaje`) VALUES
(10501, '15 porciento de descuento\'', 15),
(10502, '15 porciento de descuento\'', 15),
(10503, '15 porciento de descuento\'', 15),
(10504, '15 porciento de descuento\'', 15),
(10505, '15 porciento de descuento\'', 15),
(10506, '15 porciento de descuento\'', 15),
(10507, '15 porciento de descuento\'', 15);

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
(8390, 'Viernes', 'Balvanegra', '17:00:00', '19:00:00'),
(8391, 'Miercoles', 'Zibata', '17:00:00', '19:00:00'),
(8392, 'Jueves', 'Zakia', '17:00:00', '19:00:00'),
(8393, 'Viernes', 'Vista Real', '17:00:00', '19:00:00'),
(8394, 'Viernes', 'Mirador', '17:00:00', '19:00:00'),
(8395, 'Viernes', 'Milenio', '17:00:00', '19:00:00'),
(8396, 'Lunes', 'Campanario', '19:00:00', '20:00:00'),
(8397, 'Miercoles', 'Cimatario', '17:00:00', '19:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `pedido`
--

CREATE TABLE `pedido` (
  `idPedido` int(11) NOT NULL,
  `etiqueta` int(11) DEFAULT NULL,
  `diaEntrega` varchar(200) DEFAULT NULL,
  `estatus` varchar(50) DEFAULT NULL,
  `descripcion` varchar(80) DEFAULT NULL,
  `tipoDeEntrega` varchar(200) DEFAULT NULL,
  `cantidadTotal` int(11) DEFAULT NULL,
  `costoTotal` float DEFAULT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idPromocion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pedido`
--

INSERT INTO `pedido` (`idPedido`, `etiqueta`, `diaEntrega`, `estatus`, `descripcion`, `tipoDeEntrega`, `cantidadTotal`, `costoTotal`, `idCliente`, `fecha`, `idPromocion`) VALUES
(10001, 20001, '2021-05-02', 'entregado', '2 tamales colorados, 3 verdes, 5 rajas', 'domicilio', 10, 170, 1600, '2021-05-18 23:37:09', 2001),
(10002, 20002, '2021-05-02', 'entregado', '3 tamales colorados, 3 verdes, 5 rajas', 'domicilio', 11, 187, 1603, '2021-05-18 23:37:09', 2001),
(10003, 20003, '2021-05-02', 'entregado', '4 tamales colorados, 3 verdes, 5 rajas', 'domicilio', 12, 204, 1606, '2021-05-18 23:37:09', 2001),
(10004, 20004, '2021-05-02', 'entregado', '5 tamales colorados, 3 verdes, 5 rajas', 'domicilio', 13, 221, 1602, '2021-05-18 23:37:09', 2001),
(10005, 20005, '2021-05-02', 'entregado', '6 tamales colorados, 3 verdes, 5 rajas', 'domicilio', 14, 238, 1600, '2021-05-18 23:37:09', 2001),
(10006, 20006, '2021-05-02', 'entregado', '7 tamales colorados, 3 verdes, 5 rajas', 'sucursal', 15, 255, 1596, '2021-05-18 23:37:09', 2001),
(10007, 20007, '2021-05-03', 'entregado', '8 tamales colorados, 3 verdes, 5 rajas', 'domicilio', 16, 272, 1597, '2021-05-18 23:37:09', 2001),
(10008, 20008, '2021-05-03', 'entregado', '9 tamales colorados, 3 verdes, 5 rajas', 'domicilio', 17, 289, 1598, '2021-05-18 23:37:09', 2001),
(10010, 20010, '2021-05-03', 'entregado', '11 tamales colorados, 3 verdes, 5 rajas', 'sucursal', 19, 323, 1600, '2021-05-18 23:37:09', 2001),
(10011, 20011, '2021-05-03', 'entregado', '12 tamales colorados, 3 verdes, 5 rajas', 'domicilio', 20, 340, 1601, '2021-05-18 23:37:09', 2001),
(10012, 20012, '2021-05-03', 'entregado', '13 tamales colorados, 3 verdes, 5 rajas', 'domicilio', 21, 357, 1602, '2021-05-18 23:37:09', 2001),
(10013, 20013, '2021-05-03', 'entregado', '14 tamales colorados, 3 verdes, 5 rajas', 'domicilio prioritario', 22, 374, 1603, '2021-05-18 23:37:09', 2001),
(10014, 20014, '2021-05-03', 'entregado', '15 tamales colorados, 3 verdes, 5 rajas', 'domicilio', 23, 391, 1604, '2021-05-18 23:37:09', 2001);

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

-- --------------------------------------------------------

--
-- Table structure for table `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `nombreProducto` varchar(80) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `existencia` int(11) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `imagenProducto` varchar(200) DEFAULT NULL,
  `sku` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `producto`
--

INSERT INTO `producto` (`idProducto`, `nombreProducto`, `precio`, `existencia`, `descripcion`, `imagenProducto`, `sku`) VALUES
(1, 'Colorado', 17, 10, 'Masa hidratada con un ligero color rojizo relleno de carne de cerdo desmenuzada guisada con chile guajillo', 'img/tamales-sabor-4.png', 'colorado'),
(2, 'Verde de pollo', 17, 10, 'Masa delgada, rellena con pollo desmenuzado en salsa verde', 'img/tamales-sabor-2.png', 'verde'),
(3, 'Rajas con queso', 17, 10, 'Masa rellena de rajas en escabeche con queso panela', 'img/tamales-sabor-5.png', 'rajas'),
(4, 'Chicharron', 17, 10, 'Tamal de masa muy delgada relleno de un guiso de chicharrón tipo carnitas', 'img/tamales-sabor-3.png', 'chicharron'),
(5, 'Frijoles norteños', 17, 10, 'Masa delgada rellena de frijoles norteños (guisado con chile guajillo) y queso panela', 'img/tamales-sabor-6.png', 'frijoles'),
(6, 'Dulce', 17, 10, 'Tamal con pasas, coco y naranja, sin colorantes', 'img/tamales-sabor-1.png', 'dulce');

-- --------------------------------------------------------

--
-- Table structure for table `promocion`
--

CREATE TABLE `promocion` (
  `idPromocion` int(11) NOT NULL,
  `descripcion` varchar(80) DEFAULT NULL,
  `fechaInicio` date DEFAULT NULL,
  `fechaFinal` date DEFAULT NULL,
  `imagenPromocion` varchar(200) DEFAULT NULL,
  `idDescuento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `promocion`
--

INSERT INTO `promocion` (`idPromocion`, `descripcion`, `fechaInicio`, `fechaFinal`, `imagenPromocion`, `idDescuento`) VALUES
(2001, ' 2 x 1 en tamales dulces', '2021-05-20', '2021-06-20', 'img/tamales-promocion-1.jpg', 10501),
(2002, ' 3 x 1 en tamales de rajas', '2021-05-20', '2021-06-20', 'img/tamales-promocion-2.jpg', 10501),
(2003, ' 4 x 1 en tamales colorados', '2021-05-20', '2021-06-20', 'img/tamales-promocion-1.jpg', 10501);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idCliente`),
  ADD UNIQUE KEY `idCliente` (`idCliente`),
  ADD UNIQUE KEY `correoElectronico` (`correoElectronico`),
  ADD KEY `idDistribucion` (`idDistribucion`);

--
-- Indexes for table `descuento`
--
ALTER TABLE `descuento`
  ADD PRIMARY KEY (`idDescuento`);

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
  ADD KEY `idPromocion` (`idPromocion`),
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
  ADD PRIMARY KEY (`idProducto`);

--
-- Indexes for table `promocion`
--
ALTER TABLE `promocion`
  ADD PRIMARY KEY (`idPromocion`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1616;

--
-- AUTO_INCREMENT for table `distribucion`
--
ALTER TABLE `distribucion`
  MODIFY `idDistribucion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8398;

--
-- AUTO_INCREMENT for table `pedido`
--
ALTER TABLE `pedido`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10017;

--
-- AUTO_INCREMENT for table `promocion`
--
ALTER TABLE `promocion`
  MODIFY `idPromocion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2004;
