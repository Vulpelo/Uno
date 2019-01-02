<!DOCTYPE html>
<html>
<?php include_once(dirname(__DIR__).'/head.html'); ?>

<body>

<div class="header">
    <h1>GAME</h1>
</div>
    
<div class="row">
    <div class="column">
        <h2>uno</h2>
        <canvas id="window" width="600" height="500" ></canvas>
    </div>
    <div class="column">
        <h2>Table: <?= $name ?></h2>
        <table id='ServerList'>
            <form action="?page=leaveServer" method="POST">
                <input type="submit" value="Leave">
            </form>
            <tr>
                <th>Player</th>
                <th>Cards</th>
            </tr>
        </table>

    </div>
</div>

    <?php include_once(dirname(__DIR__).'/../scripts/scripts.php'); ?>

</body>
</html> 
