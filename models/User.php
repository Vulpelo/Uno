<?php

class User {
    private $id;
    private $name;
    private $email;
    private $password;
    private $role;

    public function __construct($id, $username,  $email, $password, $role, $idTable){
        $this->id = $id;
        $this->name = $username;
        $this->email = $email;
        $this->password = $password;
        $this->role = $role;
        $this->idTable = $idTable;
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


    public function getRole() {
        return $this->role;
    }

    public function setRole($role) : void {
        $this->role = $role;
    }


    public function getPassword() {
        return $this->password;
    }

    public function setPassword($password) : void {
        $this->password = $password;
    }

    
    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) : void {
        $this->email = $email;
    }

    public function getIdTable() {
        return $this->idTable;
    }

    public function setIdTable($idTable) : void {
        $this->idTable = $idTable;
    }
}

?>
