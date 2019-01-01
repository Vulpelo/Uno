<?php

require_once("AppController.php");

require_once(__DIR__.'/../models/BoardMapper.php');
require_once(__DIR__.'/../models/Board.php');


class ServerController extends AppController {
    public function __construct() {
        parent::__construct();
    }

    public function serverList() {
        $mapper = new BoardMapper();
        
        $boards = $mapper->getBoards();

        $this->render('serverList', ['boards'=>$boards]);
    }
}

?>
