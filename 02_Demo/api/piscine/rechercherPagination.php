<?php
//Afficher les erreurs-enlever en production
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../config.php';
try {

    //Connexion à la base de données
    $connexion = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";port=" . DB_PORT, DB_USER, DB_PASSWORD);

    $page = isset($_GET["page"]) ? intval($_GET["page"]) : 1;
    $limite = isset($_GET["limite"]) ? intval($_GET["limite"]) : 5;
    $decalage = ($page - 1) * $limite;


    $totalPiscinesRequete = $connexion->query("SELECT COUNT(*) FROM piscine");
    $total = $totalPiscinesRequete->fetchColumn();

    if ($total == 0) {
        $reponse = [
            "erreur" => "Aucune piscine trouvée"
        ];

        header("Content-type: application/json");
        http_response_code(404);//Erreur serveur
        echo json_encode($reponse);
        exit;
    }

    //Requete principale
    $requete = $connexion->prepare("SELECT * FROM piscine LIMIT :limit OFFSET :offset");
    $requete->bindValue(":limit", $limite, PDO::PARAM_INT);
    $requete->bindValue(":offset", $decalage, PDO::PARAM_INT);
    $requete->execute();

    $resultats = $requete->fetchAll(PDO::FETCH_ASSOC);

    $reponse = [
        'page' => $page,
        'limite' => $limite,
        'total' => $total,
        'resultats' => $resultats
    ];

    // Reponse au format JSON
    header("Content-Type: application/json");
    http_response_code(200);
    echo json_encode($reponse);
    exit;

} catch (PDOException $e) {
    $reponse = [
        "erreur" => $e->getMessage()
    ];

    header("Content-type: application/json");
    http_response_code(500);//Erreur serveur
    echo json_encode($reponse);
}