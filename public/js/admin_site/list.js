function getUsers() {

    MQuarry.send({
        type: "POST",
        url: "?page=admin_users",
        data: ""
        }, done);
}

function done(data) {
    createTableList(data);
}

function addElement(index, id, name, surname, email, role)
{
    let table = document.getElementById("users_list");
    let row = table.insertRow(index);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    cell1.innerHTML = name;
    cell2.innerHTML = surname;
    cell3.innerHTML = email;
    cell4.innerHTML = role;
    cell5.innerHTML = `<button class="btn btn-danger" type="button" onclick="deleteUser(` + id + `)">`;
}

function createTableList(data) {
    for (let i=0; i<data.length; i++) {
        addElement(i, data[i]['id_user'], data[i]['name'], data[i]['surname'], data[i]['email'], data[i]['role']);
    }
}