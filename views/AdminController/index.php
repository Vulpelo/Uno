<!DOCTYPE html>
<html>

<?php include(dirname(__DIR__).'/head.html'); ?>


<body>
<?php include_once(dirname(__DIR__).'/navBar.html'); ?>

<div class="container">
    <div class="column">
        <h1 class="col-12 pl-0">ADMIN PANEL</h1>

        <div class="row">
            <button class="btn btn-dark btn-lg" type="button" onclick="table.getData()">Refresh</button>
        </div>

        <h4 class="mt-4">Your data:</h4>

        <table class="table table-hover">
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody class="users-list" id='users_list'>
            </tbody>
        </table>

    </div>
</div>


<script src="./public/js/admin_site/list.js"></script>
<script src="./public/js/updateTableQuary.js"></script>
<script>
    table.start("?page=admin_users", "users_list");
</script>

</body>
</html>