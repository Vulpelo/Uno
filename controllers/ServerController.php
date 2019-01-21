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
        $this->render('serverList', ['session' => $_SESSION]);
    }

    public function boardList() {
        $mapper = new BoardMapperDB();
        $boards = $mapper->getBoards();

        echo $boards ? json_encode($boards) : '';
    }

    public function leaveServer() {
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

        // changes board's actual_player
        $board = $boardMapper->getBoard($_SESSION['id_board']);
        if (count($users) != 0 && $board['actual_player'] >= count($users)) {
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
            if (count($users) > 0) {
                $userUpdate->setRole($users[0]['id_user'], 2);
            }
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
