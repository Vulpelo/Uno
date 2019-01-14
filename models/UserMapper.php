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
            $user['id_role'],
            $user['id_board']
        );
        return $user;
    }

    // do rejestrowania
    public function setUser() {
        // TODO: register user
    }

    // public function getUsersFromTable($id_table) {
    //     if ($id_table !== NULL) {
    //         $stmt = $this->database->connect()->prepare(
    //             'SELECT * FROM user WHERE id_board = :id_table'
    //         );
    //         $stmt->bindParam(':id_table', $id_table, PDO::PARAM_STR);
    //         $stmt->execute();

    //         $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //     }
    //     return $users;
    // }

}

?>