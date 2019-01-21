function addElement(index, data) {
    let table = document.getElementById("users_list");

    let row = table.insertRow(index);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    cell1.innerHTML = index+1;
    cell2.innerHTML = data['name'];
    cell3.innerHTML = data['email'];
    cell4.innerHTML = data['role'];
    cell5.innerHTML = `<button class="btn btn-danger" type="button" onclick="deleteUser(` + data['id_user'] + `)">Delete</button>`;
}

function deleteUser(id_user) {
    MQuarry.send({
        type: "POST",
        url: "?page=userDelete",
        data: "id_user="+id_user
        }, function() {});
}

getUsers();
