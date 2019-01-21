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

    public function updateBoard($id_board, $newActual, $newClockwise) {
        $stmt = $this->database->connect()->prepare(
            'UPDATE board
            SET actual_player = :newActual,
                clockwise = :newClockwise
            WHERE id_board = :id_board'
        );
        $stmt->bindParam(':newActual', $newActual, PDO::PARAM_STR);
        $stmt->bindParam(':newClockwise', $newClockwise, PDO::PARAM_STR);
        $stmt->bindParam(':id_board', $id_board, PDO::PARAM_STR);
        $stmt->execute();
    }

    // return's true if board was created
    public function create($board_name) {
        $db = $this->database->connect();
        try{
            $db->beginTransaction();

            $stmt = $db->prepare(
                'SELECT board.name FROM board
                WHERE board.name = :board_name'
            );
            $stmt->bindParam(':board_name', $board_name, PDO::PARAM_STR);
            $stmt->execute();

            $board = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($board == null) {
                $stmt = $db->prepare(
                    "INSERT INTO `board` (`id_board`, `name`, `clockwise`, `actual_player`, `id_state`) 
                    VALUES (NULL, :board_name, '0', '0', '1')"
                );
                $stmt->bindParam(':board_name', $board_name, PDO::PARAM_STR);
                $stmt->execute();
                
                $db->commit();
                return true;
            }

            $db->rollBack();
            return false;
        }
        catch(PDOException $e) {
            if(stripos($e->getMessage(), 'DATABASE IS LOCKED') !== false) {
                usleep(2500);
                $db->commit();
            } else {
                $db->rollBack();
                throw $e;
            }
        }
    }

    public function boardReactive($id_board) {
        $stmt = $this->database->connect()->prepare(
            'UPDATE board
            SET last_active_date = CURRENT_TIMESTAMP
            WHERE id_board = :id_board'
        );
        $stmt->bindParam(':id_board', $id_board, PDO::PARAM_STR);
        $stmt->execute();
    }

}

?>
