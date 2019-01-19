let id_table = null;
let len=0;
let oldPlayers;
let id_user=-1;

function startGame() {
    MQuarry.send({
        type: "POST",
        url: "?page=startGame",
        data: ""
        }, empty);
}

function updateTable(players) {
    if (players.length > 0) {
        let table = document.getElementById("PlayerList");
        
        for (let i=0; i<len; i++) {
            table.deleteRow(1);
        }

        for (let i=0; i<players.length; i++) {
            let row = table.insertRow(i+1);
            let cell1 = row.insertCell(0);
        
            cell1.innerHTML = players[i]['name'];
        }

        len = players.length;
        oldPlayers = players;

        // showStartButton(0);
        hostSet(players);
    }
}

function updatePlayerList() {
    MQuarry.send({
        type: "POST",
        url: "?page=userList",
        data: "id_table="+id_table
        }, updateTable);
}

function startUpdatePlayerList(idTable) {
    id_table = idTable;
    updatePlayerList();
    setInterval(updatePlayerList, 2000);
}

function empty(data) {
    console.log(data);
}

function start(theHost, id) {
    id_user = id;
    showStartButton(theHost);
}

function showStartButton(theHost) {
    if (theHost == 1) {
        let prev = document.getElementById("startButton");
        if (prev == null) {
            let b = document.getElementById("startButtonPlace");

            let elem = document.createElement("div");
            elem.innerHTML = '<button class="btn btn-primary btn-sm" onclick="startGame()">Start</button>';
            elem.id = "startButton";
        
            b.appendChild(elem);
        }
    }
    else {
        let prev = document.getElementById("startButton");
        if (prev != null) {
            let b = document.getElementById("startButtonPlace");
            b.removeChild(prev);
        }
    }
}

function hostSet(players) {
    let is = 0;
    for (let i=0; i<players.length; i++) {
        if (players[i]['role'] == "HOST" || players[i]['role'] == "ADMIN") {
            if (players[i]['id_user'] == id_user) {
                is = 1;
            }
            break;
        }
    }
    showStartButton(is);
}
