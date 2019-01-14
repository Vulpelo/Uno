<?php 

require_once("User.php");
require_once(__DIR__.'/../Database.php');

class UserMapperDB {
    private $database;

    public function __construct() {
        $this->database = new Database();

    }

    public function getUsersFromBoardList($id_table) {
        if ($id_table !== NULL) {
            $stmt = $this->database->connect()->prepare(
                'SELECT * FROM user WHERE id_board = :id_table'
            );
            $stmt->bindParam(':id_table', $id_table, PDO::PARAM_STR);
            $stmt->execute();

            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return $users;
    }

    // get players at the table and amount of cards they have
    public function getUsersFromBoard($id_board, $beside_id_user) {
        // if ($id_board) {
            // if (empty($beside_id_user)) {
            //     $beside_id_user = -1;
            // }
        $stmt = $this->database->connect()->prepare(
            'SELECT user.id_user, user.player_nr, user.name, COUNT(card.id_card) AS card_count FROM user, card 
                WHERE user.id_user = card.id_user AND
                card.id_board = :id_board AND
                user.id_board = :id_board 
                GROUP BY user.id_user
                ORDER BY user.player_nr ASC'
                //AND user.id_user != :id_user
        );
        $stmt->bindParam(':id_board', $id_board, PDO::PARAM_STR);
        $stmt->bindParam(':id_user', $beside_id_user, PDO::PARAM_STR);
        $stmt->execute();

        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            // }
        return $users;
    }

    public function getUser($id_user) {
        $stmt = $this->database->connect()->prepare(
            'SELECT user.id_user, user.name, user.player_nr FROM user 
                WHERE user.id_user = :id_user'
        );
        $stmt->bindParam(':id_user', $id_user, PDO::PARAM_STR);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        return $user;
    }

}

?>