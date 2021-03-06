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
                'SELECT user.id_user, user.name, user.player_nr, role.name as "role" 
                FROM user LEFT JOIN role ON user.id_role = role.id_role
                WHERE id_board = :id_table'
            );
            $stmt->bindParam(':id_table', $id_table, PDO::PARAM_STR);
            $stmt->execute();

            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return $users;
    }

    public function getAllUsersAdmin() {
        $stmt = $this->database->connect()->prepare(
            'SELECT * FROM users_view'
        );
        $stmt->execute();

        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $users;
    }

    // get players at the table and amount of cards they have
    public function getUsersFromBoard($id_board) {
        $stmt = $this->database->connect()->prepare(
            'SELECT P.id_user, P.name, P.player_nr, P.role, IFNULL(A.card_count, 0) AS card_count
                FROM 
                (
                    SELECT * FROM users_boards_view
                ) P
                LEFT JOIN 
                (	
                    SELECT card.id_user, count(card.id_card) as card_count
                    FROM card, board
                    WHERE card.id_board = board.id_board AND
                        board.id_board = :id_board
                    group by card.id_user
                ) A
                ON P.id_user = A.id_user;'
            // 'SELECT user.id_user, user.player_nr, user.name , role.name as "role", COUNT(card.id_card) as card_count
            // FROM user LEFT JOIN role ON user.id_role = role.id_role
            //     LEFT JOIN card ON user.id_user = card.id_user
                    
            // WHERE user.id_board = :id_board
            //     GROUP BY user.id_user
            //     ORDER BY user.player_nr ASC'
        );
        $stmt->bindParam(':id_board', $id_board, PDO::PARAM_STR);
        $stmt->execute();

        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
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