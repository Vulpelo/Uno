<?php 

require_once("User.php");
require_once(__DIR__.'/../Database.php');

class UserMapper {
    private $database;

    public function __construct() {
        $this->database = new Database();

    }

    // get players at the table and amount of cards they have
    public function getUsersFromTable($id_board, $beside_id_user) {
        if ($id_table !== NULL) {
            $stmt = $this->database->connect()->prepare(
                'SELECT user.id_user, user.player_nr, user.name, COUNT(card.id_card) AS card_count FROM user, card 
	                WHERE user.id_user = card.id_user AND
			        card.id_board = :id_board AND 
			        user.id_user != :id_user
		            GROUP BY user.id_user'
            );
            $stmt->bindParam(':id_table', $id_table, PDO::PARAM_STR);
            $stmt->execute();

            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return $users;
    }

}

?>