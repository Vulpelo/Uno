<?php 

require_once(__DIR__.'/../../Database.php');

class UserUpdate {
    private $database;

    public function __construct() {
        $this->database = new Database();
    }

    public function setTable($userID, $newTable) {
        $stmt = $this->database->connect()->prepare(
            'UPDATE user
                SET id_board = :newTable
            WHERE id_user = :userID'
        );
        $stmt->bindParam(':newTable', $newTable, PDO::PARAM_INT);
        $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
        $stmt->execute();
    }

    public function setRole($id_user, $id_role) {
        $stmt = $this->database->connect()->prepare(
            'UPDATE user
                SET id_role = :id_role
            WHERE id_user = :id_user'
        );
        $stmt->bindParam(':id_role', $id_role, PDO::PARAM_INT);
        $stmt->bindParam(':id_user', $id_user, PDO::PARAM_INT);
        $stmt->execute();
    }

    public function setPlayerNr($id_user, $player_nr) {
        $stmt = $this->database->connect()->prepare(
            'UPDATE user
                SET player_nr = :player_nr
            WHERE id_user = :id_user'
        );
        $stmt->bindParam(':player_nr', $player_nr, PDO::PARAM_INT);
        $stmt->bindParam(':id_user', $id_user, PDO::PARAM_INT);
        $stmt->execute();
    }

    public function setPassword($id_user, String $password) {
        $stmt = $this->database->connect()->prepare(
            'UPDATE user
                SET password = :passwordHash
            WHERE id_user = :id_user'
        );
        $stmt->bindParam(':passwordHash', $password, PDO::PARAM_STR);
        $stmt->bindParam(':id_user', $id_user, PDO::PARAM_INT);
        $stmt->execute();
    }

    public function logout($id_user) {
        $stmt = $this->database->connect()->prepare(
            'UPDATE user
                SET id_board = null
            WHERE id_user = :userID'
        );
        $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
        $stmt->execute();
    }

    public function deleteUser($id_user) {
        $db = $this->database->connect();
        try{
            $db->beginTransaction();

            $stmt = $db->prepare(
                'DELETE FROM user
                WHERE id_user = :id_user'
            );
            $stmt->bindParam(':id_user', $id_user, PDO::PARAM_INT);
            $stmt->execute();

            $stmt = $db->prepare(
                'DELETE FROM card 
                WHERE id_user = :id_user'
            );
            $stmt->bindParam(':id_user', $id_user, PDO::PARAM_INT);
            $stmt->execute();
            
            $db->commit();
        }
        catch(PDOException $e) {
            if(stripos($e->getMessage(), 'DATABASE IS LOCKED') !== false) {
                // This should be specific to SQLite, sleep for 0.25 seconds
                // and try again.  We do have to commit the open transaction first though
                usleep(2500);
                $db->commit();
            } else {
                $db->rollBack();
                throw $e;
            }
        }


    }
}

?>