<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

require_once __DIR__ . "/../config/Database.php";

try {
    // http_response_code(500);
    // echo json_encode([
    //     "message" => "Erreur serveur: " . "Erreur test"
    // ]);
    // die();
    // Valider et nettoyer l'ID avec filter_input
    $id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);

    // Vérifier que l'ID est valide
    if ($id === false || $id === null || $id <= 0) {
        http_response_code(400);
        echo json_encode([
            "message" => "ID invalide. L'ID doit être un entier positif."
        ]);
        exit();
    }

    $database = new Database();
    $db = $database->getConnexion();

    $sql = "DELETE FROM services WHERE id = :id";

    $requete = $db->prepare($sql);
    $requete->bindParam(':id', $id, PDO::PARAM_INT);
    $requete->execute();

    $reponse = array('id' => $id, "message" => "Service supprimé avec succès");

    // Vérifier si le service existe
    if ($reponse) {
        http_response_code(200);
        echo json_encode($reponse);
    } else {
        http_response_code(404);
        echo json_encode([
            "message" => "Service non trouvé."
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "message" => "Erreur de base de données: " . $e->getMessage()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "message" => "Erreur serveur: " . $e->getMessage()
    ]);
}
