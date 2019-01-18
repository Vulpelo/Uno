<!DOCTYPE html>
<html>
<?php include_once(dirname(__DIR__).'/head.html'); ?>

<script src="./public/js/makelist.js"></script>

<body>
<?php include_once(dirname(__DIR__).'/navBar.html'); ?>

<h1>SERVER LIST</h1>

<table id='ServerList'>
  <tr>
    <th>Server name</th>
    <th>sth</th>
  </tr>
</table>


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
