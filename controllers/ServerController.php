<?php

require_once("AppController.php");

require_once(__DIR__.'/../models/Update/UserUpdate.php');

require_once(__DIR__.'/../models/BoardMapper.php');
require_once(__DIR__.'/../models/Board.php');
require_once(__DIR__.'/../models/UserMapper.php');
require_once(__DIR__.'/../models/UserMapperDB.php');


class ServerController extends AppController {
    public function __construct() {
        parent::__construct();
    }

    public function serverList() {
        $mapper = new BoardMapper();
        $boards = $mapper->getBoards();

        $this->render('serverList', ['boards'=>$boards]);
    }

    public function leaveServer() {
        $userUpdate = new UserUpdate();
        $userMapperDB = new UserMapperDB();

        $userUpdate->setTable($_SESSION['id_user'], NULL);
        $_SESSION['id_board'] = NULL;

        // changes player_nr
        $users = $userMapperDB->getUsersFromBoard($_SESSION['id_board']);

        for ($i = 0; $i < count($users); $i++) {
            $userUpdate->setPlayerNr($users[$i]['id_user'], $i);
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
