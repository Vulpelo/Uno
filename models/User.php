<?php

class User {
    private $name;
    private $surname;
    private $email;
    private $password;

    public function __construct(string $name){
        $this->name = $name;
    }

    public function getName(): string {
        return $this->name;
    }

    public function setname(string $name) : void {
        $this->name = $name;
    }

}

?>
