CREATE TABLE `carro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `marca` varchar(255) NOT NULL,
  `modelo` varchar(255) NOT NULL,
  `foto` varchar(500) NOT NULL,
  `preco` float DEFAULT NULL,
  `localizacao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `usuarios` (
  `usuario_id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(255) NOT NULL,
  `perfil` enum('admin','cliente') NOT NULL,
  `senha` varchar(45) NOT NULL,
  PRIMARY KEY (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO usuarios
(`usuario`,
`perfil`,
`senha`)
VALUES
('admin',
'admin',
'123');

INSERT INTO usuarios
(`usuario`,
`perfil`,
`senha`)
VALUES
('cliente',
'cliente',
'123');


