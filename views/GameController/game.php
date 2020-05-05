<!DOCTYPE html>
<html>
<?php include_once(dirname(__DIR__).'/head.html'); ?>

<script src="./public/js/game_site/updateTable.js"></script>

<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>

<script src="./public/js/DefaultController/login.js"></script>
<script src="./public/js/DefaultController/register.js"></script>


<body>
<?php include_once(dirname(__DIR__).'/navBar.html'); ?>

<div class="header">
    <h1>GAME</h1>
</div>
    
<div class="container">

    <div class="row row-offcanvas row-offcanvas-right p">

        <div class="col bg-lightgray">
            <canvas class="windowSetting" id="window" width="600" height="500" ></canvas>
        </div>

        <div class="col-3 bg-lightblue">
            <h2>Table: <?= $name ?></h2>
            <a class="btn btn-danger btn-sm"  href="?page=leaveServer">Leave</a>
            
            <table id='PlayerList'>
                <div id="startButtonPlace"> 
                </div>
                <tr>
                    <th><br>Players:</th>
                    <th><br>Wins:</th>
                </tr>
            </table>
        </div>

    </div>

</div>

    <script>
        start(<?= $showStartButton ?>, <?= $id_user ?>);
        startUpdatePlayerList(<?= $id_table ?>);
    </script>

    <?php include_once(dirname(__DIR__).'/../scripts/gameScripts.php'); ?>
</body>
</html> 
