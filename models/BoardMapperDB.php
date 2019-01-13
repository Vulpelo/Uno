<?php 

require_once(__DIR__.'/../Database.php');

class BoardMapperDB {
    private $database;

    public function __construct() {
        $this->database = new Database();
    }

    public function getBoard($id_board) {
        $stmt = $this->database->connect()->prepare(
            'SELECT * FROM board 
            WHERE id_board = :id_board'
        );
        $stmt->bindParam(':id_board', $id_board, PDO::PARAM_STR);
        $stmt->execute();

        $board = $stmt->fetch(PDO::FETCH_ASSOC);

        return $board;
    }

}

?>
