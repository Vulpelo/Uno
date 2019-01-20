<?php 

require_once("Board.php");
require_once(__DIR__.'/../Database.php');

class BoardMapper {
    private $database;

    public function __construct() {
        $this->database = new Database();
    }

    // do listy stołów
    public function getBoards() {
        $stmt = $this->database->connect()->prepare(
            'SELECT * FROM boards_view'
        );
        $stmt->execute();

        $boards = $stmt->fetchAll(PDO::FETCH_ASSOC);

        for ($i = 0; $i < count($boards); $i++) {
            $boards[$i] = new Board(
                $boards[$i]['id_board'], 
                $boards[$i]['name'],
                $boards[$i]['nr_of_players']
            ); 
        }
        return $boards;
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
