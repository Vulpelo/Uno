<!DOCTYPE html>
<html>
<?php include_once(dirname(__DIR__).'/head.html'); ?>

<body>
<?php include_once(dirname(__DIR__).'/navBar.html'); ?>

<div class="container">

    <div class="starter-template">
        <div class="settings-table">
            <div>Change password</div>
            <div class="settings-row">
                <div class="settings-column">
                    <span>Current password</span>
                </div>
                <div class="settings-column">
                    <input id="currentPassword" type="password" />
                </div>
            </div>
            <div class="settings-row">
                <div class="settings-column">
                    <span>New password</span>
                </div>
                <div class="settings-column">
                    <input id="newPassword" type="password" />
                </div>
            </div>
            <div class="settings-row">
                <div class="settings-column">
                    <span>Confirm new password</span>
                </div>
                <div class="settings-column">
                    <input id="confirmPassword" type="password" />
                </div>
            </div>
            <div class="settings-row">
                <div class="settings-column"></div>
                <div class="settings-column">
                    <button onclick="changePassword()">Change password</button>
                </div>
            </div>
            <div class="settings-row">
                <div class="settings-column" id="response"></div>
            </div>
        </div>
    </div>

</div>
<script src="./public/js/UserController/userSettings.js"></script>
</body>

</html> 
