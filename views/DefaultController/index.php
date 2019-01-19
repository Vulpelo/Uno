<!DOCTYPE html>
<html>
<?php include_once(dirname(__DIR__).'/head.html'); ?>

<body>
<?php include_once(dirname(__DIR__).'/navBar.html'); ?>

<div class="container">

    <div class="starter-template">
        <h1>Homepage</h1>
        <p class="lead">Hello to homepage of UNO game <?= $session['username'] ?>!</p>
        <a class="btn btn-primary"  href="?page=serverList">Find game</a>
    </div>

</div>

</body>

</html> 
