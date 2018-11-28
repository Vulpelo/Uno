<?php 

require_once("User.php");
require_once(__DIR__.'/../Database.php');

class UserMapper {
    private $database;

    public function __construct() {
        $this->database = new Database();

    }

    // do logowania
    public function getUser(string $email) : User {
        $stmt = $this->database->connect()->prepare(
            'SELECT * FROM user WHERE email = :email'
        );
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        $user = new User(
            $user['id_user'], 
            $user['name'], 
            $user['surname'], 
            $user['email'], 
            $user['password'], 
            $user['role']
        );
        return $user;
    }

    // do rejestrowania
    public function setUser() {

    }
}

?>