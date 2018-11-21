<?php

// Zwraca błąd servera jeżeli niebędzie tej klasy, lub będzie wielokrotnie wczytane
require_once("AppController.php");
require_once(__DIR__.'/../Database.php');

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
            // Data base connection
            // $db = new Database();
            // $stmt = $db->connect()->prepare('SELECT * FROM users');
            // $stmt->execute();

            // var_dump($stmt->fetchAll(PDO::FETCH_ASSOC));
            

            if ($this->isPost()) {
                var_dump($_POST);
            }
            $this->render('login');
        }
}

?>
