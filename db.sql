-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-11-2018 a las 09:28:27
-- Versión del servidor: 10.1.28-MariaDB
-- Versión de PHP: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `abraxas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `id` varchar(255) NOT NULL,
  `tarea` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `id_tiempo` varchar(255) NOT NULL,
  `tiempo_ini` int(11) NOT NULL,
  `tiempo_fin` int(11) NOT NULL,
  `tiempo_realizado` int(11) NOT NULL,
  `completada` tinyint(1) NOT NULL,
  `cant_pausa` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdUsu` varchar(255) NOT NULL,
  `updatedUsu` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tarea`
--

INSERT INTO `tarea` (`id`, `tarea`, `descripcion`, `id_tiempo`, `tiempo_ini`, `tiempo_fin`, `tiempo_realizado`, `completada`, `cant_pausa`, `createdAt`, `updatedAt`, `createdUsu`, `updatedUsu`) VALUES
('e4a6ece3-c09f-4f59-9c37-6bef8c3a891b', 'tarea1', 'tarea1', '1', 0, 1800, 0, 0, 0, '2018-11-14 00:38:46', '2018-11-14 02:07:58', '', ''),
('ebc4823b-ccd4-48b6-a852-d4629ae68673', 'tarea3', 'tarea3', '3', 3600, 7200, 0, 0, 0, '2018-11-14 00:54:35', '2018-11-14 00:54:35', '', ''),
('ef33033e-4d59-4328-8649-dfa6ed4d7a5a', 'tarea2', 'tarea2', '2', 1800, 3600, 0, 0, 0, '2018-11-14 00:51:41', '2018-11-14 00:51:41', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiempo`
--

CREATE TABLE `tiempo` (
  `id` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `tiempo_ini` int(11) NOT NULL,
  `tiempo_fin` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdUsu` varchar(255) NOT NULL,
  `updatedUsu` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tiempo`
--

INSERT INTO `tiempo` (`id`, `descripcion`, `tiempo_ini`, `tiempo_fin`, `createdAt`, `updatedAt`, `createdUsu`, `updatedUsu`) VALUES
('1', 'Corta', 0, 1800, '2018-11-08 04:00:00', '2018-11-12 02:11:29', '', ''),
('2', 'Media', 1800, 3600, '2018-11-08 04:00:00', '2018-11-12 02:11:33', '', ''),
('3', 'Larga', 3600, 7200, '2018-11-08 04:00:00', '2018-11-12 02:11:35', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `identificacion` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `git_hub` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdUsu` varchar(255) NOT NULL,
  `updatedUsu` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `email`, `identificacion`, `telefono`, `git_hub`, `createdAt`, `updatedAt`, `createdUsu`, `updatedUsu`) VALUES
('1', 'Jose Jesus', 'Pirela Fuenmayor', 'jjpirela93@gmail.com', 'V-20.863.642', '+58 414.687.98.93', 'pirela', '2018-11-14 00:10:19', '2018-11-14 08:27:56', '', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idTiempo` (`id_tiempo`);

--
-- Indices de la tabla `tiempo`
--
ALTER TABLE `tiempo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `identificacion` (`identificacion`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `tarea_ibfk_1` FOREIGN KEY (`id_tiempo`) REFERENCES `tiempo` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
