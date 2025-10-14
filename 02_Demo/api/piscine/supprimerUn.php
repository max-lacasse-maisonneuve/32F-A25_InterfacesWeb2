<?php
//Afficher les erreurs-enlever en production
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../config.php';

try {
    //Connexion à la base de données
    $connexion = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";port=" . DB_PORT, DB_USER, DB_PASSWORD);

    // Vérifier si un id est fourni (ex: supprimerUn.php?id=1)
    if (!isset($_GET['id'])) {
        throw new Exception("ID manquant");
    }

    $id = (int) $_GET['id'];

    // Préparer la requête DELETE
    $requete = $connexion->prepare("DELETE FROM piscine WHERE id = :id");
    $requete->bindParam(':id', $id, PDO::PARAM_INT);

    // Exécuter la requête
    $requete->execute();

    // Vérifier si une ligne a été supprimée
    if ($requete->rowCount() > 0) {
        $resultat = ["success" => true, "message" => "Enregistrement supprimé avec succès"];
    } else {
        header('Content-Type: application/json');
        http_response_code(404); // Not Found
        $resultat = ["success" => false, "message" => "Aucun enregistrement trouvé avec cet ID"];
        echo json_encode($resultat);
        exit;
    }

    // Retourner le résultat en JSON
    header("Content-Type: application/json");
    http_response_code(200);// OK
    echo json_encode($resultat);

} catch (Exception $e) {
    header('Content-Type: application/json');
    http_response_code(500);// Erreur serveur
    echo json_encode(['erreur' => $e->getMessage()]);
}


