<?php 

require_once(__DIR__.'/../../Database.php');

class BoardUpdate {
    private $database;

    public function __construct() {
        $this->database = new Database();
    }

    public function setActual($newActual, $id_board) {
        $stmt = $this->database->connect()->prepare(
            'UPDATE board
            SET actual_player = :newActual
            WHERE id_board = :id_board'
        );
        $stmt->bindParam(':newActual', $newActual, PDO::PARAM_STR);
        $stmt->bindParam(':id_board', $id_board, PDO::PARAM_STR);
        $stmt->execute();
    }

}

?>
