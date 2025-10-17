<?php
//Afficher les erreurs-enlever en production
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../config.php';

try {
    // Connexion à la base de données
    $connexion = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";port=" . DB_PORT, DB_USER, DB_PASSWORD);


    // Vérifier que la requête est en POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Méthode non autorisée, utilisez POST");
    }

    $fichier = $_FILES['image'] ?? null;
    $id = $_POST['id'] ?? null;

    // Vérifier que le fichier et l'ID sont présents
    if (!$fichier || !isset($id)) {
        throw new Exception("ID manquant ou données invalides");
    }

    // Vérification du type de fichier pour accepter seulement les images
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $fichier['tmp_name']);
    finfo_close($finfo);
    if (!in_array($mime, ['image/jpeg', 'image/png', 'image/gif', 'image/webp'])) {
        throw new Exception("Type de fichier non autorisé. Seules les images JPEG, PNG, GIF et WEBP sont acceptées.");
    }

    ///////////////
    // Préparer le chemin de destination
    // Changer le dossier en fonction de votre structure de projet
    $id = (int) $id;
    $dossierImages = __DIR__ . '/../../assets/img/';
    $destination = $dossierImages . basename($fichier['name']);

    // Déplacer le fichier téléchargé vers le dossier des images
    if (!move_uploaded_file($fichier['tmp_name'], $destination)) {
        throw new Exception("Erreur lors de l'upload de l'image");
    }

    $cheminRelatif = 'assets/img/' . basename($fichier['name']);

    // Préparer la requête UPDATE
    $requete = $connexion->prepare("
        UPDATE piscine
        SET image = :image
        WHERE id = :id
    ");

    // Lier les paramètres
    $requete->bindParam(':id', $id);
    $requete->bindParam(':image', $cheminRelatif);

    // Exécuter la requête
    $requete->execute();

    // Vérifier si une ligne a été modifiée
    if ($requete->rowCount() > 0) {
        $reponse = ["success" => true, "message" => "Image ajoutée avec succès"];
        header("Content-Type: application/json");
        http_response_code(200); // OK
        echo json_encode($reponse);
        exit;
    } else {
        header("Content-Type: application/json");
        http_response_code(404); // Not Found
        $reponse = ["success" => false, "message" => "Aucune modification effectuée (ID peut-être inexistant)"];
        echo json_encode($reponse);
        exit;
    }
} catch (Exception $e) {
    $reponse = ["success" => false, "message" => $e->getMessage()];
    header("Content-Type: application/json");
    http_response_code(500);
    echo json_encode($reponse);
}

