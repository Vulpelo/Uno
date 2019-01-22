

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

class TableQuary {

    constructor() {
        this.len=0;
        this.URL = "?page=boardList";
        this.tableID = "ServerList";
    }


    start(newURL, newtableID) {
        this.URL = newURL;
        this.tableID = newtableID;
        this.getData();
    }

    getData() {
        MQuarry.send({
            type: "POST",
            url: this.URL,
            data: ""
            }, done);
    }



    createTableList(data) {
        this.clearTable();

        this.len = data.length;

        this.add(data);
    }

    clearTable() {
        let table = document.getElementById(this.tableID);
        for (let i=0; i<this.len; i++) {
            table.deleteRow(0);
        }
    }

    add(data) {
        for (let i=0; i<data.length; i++) {
            addElement(i, data[i]);
        }
    }
}

let table = new TableQuary();

function done(data) {
    table.createTableList(data);
}
