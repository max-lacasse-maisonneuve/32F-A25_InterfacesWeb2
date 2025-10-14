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

    if (!$donnees) {
        throw new Exception("Aucune donnée reçue");
    }

    // Préparer la requête INSERT
    $requete = $connexion->prepare("
        INSERT INTO piscine (type_piscine, nom, arrondissement, adresse, gestion, equipement, longitude, latitude)
        VALUES (:type_piscine, :nom, :arrondissement, :adresse, :gestion, :equipement, :longitude, :latitude)
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

    // Exécuter la requête
    $requete->execute();

    // Retourner le résultat
    $reponse = [
        "success" => true,
        "message" => "Piscine ajoutée avec succès",
        "id" => $connexion->lastInsertId()
    ];

    if (!$reponse['id']) {
        header("Content-Type: application/json");
        http_response_code(500); // Internal Server Error
        $reponse = [
            "success" => false,
            "message" => "Erreur lors de l'ajout de la piscine"
        ];
        echo json_encode($reponse);
        exit;
    }

    // Retourner la réponse en JSON
    header("Content-Type: application/json");
    http_response_code(201); // Created
    echo json_encode($reponse);

} catch (Exception $e) {
    $reponse = [
        "success" => false,
        "message" => $e->getMessage()
    ];
    header("Content-Type: application/json");
    http_response_code(500);
    echo json_encode($reponse);
}

