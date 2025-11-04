<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");


require_once __DIR__ . "/../config/Database.php";

// Récupérer les données JSON envoyées
$data = json_decode(file_get_contents("php://input"));

if (empty($data->nom) || empty($data->mdp)) {
    http_response_code(400);
    echo json_encode([
        "message" => "Données incomplètes. Nom,mot de passes sont requis."
    ]);
    exit();
}

if ($data->nom == "admin" && $data->mdp == "12345") {
    http_response_code(response_code: 200);
    echo json_encode([
        "utilisateur" => "admin",
        "message" => "Connexion réussie"
    ]);
    exit();
} else {
    http_response_code(response_code: 401);
    echo json_encode([
        "message" => "Infos de connexion incorrectes"
    ]);
    exit();
}