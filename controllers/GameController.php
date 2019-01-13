<?php 

require_once ('AppController.php');
require_once(__DIR__.'/../models/CardUpdate.php');
require_once(__DIR__.'/../models/UserUpdate.php');
require_once(__DIR__.'/../models/UserMapper.php');
require_once(__DIR__.'/../models/UserMapperDB.php');
require_once(__DIR__.'/../models/CardMapperDB.php');
require_once(__DIR__.'/../models/BoardMapperDB.php');


class GameController extends AppController {
    public function __construct() {
        parent::__construct();
    }

    public function joinGame() {
        $userUpdate = new UserUpdate();
        $userUpdate->setTable($_SESSION['id_user'], $_POST['id_board']);
        $_SESSION['id_board'] = $_POST['id_board'];

        $this->render('game', ['name'=>$_POST['name'], 'id_table'=>$_POST['id_board']]);
    }

    public function userList() {
        $uMapper = new UserMapperDB();

        header('Content-type: application/json');
        http_response_code(200);

        $users = $uMapper->getUsersFromBoardList($_POST['id_table']);
        echo $users ? json_encode($users) : '';
    }

    public function gameDataUpdate() {
        $uMapper = new UserMapperDB();
        $cardMapper = new CardMapperDB();
        $boardMapper = new BoardMapperDB();

        header('Content-type: application/json');
        http_response_code(200);

        $user = $uMapper->getUser($_SESSION['id_user']);
        $card = $cardMapper->getCard(0, $_SESSION['id_board']);
        $cards = $cardMapper->getCards($_SESSION['id_user']);
        $users = $uMapper->getUsersFromBoard( $_SESSION['id_board'], $_SESSION['id_user'] );
        $board = $boardMapper->getBoard($_SESSION['id_board']); 

        $data = ['user'=> $user, 'cards'=> $cards, 'users'=> $users, 'board'=> $board, 'actualCard'=> $card];

        echo $data ? json_encode($data) : '';
    }

    public function gameThrowCard() {
        $cardUpdate = new CardUpdate();
        // 0 is a board card in the middle of the table
        $cardUpdate->removeAllUserCardsOnBoard(0, $_SESSION['id_board']);
        $cardUpdate->throwCard($_POST['id_card']);
        echo 1;
    }
}

?>
