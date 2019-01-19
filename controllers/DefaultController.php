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
            $this->render('index', ['session' => $_SESSION]);
        }

        public function login()
        {
            $mapper = new UserMapper();
               
            if ($this->isPost()) {
                $user = $mapper->getUser($_POST['email']);

                // If user exists
                if ($user) {
                    // if password is right
                    if ( password_verify($_POST['password'], $user->getPassword()) ) {
                        $_SESSION['id_user'] = $user->getId();
                        $_SESSION['id_board'] = NULL;
                        $_SESSION['username'] = $user->getName();
                        $_SESSION['role'] = $user->getRole();

                        $this->render('index', ['session' => $_SESSION]);
                        exit();
                    }
                }
            }
            $this->render('login', ['session' => null]);
        }

        public function logout()
        {
            if ($_SESSION != null) {

                $userUpdate = new UserUpdate();
                $cardUpdate = new CardUpdate();

                $cardUpdate->removeAllUserCards($_SESSION['id_user']);
                $userUpdate->logout($_SESSION['id_user']);

                if ($_SESSION['role'] == "HOST") {
                    $userUpdate->setRole($_SESSION['id_user'], 3);
                }

                session_unset();
            }

            $this->render('login', ['session' => null]);
        }
}

?>
