<?php

// Zwraca błąd servera jeżeli niebędzie tej klasy, lub będzie wielokrotnie wczytane
require_once("AppController.php");
require_once(__DIR__.'/../models/UserMapper.php');
require_once(__DIR__.'/../models/User.php');


class DefaultController extends AppController
{
        public function __construct()
        {
            parent::__construct();
        }

        public function index()
        {
            $name = 'Damian';
            $this->render('index', ['name'=>$name]);
        }

        public function login()
        {
            $mapper = new UserMapper();

            if ($this->isPost()) {
                $user = $mapper->getUser($_POST['email']);

                if (!$user) {
                    $this->render('login');
                }
                if ($_POST['password'] !== $user->getPassword()) {
                    $this->render('login');
                } 
                else {
                    $_SESSION['id_user'] = $user->getId();
                    $_SESSION['role'] = $user->getRole();

                    $this->render('index', ['name' => $_SESSION['id_user']]);
                    exit();
                }

                var_dump($_POST);
            }
            $this->render('login');
        }
}

?>
