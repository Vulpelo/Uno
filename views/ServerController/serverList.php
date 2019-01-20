<!DOCTYPE html>
<html>
<?php include_once(dirname(__DIR__).'/head.html'); ?>

<script src="./public/js/serverList_site/makelist.js"></script>

<body>
<?php include_once(dirname(__DIR__).'/navBar.html'); ?>

<div class="container">
    <div class="row">
        <h1 class="col-12 pl-0">BOARD LIST</h1>

        <button class="btn btn-primary" type="button" onclick="createBoard()">Create board</button>

        <table class="table table-striped">
            <thead class="thead-dark">
            <tr>
                <th>#</th>
                <th>Server name</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody class="users-list" id='ServerList'>
            </tbody>
        </table>

    </div>
</div>

<?php 
  $boardsNames = [];
  $boardsId = [];
  for ($i=0; $i<count($boards); $i++) {
    array_push($boardsId, $boards[$i]->getId());
    array_push($boardsNames, $boards[$i]->getName());
  }
?>

<script type="text/javascript">
  let boardsId = <?php echo json_encode($boardsId); ?>;
  let boardsNames = <?php echo json_encode($boardsNames); ?>;
  createTableList(boardsId, boardsNames);
</script>

</body>
</html> 
