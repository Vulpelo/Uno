<?php 

require_once ('AppController.php');
require_once(__DIR__.'/../models/Update/BoardUpdate.php');
require_once(__DIR__.'/../models/Update/CardUpdate.php');
require_once(__DIR__.'/../models/Update/UserUpdate.php');
require_once(__DIR__.'/../models/UserMapper.php');
require_once(__DIR__.'/../models/UserMapperDB.php');
require_once(__DIR__.'/../models/CardMapperDB.php');
require_once(__DIR__.'/../models/BoardMapperDB.php');


class GameController extends AppController {
    private $data;
    private $colors;

    public function __construct() {
        parent::__construct();
        $this->colors = ["red", "green", "blue", "yellow", "black"];
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

    private function dataUpdate() {
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
        $this->data = $data;
    }

    private function randomCard() {
        $cardUpdate = new CardUpdate();

        $randSymbol = rand(0, 14);// Math.floor(Math.random() * 15);
        $randColor;
        // wild card
        if ($randSymbol > 12) {
            $randColor = 4;
        }
        else {
            $randColor = rand(0,3);// Math.floor(Math.random() * 4);
        }
        $randColor = $this->colors[$randColor];

        // $cardUpdate->addCard("red", 14, $_SESSION['id_user'], $_SESSION['id_board']);
        $cardUpdate->addCard($randColor, $randSymbol, $_SESSION['id_user'], $_SESSION['id_board']);
    }

    public function gameDataUpdate() {
        $this->dataUpdate();
        echo $this->data ? json_encode($this->data) : '';
    }

    public function gameThrowCard() {
        $cardUpdate = new CardUpdate();
        // 0 is a board card in the middle of the table
        $cardUpdate->removeAllUserCardsOnBoard(0, $_SESSION['id_board']);
        $cardUpdate->throwCard($_POST['id_card']);

        $this->dataUpdate();

        $nrOfPlayers = count($this->data['users']);
        $actual = $this->data['board']['actual_player'];
        $clockwise = $this->data['board']['clockwise'];

        $newActual = $actual;

        if ($clockwise == 1) {
            if ($actual >= $nrOfPlayers-1) {
                $newActual = 0;
            }
            else {
                $newActual++;
            }
        }
        else if ($clockwise == 0) {
            if ($actual <= 0) {
                $newActual = $nrOfPlayers - 1;
            }
            else {
                $newActual--;
            }
        }

        $boardUpdate = new BoardUpdate();
        $boardUpdate->setActual($newActual, $_SESSION['id_board']);

        $this->dataUpdate();

        echo $this->data ? json_encode($this->data) : '';
    }

    public function gamePileOfCards() {
        // $this->randomCard();
        $cardUpdate = new CardUpdate();

        $randSymbol = rand(0, 14);// Math.floor(Math.random() * 15);
        $randColor;
        // wild card
        if ($randSymbol > 12) {
            $randColor = 4;
        }
        else {
            $randColor = rand(0,3);// Math.floor(Math.random() * 4);
        }
        $randColor = $this->colors[$randColor];

        $cardUpdate->addCard($randColor, $randSymbol, $_SESSION['id_user'], $_SESSION['id_board']);

        // $cardUpdate->addCard($randColor, $randSymbol, $_SESSION['id_user'], $_SESSION['id_board']);


        $this->dataUpdate();
        echo $this->data ? json_encode($this->data) : '';
    }
}

?>
