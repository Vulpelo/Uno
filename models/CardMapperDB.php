<?php 

require_once(__DIR__.'/../Database.php');

class CardMapperDB {
    private $database;

    public function __construct() {
        $this->database = new Database();
    }

    public function getCard($id_user, $id_board) {
        $stmt = $this->database->connect()->prepare(
            'SELECT * FROM card
            WHERE id_user = :id_user AND
                id_board = :id_board'
        );
        $stmt->bindParam(':id_user', $id_user, PDO::PARAM_STR);
        $stmt->bindParam(':id_board', $id_board, PDO::PARAM_STR);
        $stmt->execute();

        $card = $stmt->fetch(PDO::FETCH_ASSOC);
        return $card;
    }

    public function getCards($id_user) {
        $stmt = $this->database->connect()->prepare(
            'SELECT * FROM card
            WHERE id_user = :id_user'
        );
        $stmt->bindParam(':id_user', $id_user, PDO::PARAM_STR);
        $stmt->execute();

        $cards = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $cards;
    }

    public function getUserCardsOnTable($id_user, $id_board) {
        $stmt = $this->database->connect()->prepare(
            'SELECT * FROM card
            WHERE id_user = :id_user AND
                id_board = :id_board'
        );
        $stmt->bindParam(':id_user', $id_user, PDO::PARAM_STR);
        $stmt->bindParam(':id_board', $id_board, PDO::PARAM_STR);
        $stmt->execute();

        $cards = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $cards;
    }
}

?>
