<?php
//Afficher les erreurs-enlever en production
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../config.php';

try {
    //Connexion à la base de données
    $connexion = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";port=" . DB_PORT, DB_USER, DB_PASSWORD);

    // Vérifier si un id est fourni (ex: supprimerUn.php?id=1)
    if (!isset($_GET['id'])) {
        throw new Exception("ID manquant");
    }

    $id = (int) $_GET['id'];

    // Récupérer le chemin de l'image avant de supprimer l'enregistrement
    $requeteSelect = $connexion->prepare("SELECT image FROM piscine WHERE id = :id");
    $requeteSelect->bindParam(':id', $id, PDO::PARAM_INT);
    $requeteSelect->execute();

    $piscine = $requeteSelect->fetch(PDO::FETCH_ASSOC);

    if (!$piscine) {
        header('Content-Type: application/json');
        http_response_code(404); // Not Found
        $resultat = ["success" => false, "message" => "Aucun enregistrement trouvé avec cet ID"];
        echo json_encode($resultat);
        exit;
    }

    $cheminImage = $piscine['image'];

    // Supprimer l'image sur le serveur si l'information est disponible
    if (!empty($cheminImage)) {
        $cheminComplet = __DIR__ . '/../../' . $cheminImage;

        // Vérifier si le fichier existe sur le serveur
        if (file_exists($cheminComplet)) {
            // Tenter de supprimer le fichier
            // Unlink supprime le fichier du système de fichiers
            if (!unlink($cheminComplet)) {
                // Gérer l'erreur si la suppression échoue
                header('Content-Type: application/json');
                http_response_code(404); // Not Found
                $resultat = ["success" => false, "message" => "Impossible de supprimer le fichier image : " . $cheminImage];
                echo json_encode($resultat);
                exit;
            }
        } else {
            // Le fichier n'existe pas, on peut logguer cette information si nécessaire
            error_log("Le fichier image à supprimer n'existe pas : " . $cheminComplet);
        }
    }

    // Préparer la requête DELETE
    $requete = $connexion->prepare("DELETE FROM piscine WHERE id = :id");
    $requete->bindParam(':id', $id, PDO::PARAM_INT);

    // Exécuter la requête
    $requete->execute();

    // Vérifier si une ligne a été supprimée
    if ($requete->rowCount() > 0) {
        // Retourner le résultat en JSON
        header("Content-Type: application/json");
        http_response_code(200);// OK
        echo json_encode(["success" => true, "message" => "Enregistrement supprimé avec succès"]);
        exit;
    } else {
        header("Content-Type: application/json");
        http_response_code(400);// Bad Request
        echo json_encode(["success" => false, "message" => "Aucune suppression effectuée (ID peut-être inexistant)"]);
        exit;
    }

} catch (Exception $e) {
    header('Content-Type: application/json');
    http_response_code(500);// Erreur serveur
    echo json_encode(['erreur' => $e->getMessage()]);
}


