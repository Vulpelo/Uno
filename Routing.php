<?php

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
            'game' => [
                'controller' => 'GameController',
                'action' => 'game'
            ],
            'serverList' => [
                'controller' => 'ServerController',
                'action' => 'serverList'
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
