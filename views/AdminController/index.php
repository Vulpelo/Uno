<!DOCTYPE html>
<html>

<?php include(dirname(__DIR__).'/head.html'); ?>

<script src="./public/js/admin_site/list.js"></script>

<body>
<?php include_once(dirname(__DIR__).'/navBar.html'); ?>

<div class="container">
    <div class="row">
        <h1 class="col-12 pl-0">ADMIN PANEL</h1>

        <h4 class="mt-4">Your data:</h4>
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody class="users-list" id='users_list'>
            </tbody>
        </table>

        <button class="btn btn-dark btn-lg" type="button" onclick="getUsers()">Get all users</button>
    </div>
</div>

</body>
</html>