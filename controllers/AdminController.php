<?php

// Zwraca błąd servera jeżeli niebędzie tej klasy, lub będzie wielokrotnie wczytane
require_once("AppController.php");
require_once(__DIR__.'/../models/Update/UserUpdate.php');
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
            if (isset($_SESSION['id_user'])) {
                $this->render('index', ['user' => $user->getUser($_SESSION['id_user']), 'session'=> $_SESSION]);
            } else {
                header('Location: ./');
            }
        }

        public function index(): void
        {
            $user = new UserMapper();
            $this->render('index', ['user' => $user->getUser($_SESSION['id_user']), 'session'=> $_SESSION]);
        }
    
        public function admin_users(): void
        {
            if (!isset($_SESSION['id_user'])) {
                http_response_code(401);
                exit;
            }
            $user = new UserMapperDB();
    
            header('Content-type: application/json');
            http_response_code(200);
    
            $data = $user->getAllUsersAdmin();
            echo $data ? json_encode($data) : '';
        }
    
        public function userDelete(): void
        {
            if (!isset($_SESSION['id_user'])) {
                http_response_code(401);
                exit;
            }
            if (!isset($_POST['id_user'])) {
                http_response_code(404);
                return;
            }
    
            $user = new UserUpdate();
            $user->deleteUser((int)$_POST['id_user']);
    
            http_response_code(200);
        }
}

?>
