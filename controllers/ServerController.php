<?php

require_once("AppController.php");

require_once(__DIR__.'/../models/Update/UserUpdate.php');

require_once(__DIR__.'/../models/BoardMapper.php');
require_once(__DIR__.'/../models/Board.php');
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


        if ($_SESSION['role'] != 'ADMIN') {
            $userUpdate->setRole($_SESSION['id_user'], 2);
        }

        // changes player_nr
        $users = $userMapperDB->getUsersFromBoard($_SESSION['id_board']);

        for ($i = 0; $i < count($users); $i++) {
            $userUpdate->setPlayerNr($users[$i]['id_user'], $i);
        }

        $this->serverList();
    }
}

?>
