<?php
//Afficher les erreurs (à désactiver en production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Paramètres de connexion pour l'environnement local
define('DB_HOST', 'localhost');
define('DB_NAME', 'todos');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_PORT', 3306);


try {
    $connexion = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";port=" . DB_PORT,
        DB_USER,
        DB_PASSWORD,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["erreur" => "Connexion échouée : " . $e->getMessage()]);
    exit;
}