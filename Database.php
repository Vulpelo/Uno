<?php 

require_once("Parameters.php");

class Database {
    private $servername;
    private $username;
    private $password;
    private $database;

    public function __construct() {
        $this->servername = SERVERNAME;
        $this->username = USERNAME;
        $this->password = PASSWORD;
        $this->database = DATABASENAME;

    }

    public function connect() {
        
        try {
            return new PDO("mysql:host=$this->servername;dbname=$this->database", $this->username, $this->password);
        }
        catch(PDOException $e)
        {
            die('Connection failed');
            return "Connection failed: " . $e->getMessage();
        }
    }
}

?>
