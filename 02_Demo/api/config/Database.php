<?php
//ajout l'affichage des erreurs pour le débogage
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class Database
{
    private $host;
    private $db;
    private $nomUtilisateur;
    private $motDePasse;
    private $port;

    private $connexion;

    public function __construct()
    {
        // Utiliser les noms de variables Railway avec fallback pour local
        $this->host = $_ENV["MYSQLHOST"] ?? getenv("MYSQLHOST") ?: "localhost";
        $this->db = $_ENV["MYSQL_DATABASE"] ?? getenv("MYSQL_DATABASE") ?: "paysagement";
        $this->nomUtilisateur = $_ENV["MYSQLUSER"] ?? getenv("MYSQLUSER") ?: "root";
        $this->motDePasse = $_ENV["MYSQLPASSWORD"] ?? getenv("MYSQLPASSWORD") ?: "";
        $this->port = $_ENV["MYSQLPORT"] ?? getenv("MYSQLPORT") ?: "3306";
    }

    public function getConnexion()
    {
        // Éviter de recréer la connexion si elle existe déjà
        if ($this->connexion !== null) {
            return $this->connexion;
        }

        try {
            $dns = "mysql:host=" . $this->host .
                ";port=" . $this->port .
                ";dbname=" . $this->db .
                ";charset=utf8mb4";

            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];

            $this->connexion = new PDO($dns, $this->nomUtilisateur, $this->motDePasse, $options);

        } catch (PDOException $erreur) {
            // Afficher plus de détails pour déboguer
            http_response_code(500);

            // Vérifier si on est en production
            $isProduction = getenv("RAILWAY_ENVIRONMENT") !== false;

            if ($isProduction) {
                echo json_encode([
                    "message" => "Erreur de connexion à la base de données",
                    "details" => $erreur->getMessage()
                ]);
            } else {
                // En local, afficher tous les détails
                echo json_encode([
                    "message" => "Erreur de connexion",
                    "erreur" => $erreur->getMessage(),
                    "host" => $this->host,
                    "port" => $this->port,
                    "database" => $this->db,
                    "user" => $this->nomUtilisateur
                ]);
            }
            exit();
        }

        return $this->connexion;
    }
}