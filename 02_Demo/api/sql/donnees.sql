DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `description` mediumtext NOT NULL,
  `prix` float NOT NULL,
  `image_url` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `services` VALUES 
(1,'Élagage d\'arbres','Service professionnel d\'élagage et de taille d\'arbres pour maintenir leur santé et leur forme. Inclut l\'enlèvement des branches mortes, malades ou dangereuses.',200,'elagage.jpg'),
(2,'Aménagement de platebandes','Conception et installation de platebandes fleuries avec sélection de plantes adaptées à votre environnement. Inclut la préparation du sol et le paillis.',150,'platebandes.jpg'),
(3,'Tonte de pelouse','Service régulier de tonte de pelouse avec ramassage des résidus. Hauteur de coupe ajustée selon les conditions saisonnières.',45,'tonte.jpg'),
(4,'Fertilisation de pelouse','Programme complet de fertilisation pour une pelouse verte et en santé. Traitement adapté selon la saison et les besoins du gazon.',85,'fertilisation.jpg'),
(5,'Installation de tourbe','Pose professionnelle de tourbe en plaques pour un gazon instantané et uniforme. Préparation du terrain incluse.',3.50,'tourbe.jpg'),
(6,'Déneigement','Service de déneigement résidentiel et commercial incluant entrées, stationnements et trottoirs. Disponible 24/7 en période hivernale.',120,'deneigement.jpg'),
(7,'Aération de pelouse','Aération du sol pour améliorer l\'absorption d\'eau et de nutriments. Service essentiel pour revitaliser les pelouses compactées.',95,'aeration.jpg'),
(8,'Terrassement','Travaux de nivellement et de terrassement pour créer des espaces fonctionnels. Inclut excavation, remblai et compaction.',450,'terrassement.jpg'),
(9,'Installation de patio','Conception et installation de patios en pavé uni, pierre naturelle ou composite. Crée un espace extérieur élégant et durable.',2500,'patio.jpg'),
(10,'Muret de soutènement','Construction de murets en pierre ou en blocs pour retenir les sols en pente et créer des paliers. Solutions esthétiques et fonctionnelles.',1800,'muret.jpg'),
(11,'Nettoyage printanier','Grand ménage complet de votre terrain après l\'hiver. Ramassage des débris, taille légère et préparation pour la belle saison.',175,'nettoyage_printemps.jpg'),
(12,'Taille de haies','Taille et façonnage de haies de cèdre, troène ou autres arbustes. Service régulier pour maintenir l\'esthétique de vos clôtures végétales.',130,'taille_haies.jpg'),
(13,'Plantation d\'arbres','Sélection et plantation d\'arbres adaptés à votre terrain. Conseils d\'experts pour assurer une croissance optimale.',225,'plantation_arbres.jpg'),
(14,'Système d\'irrigation','Installation de systèmes d\'arrosage automatique pour maintenir vos espaces verts en santé avec un minimum d\'effort.',1200,'irrigation.jpg'),
(15,'Aménagement paysager complet','Projet sur mesure incluant conception, terrassement, plantation et installation d\'éléments hardscape. Transformez votre terrain.',5000,'amenagement_complet.jpg');

