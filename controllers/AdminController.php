<?php

// Zwraca błąd servera jeżeli niebędzie tej klasy, lub będzie wielokrotnie wczytane
require_once("AppController.php");
require_once(__DIR__.'/../models/UserMapper.php');
require_once(__DIR__.'/../models/User.php');


class AdminController extends AppController
{
        public function __construct()
        {
            parent::__construct();
        }

        public function adminPanel() {
            $user = new UserMapper();
            $this->render('index', ['user' => $user->getUser($_SESSION['id_user']), 'session'=> $_SESSION]);
        }

        public function index(): void
        {
            $user = new UserMapper();
            $this->render('index', ['user' => $user->getUser($_SESSION['id_user']), 'session'=> $_SESSION]);
        }
    
        public function admin_users(): void
        {
            $user = new UserMapperDB();
    
            header('Content-type: application/json');
            http_response_code(200);
    
            $data = $user->getAllUsers();
            echo $data ? json_encode($data) : '';
        }
    
        public function userDelete(): void
        {
            if (!isset($_POST['id'])) {
                http_response_code(404);
                return;
            }
    
            $user = new UserMapper();
            $user->delete((int)$_POST['id']);
    
            http_response_code(200);
        }
}

?>
