<?php 

require_once(__DIR__.'/../../Database.php');

class CardUpdate {
    private $database;

    public function __construct() {
        $this->database = new Database();
    }

    public function throwCard($id_card) {
        $stmt = $this->database->connect()->prepare(
            'UPDATE card
            SET id_user = 0
            WHERE id_card = :id_card'
        );
        $stmt->bindParam(':id_card', $id_card, PDO::PARAM_STR);
        $stmt->execute();
    }

    public function removeAllUserCardsOnBoard($id_user, $id_board) {
        $stmt = $this->database->connect()->prepare(
            'DELETE FROM card 
            WHERE id_user = :id_user AND
                id_board = :id_board'
        );
        $stmt->bindParam(':id_user', $id_user, PDO::PARAM_STR);
        $stmt->bindParam(':id_board', $id_board, PDO::PARAM_STR);
        $stmt->execute();
    }

    public function removeAllUserCards($id_user) {
        $stmt = $this->database->connect()->prepare(
            'DELETE FROM card 
            WHERE id_user = :id_user'
        );
        $stmt->bindParam(':id_user', $id_user, PDO::PARAM_STR);
        $stmt->execute();
    }

    public function removeAllCardsOnBoard($id_board) {
        $stmt = $this->database->connect()->prepare(
            'DELETE FROM card 
            WHERE id_board = :id_board'
        );
        $stmt->bindParam(':id_board', $id_board, PDO::PARAM_STR);
        $stmt->execute();
    }

    public function addCard($color, $symbol, $id_user, $id_board) {
        $stmt = $this->database->connect()->prepare(
            "INSERT INTO card (id_card, color, symbol, id_user, id_board) VALUES (NULL, :id_color, :id_symbol, :id_user, :id_board)"
        );
        $stmt->bindParam(':id_symbol', $symbol, PDO::PARAM_INT);
        $stmt->bindParam(':id_color', $color, PDO::PARAM_STR);
        $stmt->bindParam(':id_user', $id_user, PDO::PARAM_INT);
        $stmt->bindParam(':id_board', $id_board, PDO::PARAM_INT);
        $stmt->execute();
    }
}


?>