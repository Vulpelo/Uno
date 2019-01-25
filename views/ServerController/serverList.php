<!DOCTYPE html>
<html>
<?php include_once(dirname(__DIR__).'/head.html'); ?>


<body>
<?php include_once(dirname(__DIR__).'/navBar.html'); ?>

<div class="container">
    <div class="row">
        <h1 class="col-12 pl-0">BOARD LIST</h1>

        <div class="column">
            <button class="btn btn-primary" type="button" onclick="createBoard()">Create board</button>
        </div>

        <div class="column">
            <button class="btn btn-dark" type="button" onclick="table.getData()">Refresh</button>
        </div>

        <table class="table table-striped">
            <thead class="thead-dark">
            <tr>
                <th>#</th>
                <th>Server name</th>
                <th>Players</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody class="users-list" id='ServerList'>
            </tbody>
        </table>

    </div>
</div>


<script src="./public/js/serverList_site/makelist.js"></script>
<script src="./public/js//updateTableQuary.js"></script>
<script>
    table.start("?page=boardList", "ServerList");
</script>

</body>
</html> 
