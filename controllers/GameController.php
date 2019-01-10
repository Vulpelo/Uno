<?php 

require_once ('AppController.php');
require_once(__DIR__.'/../models/UserUpdate.php');
require_once(__DIR__.'/../models/UserMapper.php');
require_once(__DIR__.'/../models/UserMapperDB.php');


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
        $uMapper = new UserMapperDB();

        header('Content-type: application/json');
        http_response_code(200);

        $users = $uMapper->getUsersFromTable($_POST['id_table']);
        echo $users ? json_encode($users) : '';
    }

    public function gameDataUpdate() {
        
    }

}

?>
