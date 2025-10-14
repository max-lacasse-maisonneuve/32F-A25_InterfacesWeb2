<?php
//Afficher les erreurs-enlever en production
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../config.php';
try {

    //Connexion à la base de données
    $connexion = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";port=" . DB_PORT, DB_USER, DB_PASSWORD);

    //Si le paramètre page ou limit n'est pas fourni, on utilise des valeurs par défaut (10 éléments par page, page 1)
    $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1; // page >= 1
    $limite = isset($_GET['limit']) ? max(1, intval($_GET['limit'])) : 10; // nombre d'éléments par page
    $decalage = ($page - 1) * $limite;

    // Compter le total des piscines pour la pagination
    $totalPiscinesRequete = $connexion->query("SELECT COUNT(*) FROM piscine");
    $total = $totalPiscinesRequete->fetchColumn();// retourne le nombre total d'éléments au lieu de tout le tableau

    // On prépare et exécute la requête
    $requete = $connexion->prepare("SELECT * FROM piscine LIMIT :limit OFFSET :offset");
    $requete->bindValue(':limit', $limite, PDO::PARAM_INT);
    $requete->bindValue(':offset', $decalage, PDO::PARAM_INT);
    $requete->execute();
    $resultats = $requete->fetchAll(PDO::FETCH_ASSOC);

    //On retourne les résultats en JSON en définissant la bonne entête
    $reponse = [
        'page' => $page,
        'limite' => $limite,
        'total' => (int) $total,
        'total_pages' => ceil($total / $limite),
        'resultats' => $resultats
    ];

    // --- Retourner le JSON ---
    //VOUS DEVEZ RETOURNER AVEC UN ECHO
    header('Content-Type: application/json');
    http_response_code(200);// OK
    echo json_encode($reponse);

} catch (PDOException $e) {
    header('Content-Type: application/json');
    http_response_code(500);// Erreur serveur
    echo json_encode(['erreur' => $e->getMessage()]);
}