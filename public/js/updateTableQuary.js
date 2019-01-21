let len=0;
let URL = "?page=boardList";
let tableID = "ServerList";

function start(newURL, newtableID) {
    URL = newURL;
    tableID = newtableID;
    getData();
}

function getData() {
    MQuarry.send({
        type: "POST",
        url: URL,
        data: ""
        }, done);
}

function done(data) {
    createTableList(data);
}

function createTableList(data) {
    clearTable();

    len = data.length;

    add(data);
}

function clearTable() {
    let table = document.getElementById(tableID);
    for (let i=0; i<len; i++) {
        table.deleteRow(0);
    }
}

function add(data) {
    for (let i=0; i<data.length; i++) {
        addElement(i, data[i]);
    }
}

/*
function addElement(index, data) {
    // index - number of row
    // ...
    // YOU NEED TO CREATE YOUR OWN addElement(DATA) FUNCTION FOR ADDING 
    // ... 
}


EXAMPLE:

    function addElement(index, data) {
        let table = document.getElementById("ServerList");

        let row = table.insertRow(index);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.innerHTML = index+1;
        cell2.innerHTML = data['name'];
        cell3.innerHTML = data['nrOfPlayers'] + "/4";
    }


RUNNING CODE:

    <script src="  //YOUR_SCRIPT_WITH_addElement(index, data)_FUNCTION//  "></script>
    <script src="./public/js//updateTableQuary.js"></script>
    <script>
        start("?page=admin_users", "users_list");
    </script>
*/
