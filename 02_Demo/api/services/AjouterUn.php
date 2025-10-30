<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");


require_once __DIR__ . "/../config/Database.php";

try {
    // Vérifier que la méthode est POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode([
            "message" => "Méthode non autorisée. Utilisez POST."
        ]);
        exit();
    }

    // Récupérer les données JSON envoyées
    $data = json_decode(file_get_contents("php://input"));

    // Valider les données requises
    if (empty($data->nom) || empty($data->description) || !isset($data->prix)) {
        http_response_code(400);
        echo json_encode([
            "message" => "Données incomplètes. Nom, description et prix sont requis."
        ]);
        exit();
    }

    // Valider le prix
    if (!is_numeric($data->prix) || $data->prix < 0) {
        http_response_code(400);
        echo json_encode([
            "message" => "Le prix doit être un nombre positif."
        ]);
        exit();
    }

    $database = new Database();
    $db = $database->getConnexion();

    $sql = "INSERT INTO services (nom, description, prix, image_url) VALUES (:nom, :description, :prix, :image_url)";

    $requete = $db->prepare($sql);

    // Nettoyer et valider les paramètres avec filter_var
    $nom = filter_var($data->nom, FILTER_SANITIZE_SPECIAL_CHARS);
    $description = filter_var($data->description, FILTER_SANITIZE_SPECIAL_CHARS);
    $prix = filter_var($data->prix, FILTER_VALIDATE_FLOAT);
    $image_url = !empty($data->image_url) ? filter_var($data->image_url, FILTER_SANITIZE_URL) : null;

    // Vérifier que le prix est valide après filtrage
    if ($prix === false) {
        http_response_code(400);
        echo json_encode([
            "message" => "Le prix n'est pas valide."
        ]);
        exit();
    }

    $requete->bindParam(':nom', $nom);
    $requete->bindParam(':description', $description);
    $requete->bindParam(':prix', $prix);
    $requete->bindParam(':image_url', $image_url);

    // Exécuter la requête
    if ($requete->execute()) {
        $dernierID = $db->lastInsertId();
        http_response_code(201);
        echo json_encode([
            "message" => "Service ajouté avec succès.",
            "id" => $dernierID,
            "service" => [
                "id" => $dernierID,
                "nom" => $nom,
                "description" => $description,
                "prix" => $prix,
                "image_url" => $image_url
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "message" => "Impossible d'ajouter le service."
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
