<?php 

require_once ('AppController.php');
require_once(__DIR__.'/../models/UserUpdate.php');


class GameController extends AppController {
    public function __construct() {
        parent::__construct();
    }

    public function joinGame() {
        $userUpdate = new UserUpdate();
        $userUpdate->setTable($_SESSION['id_user'], $_POST['id_board']);

        $this->render('game', ['name'=>$_POST['name'], 'id_table'=>$_POST['id_board']]);
    }
}

?>
