<?php
//Afficher les erreurs
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class Database
{
    private $host = "localhost";
    private $db = "paysagement";
    private $nomUtilisateur = "root";
    private $motDePasse = "";
    private $port = "3306";
    private $charset = "utf8mb4";

    private $connexion;

    public function getConnexion()
    {
        try {
            $dns = "mysql:host={$this->host};port={$this->port};dbname={$this->db};charset={$this->charset}";

            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
            ];

            $this->connexion = new PDO($dns, $this->nomUtilisateur, $this->motDePasse, $options);
        } catch (PDOException $erreur) {
            http_response_code(500);
            echo json_encode([
                "message" => "Erreur de connexion à la base de données",
                "details" => $erreur->getMessage()
            ]);
            exit();
        }

        return $this->connexion;
    }
}
