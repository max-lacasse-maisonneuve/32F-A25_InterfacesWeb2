<?php
require_once __DIR__ . '/../config.php';

$id = $_GET['id'] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(["erreur" => "ID manquant"]);
    exit;
}

try {
    $requete = $connexion->prepare("SELECT * FROM taches WHERE id = ?");
    $requete->execute([$id]);
    $resultat = $requete->fetch(PDO::FETCH_ASSOC);

    if ($resultat) {
        echo json_encode($resultat);
    } else {
        http_response_code(404);
        echo json_encode(["erreur" => "Élément non trouvé"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["erreur" => $e->getMessage()]);
}
