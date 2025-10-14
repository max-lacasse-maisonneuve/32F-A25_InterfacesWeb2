CREATE TABLE taches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    etat VARCHAR(255) DEFAULT "non terminée"
);
INSERT INTO taches (nom, etat) VALUES ('Tache 1', 'non terminée');
INSERT INTO taches (nom, etat) VALUES ('Tache 2', 'terminée');
INSERT INTO taches (nom, etat) VALUES ('Tache 3', 'non terminée');
INSERT INTO taches (nom, etat) VALUES ('Tache 4', 'terminée');