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
            'SELECT * FROM board'
        );
        $stmt->execute();

        $boards = $stmt->fetchAll(PDO::FETCH_ASSOC);

        for ($i = 0; $i < count($boards); $i++) {
            $boards[$i] = new Board(
                $boards[$i]['id_board'], 
                $boards[$i]['name']
            ); 
        }
        return $boards;
    }

    // do rejestrowania
    public function setUser() {

    }
}

?>
