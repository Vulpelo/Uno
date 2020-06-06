<?php

require_once("AppController.php");

require_once(__DIR__.'/../models/Update/UserUpdate.php');

require_once(__DIR__.'/../models/UserMapper.php');
require_once(__DIR__.'/../models/UserMapperDB.php');


class UserController extends AppController {
    public function __construct() {
        parent::__construct();
    }

    public function userSettings() {
        if (isset($_SESSION['id_user'])) {
            $this->render('userSettings', ['session' => $_SESSION]);
        } else {
            header('Location: ./');
        }
    }

    public function changePassword() {
        $userUpdate = new UserUpdate();
        $mapper = new UserMapper();

        if (!isset($_SESSION['id_user'])) {
            http_response_code(401);
            exit;
        }

        if ($this->isPost()) {
            $user = $mapper->getUserById($_SESSION['id_user']);

            // If user exists
            if ($user->getId() != null) {
                // if password is right
                if ( password_verify($_POST['currentPassword'], $user->getPassword()) ) {
                    $userUpdate->setPassword($_SESSION['id_user'], password_hash($_POST['newPassword'], PASSWORD_DEFAULT));
                    echo json_encode(['status' => 'success']);
                }
                else {
                    echo json_encode(['status' => 'incorrect password']);
                }
            }
        }
    }
}

?>
