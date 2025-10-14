<?php
require_once __DIR__ . '/../config.php';

$donnees = json_decode(file_get_contents('php://input'), true);

$id = $donnees['id'] ?? null;
$nom = $donnees['nom'] ?? null;
$etat = $donnees['etat'] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(["erreur" => "ID requis"]);
    exit;
}

try {
    $requete = $connexion->prepare("UPDATE taches SET nom = ?, etat = ? WHERE id = ?");
    $requete->execute([$nom, $etat, $id]);

    if ($requete->rowCount() > 0) {
        echo json_encode(["message" => "Tâche modifiée avec succès"]);
    } else {
        http_response_code(404);
        echo json_encode(["erreur" => "Aucune tâche trouvée avec cet ID"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["erreur" => $e->getMessage()]);
}
