-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 16 juin 2022 à 14:39
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `alphapair`
--

-- --------------------------------------------------------

--
-- Structure de la table `groups`
--

DROP TABLE IF EXISTS `groups`;
CREATE TABLE IF NOT EXISTS `groups` (
  `id` varchar(250) NOT NULL,
  `promotion_id` varchar(250) NOT NULL,
  `is_locked` tinyint(1) NOT NULL,
  `choices` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
CREATE TABLE IF NOT EXISTS `promotions` (
  `id` varchar(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  `limit_date` varchar(250) NOT NULL,
  `is_student_editable` tinyint(1) NOT NULL,
  `assignment` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
CREATE TABLE IF NOT EXISTS `refresh_tokens` (
  `token` varchar(1000) NOT NULL,
  UNIQUE KEY `token_index` (`token`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `refresh_tokens`
--

INSERT INTO `refresh_tokens` (`token`) VALUES
('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsIjoiYWRtaW4iLCJpc3MiOiJBbHBoYVBhaXIiLCJpc0FkbWluIjoidHJ1ZSIsInRva2VuVHlwZSI6InJlZnJlc2hUb2tlbiIsImlhdCI6MTY1NTM5MDI2MX0.5dIscug0wqjmxa9EGtbn345a8sTUBYRKLDjO9UnpOHA');

-- --------------------------------------------------------

--
-- Structure de la table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
CREATE TABLE IF NOT EXISTS `subjects` (
  `id` varchar(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  `supervisor` varchar(250) NOT NULL,
  `description` varchar(500) NOT NULL,
  `promotion_id` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `mail` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `group_id` varchar(250) NOT NULL,
  `promotion_id` varchar(250) NOT NULL,
  PRIMARY KEY (`mail`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`mail`, `password`, `first_name`, `last_name`, `is_admin`, `group_id`, `promotion_id`) VALUES
('admin', 'admin', 'Admin', 'Alphapair', 1, '', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
