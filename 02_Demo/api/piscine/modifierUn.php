<?php
//Afficher les erreurs-enlever en production
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../config.php';

try {
    // Connexion à la base de données
    $connexion = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";port=" . DB_PORT, DB_USER, DB_PASSWORD);


    // Vérifier que la requête est en POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Méthode non autorisée, utilisez POST");
    }

    // Récupérer les données envoyées en JSON
    $donnees = json_decode(file_get_contents('php://input'), true);

    if (!$donnees || !isset($donnees['id'])) {
        throw new Exception("ID manquant ou données invalides");
    }

    $id = (int) $donnees['id'];

    // Préparer la requête UPDATE
    $requete = $connexion->prepare("
        UPDATE piscine
        SET type_piscine = :type_piscine,
            nom = :nom,
            arrondissement = :arrondissement,
            adresse = :adresse,
            gestion = :gestion,
            equipement = :equipement,
            longitude = :longitude,
            latitude = :latitude
        WHERE id = :id
    ");

    // Lier les paramètres
    $requete->bindParam(':type_piscine', $donnees['type_piscine']);
    $requete->bindParam(':nom', $donnees['nom']);
    $requete->bindParam(':arrondissement', $donnees['arrondissement']);
    $requete->bindParam(':adresse', $donnees['adresse']);
    $requete->bindParam(':gestion', $donnees['gestion']);
    $requete->bindParam(':equipement', $donnees['equipement']);
    $requete->bindParam(':longitude', $donnees['longitude']);
    $requete->bindParam(':latitude', $donnees['latitude']);
    $requete->bindParam(':id', $id);

    // Exécuter la requête
    $requete->execute();

    // Vérifier si une ligne a été modifiée
    if ($requete->rowCount() > 0) {
        $reponse = ["success" => true, "message" => "Piscine modifiée avec succès"];
    } else {
        header("Content-Type: application/json");
        http_response_code(404); // Not Found
        $reponse = ["success" => false, "message" => "Aucune modification effectuée (ID peut-être inexistant)"];
        echo json_encode($reponse);

        exit;
    }

    // Retourner la réponse en JSON
    header("Content-Type: application/json");
    http_response_code(200); // OK
    echo json_encode($reponse);

} catch (Exception $e) {
    $reponse = ["success" => false, "message" => $e->getMessage()];
    header("Content-Type: application/json");
    http_response_code(500);
    echo json_encode($reponse);
}

