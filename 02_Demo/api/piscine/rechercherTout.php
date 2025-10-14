<?php
//Afficher les erreurs-enlever en production
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../config.php';


try {
    //Connexion à la base de données
    $connexion = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";port=" . DB_PORT, DB_USER, DB_PASSWORD);

    //On prépare et exécute la requête
    $requete = $connexion->prepare("SELECT * FROM piscine");
    $requete->execute();
    $resultats = $requete->fetchAll(PDO::FETCH_ASSOC);

    if (!$resultats) {
        header('Content-Type: application/json');
        http_response_code(404);// Not Found
        $reponse = ['success' => false, 'message' => 'Aucune piscine trouvée'];

        echo json_encode($reponse);
        exit;
    }

    //On retourne les résultats en JSON en définissant la bonne entête
    header("Content-Type: application/json");
    http_response_code(200);// OK
    echo json_encode($resultats);

} catch (Exception $e) {
    header('Content-Type: application/json');
    http_response_code(500);// Erreur serveur
    echo json_encode(['erreur' => $e->getMessage()]);
}