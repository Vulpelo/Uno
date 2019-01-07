<?php

require_once(__DIR__.'/../../../models/UserMapper.php');

$uMapper = new UserMapper();
$users = $uMapper->getUsersFromTable($_POST['id_table']);

for ($i=0; $i< count($users); $i++) {
    echo $users[$i]->getId().',';
    echo $users[$i]->getName().';';
}

?>
