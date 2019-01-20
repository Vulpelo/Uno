<?php 

require_once("User.php");
require_once(__DIR__.'/../Database.php');

class UserMapper {
    private $database;

    public function __construct() {
        $this->database = new Database();

    }

    public function getUserById($id_user) {
        $stmt = $this->database->connect()->prepare(
            "SELECT user.id_user, user.name, user.email, user.password, role.name AS role, user.id_board  
            FROM user LEFT outer JOIN role ON user.id_role = role.id_role
            WHERE id_user = :id_user"
        );
        // SELECT * FROM user WHERE email = :email'
        $stmt->bindParam(':id_user', $id_user, PDO::PARAM_STR);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        $user = new User(
            $user['id_user'], 
            $user['name'], 
            $user['email'], 
            $user['password'], 
            $user['role'],
            $user['id_board']
        );
        return $user;
    }

    // do logowania
    public function getUser(string $email) : User {
        $stmt = $this->database->connect()->prepare(
            "SELECT user.id_user, user.name, user.email, user.password, role.name AS role, user.id_board  
            FROM user LEFT outer JOIN role ON user.id_role = role.id_role
            WHERE email = :email"
        );
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        $user = new User(
            $user['id_user'], 
            $user['name'], 
            $user['email'], 
            $user['password'], 
            $user['role'],
            $user['id_board']
        );
        return $user;
    }

    public function getHostFromTable($id_board) {
        $stmt = $this->database->connect()->prepare(
            "SELECT user.id_user, user.name, user.email, user.password, role.name AS role, user.id_board  
            FROM user LEFT outer JOIN role ON user.id_role = role.id_role
            WHERE role.name = 'HOST' AND
            user.id_board = :id_board"
        );
        $stmt->bindParam(':id_board', $id_board, PDO::PARAM_STR);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        $user = new User(
            $user['id_user'], 
            $user['name'], 
            $user['email'], 
            $user['password'], 
            $user['role'],
            $user['id_board']
        );
        return $user;
    }

    // do rejestrowania
    public function registerUser($name, $email, $password) {
        // TODO: register user
        $stmt = $this->database->connect()->prepare(
            'INSERT INTO user (name, email, password) VALUES ( :name, :email, :password )'
        );
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':password', $password, PDO::PARAM_STR);
        $stmt->execute();
    }
}

?>