<?php

require_once("AppController.php");

class ServerController extends AppController {
    public function __construct() {
        parent::__construct();
    }

    public function serverList() {
        $this->render('serverList');
    }
}

?>
