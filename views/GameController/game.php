<!DOCTYPE html>
<html>
<?php include_once(dirname(__DIR__).'/head.html'); ?>

<script src="./public/js/game_site/updateTable.js"></script>

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
        <table id='PlayerList'>
            <form action="?page=leaveServer" method="POST">
                <input type="submit" value="Leave">
            </form>
            <?php 
            if (true) {
                echo '<button onclick="startGame()">Start</button>';
            }
            ?>
            <tr>
                <th>Player</th>
                <th>Cards</th>
            </tr>
        </table>

    </div>
</div>


    <script>
        startUpdatePlayerList(<?= $id_table ?>);
    </script>

    <?php include_once(dirname(__DIR__).'/../scripts/gameScripts.php'); ?>
</body>
</html> 
