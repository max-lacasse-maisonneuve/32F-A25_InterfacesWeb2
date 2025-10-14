<?php
require_once __DIR__ . '/../config.php';

try {
    $requete = $connexion->query("SELECT * FROM taches ORDER BY id DESC");
    $resultats = $requete->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($resultats);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["erreur" => $e->getMessage()]);
}
