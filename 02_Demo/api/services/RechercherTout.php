<?php


require_once __DIR__ . "/../config/Database.php";

try {
    $database = new Database();
    $db = $database->getConnexion();

    $sql = "SELECT * from services";

    $requete = $db->prepare($sql);

    //TODO: Ajouter les paramètres de filtres
    $requete->execute();

    $services = $requete->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    header("Content-Type:application/json");
    echo json_encode([
        "donnees" => $services
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo $e->getMessage();
    echo json_encode([
        "message" => "Impossible de récupérer les services"
    ]);
}