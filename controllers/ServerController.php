<?php

require_once("AppController.php");

require_once(__DIR__.'/../models/Update/UserUpdate.php');
require_once(__DIR__.'/../models/Update/BoardUpdate.php');

require_once(__DIR__.'/../models/BoardMapper.php');
require_once(__DIR__.'/../models/BoardMapperDB.php');
require_once(__DIR__.'/../models/Board.php');
require_once(__DIR__.'/../models/UserMapper.php');
require_once(__DIR__.'/../models/UserMapperDB.php');


class ServerController extends AppController {
    public function __construct() {
        parent::__construct();
    }

    public function serverList() {
        if (isset($_SESSION['id_user'])) {
            $this->render('serverList', ['session' => $_SESSION]);
        } else {
            header('Location: ./');
        }
    }

    public function boardList() {
        $mapper = new BoardMapperDB();
        $boards = $mapper->getBoards();

        echo $boards ? json_encode($boards) : '';
    }

    public function leaveServer() {
        if (!isset($_SESSION['id_user'])) {
            http_response_code(401);
            exit;
        }
        
        $userUpdate = new UserUpdate();
        $userMapperDB = new UserMapperDB();
        $boardMapper = new BoardMapperDB();
        $boardUpdate = new BoardUpdate();

        $userUpdate->setTable($_SESSION['id_user'], NULL);

        // changes player_nr
        $users = $userMapperDB->getUsersFromBoard($_SESSION['id_board']);

        for ($i = 0; $i < count($users); $i++) {
            $userUpdate->setPlayerNr($users[$i]['id_user'], $i);
        }

        if (count($users) > 0) {
            // changes board's actual_player
            $board = $boardMapper->getBoard($_SESSION['id_board']);
            if ($board['actual_player'] >= count($users)) {
                if ($board['clockwise'] == 1) {
                    $board['actual_player'] = 0;
                }
                else {
                    $board['actual_player'] = count($users) - 1;
                }
                $boardUpdate->updateBoard($_SESSION['id_board'], $board['actual_player'], $board['clockwise']);
            }
            else {
                $boardUpdate->updateBoard($_SESSION['id_board'], 0, $board['clockwise']);
            }

            // host migration
            if ( $this->isHost($_SESSION['id_user']) == 1) {
                $userUpdate->setRole($users[0]['id_user'], 2);
            }
        } else {
            $boardUpdate->delete($board['id_board']);
        }

        if ($_SESSION['role'] != 'ADMIN') {
            $userUpdate->setRole($_SESSION['id_user'], 3);
            $_SESSION['role'] = "USER";
        }


        $_SESSION['id_board'] = NULL;

        $this->serverList();
    }

    private function isHost($id_user) {
        $userMapper = new UserMapper();
        
        $user = $userMapper->getUserById($id_user);

        if ( $user->getRole() == "HOST" ) {
            return 1;
        }
        return 0;
    }
}

?>
