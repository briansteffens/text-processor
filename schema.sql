CREATE TABLE `scripts` (
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `code` text NOT NULL,
  `impl` varchar(50) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8

