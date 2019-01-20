<?php

class Board {
    private $id;
    private $name;

    public function __construct($id, $name, $nrOfPlayers){
        $this->id = $id;
        $this->name = $name;
        $this->nrOfPlayers = $nrOfPlayers;
    }

    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function setName(string $name) : void {
        $this->name = $name;
    }
    
    public function getNrOfPlayers() {
        return $this->nrOfPlayers;
    }

    public function setNrOfPlayers(string $nrOfPlayers) : void {
        $this->nrOfPlayers = $nrOfPlayers;
    }
}

?>
