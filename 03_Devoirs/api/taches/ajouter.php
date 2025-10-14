<?php
require_once __DIR__ . '/../config.php';

$donnees = json_decode(file_get_contents('php://input'), true);

$nom = $donnees['nom'] ?? null;
$etat = $donnees['etat'] ?? "non terminée";

if (!$nom) {
    http_response_code(400);
    echo json_encode(["erreur" => "Le champ 'nom' est requis"]);
    exit;
}

try {
    $requete = $connexion->prepare("INSERT INTO taches (nom, etat) VALUES (?, ?)");
    $requete->execute([$nom, $etat]);
    echo json_encode(["message" => "Tâche ajoutée avec succès", "id" => $connexion->lastInsertId(), "nom" => $nom, "etat" => $etat]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["erreur" => $e->getMessage()]);
}
