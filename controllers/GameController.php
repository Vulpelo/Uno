<?php 

require_once ('AppController.php');
require_once(__DIR__.'/../models/UserUpdate.php');
require_once(__DIR__.'/../models/UserMapper.php');

class GameController extends AppController {
    public function __construct() {
        parent::__construct();
    }

    public function joinGame() {
        $userUpdate = new UserUpdate();
        $userUpdate->setTable($_SESSION['id_user'], $_POST['id_board']);

        $this->render('game', ['name'=>$_POST['name'], 'id_table'=>$_POST['id_board']]);
    }

    public function userList() {
        $uMapper = new UserMapper();
        $users = $uMapper->getUsersFromTable($_POST['id_table']);

        // header('Content-type: application/json');
        // http_response_code(200);

        for ($i=0; $i< count($users); $i++) {
            echo $users[$i]->getId().',';
            echo $users[$i]->getName().';';
        }
    }
}

?>
