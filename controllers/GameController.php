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
    private $startNrOfCards;

    public function __construct() {
        parent::__construct();
        $this->colors = ["red", "green", "blue", "yellow", "black"];
        $this->startNrOfCards = 7;
    }

    public function joinGame() {
        $userUpdate = new UserUpdate();
        $userMapper = new UserMapper();
        $userMapperDB = new UserMapperDB();

        $userUpdate->setTable($_SESSION['id_user'], $_POST['id_board']);
        $_SESSION['id_board'] = $_POST['id_board'];

        // setting host
        $youHost = 0;
        $host = $userMapper->getHostFromTable($_POST['id_board']);
        if ($host->getId() == NULL) {
            if ($_SESSION['role'] !== 'ADMIN') {
                $userUpdate->setRole($_SESSION['id_user'], 2);
                $_SESSION['role'] = "HOST";
                $youHost = 1;
            }
        }
        else if ($host->getId() == $_SESSION['id_user']) {
            $youHost = 1;
            $_SESSION['role'] = "HOST";
        }

        // changes player_nr
        $users = $userMapperDB->getUsersFromBoard($_SESSION['id_board']);

        for ($i = 0; $i < count($users); $i++) {
            $userUpdate->setPlayerNr($users[$i]['id_user'], $i);
        }

        $this->render('game', ['session' => $_SESSION, 'id_user'=>$_SESSION['id_user'], 'name'=>$_POST['name'], 'id_table'=>$_POST['id_board'], 'showStartButton'=>$youHost]);
    }

    public function startGame() {
        $this->dataUpdate();
        $cardUpdate = new CardUpdate();

        $cardUpdate->removeAllCardsOnBoard($_SESSION['id_board']);

        for ($i=0; $i < count($this->data['users']); $i++) {
            for ($j=0; $j < $this->startNrOfCards; $j++) {
                $this->randomCard($this->data['users'][$i]['id_user'], $this->data['board']['id_board']);
            }
        }

        $this->randomCard(0, $this->data['board']['id_board']);
        // echo count($this->data['users']);
        echo $this->data ? json_encode($this->data) : '';
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
        $users = $uMapper->getUsersFromBoard( $_SESSION['id_board']);
        $board = $boardMapper->getBoard($_SESSION['id_board']); 

        $data = ['user'=> $user, 'cards'=> $cards, 'users'=> $users, 'board'=> $board, 'actualCard'=> $card];
        $this->data = $data;
    }

    private function randomCard($id_user, $id_board) {
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
        $cardUpdate->addCard($randColor, $randSymbol, $id_user, $id_board);
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
        $this->randomCard($_SESSION['id_user'], $_SESSION['id_board']);

        $this->dataUpdate();
        echo $this->data ? json_encode($this->data) : '';
    }



    public function createBoard() {
        $boardUpdate = new BoardUpdate();
        $boardMapper = new BoardMapperDB();

        $board = null;

        if ($boardUpdate->create($_POST['board_name']) ) {
            $board = $boardMapper->getBoardByName($_POST['board_name']);
        }

        echo $board ? json_encode($board) : '';
    }

}

?>
