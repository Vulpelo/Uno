<!DOCTYPE html>
<html>
<?php include_once(dirname(__DIR__).'/head.html'); ?>

<body>
<?php include_once(dirname(__DIR__).'/navBar.html'); ?>

<h1>HOMEPAGE</h1>
<p>
    Hello to homepage of UNO game mr. <?= $session['username'] ?>!
</p>

<form method="post" action="?page=serverList">
    <input type="submit" value="Find game">
</form>

</body>

</html> 
