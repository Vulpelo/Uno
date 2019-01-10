<?php 

require_once(__DIR__.'/../Database.php');

class UserUpdate {
    private $database;

    public function __construct() {
        $this->database = new Database();
    }

    public function setTable($userID, $newTable) {
        $stmt = $this->database->connect()->prepare(
            'UPDATE user
                SET id_board = :newTable
            WHERE id_user = :userID'
        );
        $stmt->bindParam(':newTable', $newTable, PDO::PARAM_INT);
        $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
        $stmt->execute();
    }
}

?>