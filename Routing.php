<?php

require_once('controllers/AdminController.php');
require_once('controllers/DefaultController.php');
require_once('controllers/GameController.php');
require_once("controllers/ServerController.php");

class Routing
{
    public $routes = [];

    public function __construct()
    {
        $this->routes = [
            'index' => [
                'controller' => 'DefaultController',
                'action' => 'index'
            ], 
            'login' => [
                'controller' => 'DefaultController',
                'action' => 'login'
            ],
            'register' => [
                'controller' => 'DefaultController',
                'action' => 'register'
            ],
            'logout' => [
                'controller' => 'DefaultController',
                'action' => 'logout'
            ],
            'userExists' => [
                'controller' => 'DefaultController',
                'action' => 'userExists'
            ],

            'admin_users' => [
                'controller' => 'AdminController',
                'action' => 'admin_users'
            ],
            'userDelete' => [
                'controller' => 'AdminController',
                'action' => 'userDelete'
            ],
            'adminPanel' => [
                'controller' => 'AdminController',
                'action' => 'adminPanel'
            ],

            'joinGame' => [
                'controller' => 'GameController',
                'action' => 'joinGame'
            ],
            'startGame' => [
                'controller' => 'GameController',
                'action' => 'startGame'
            ],
            'userList' => [
                'controller' => 'GameController',
                'action' => 'userList'
            ],
            'gameDataUpdate' => [
                'controller' => 'GameController',
                'action' => 'gameDataUpdate'
            ],
            'gameThrowCard' => [
                'controller' => 'GameController',
                'action' => 'gameThrowCard'
            ],
            'gamePileOfCards' => [
                'controller' => 'GameController',
                'action' => 'gamePileOfCards'
            ],
            'createBoard' => [
                'controller' => 'GameController',
                'action' => 'createBoard'
            ],

            'serverList' => [
                'controller' => 'ServerController',
                'action' => 'serverList'
            ],
            'leaveServer' => [
                'controller' => 'ServerController',
                'action' => 'leaveServer'
            ],
            'boardList' => [
                'controller' => 'ServerController',
                'action' => 'boardList'
            ]
        ];
    }


    public function run()
    {
        //localhost:8000?page=login
        // isset() - sprawdzanie czy taka zmienna wogule istnieje
        $page = isset($_GET['page']) 
            && isset( $this->routes[$_GET['page']] ) ? $_GET['page'] : 'login';
        
        if ($this->routes[$page])
        {
            $controller = $this->routes[$page]['controller'];
            $action = $this->routes[$page]['action'];

            // tworzenie klasy z nazwą zapisaną w stringu
            $object = new $controller;
            $object->$action();
        }
        
    }
}

?>
