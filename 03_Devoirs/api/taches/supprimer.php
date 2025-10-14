<?php
require_once __DIR__ . '/../config.php';

$id = $_GET['id'] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(["erreur" => "ID manquant"]);
    exit;
}

try {
    $requete = $connexion->prepare("DELETE FROM taches WHERE id = ?");
    $requete->execute([$id]);

    if ($requete->rowCount() > 0) {
        echo json_encode(["message" => "Tâche supprimée avec succès"]);
    } else {
        http_response_code(404);
        echo json_encode(["erreur" => "Tâche non trouvée"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["erreur" => $e->getMessage()]);
}
