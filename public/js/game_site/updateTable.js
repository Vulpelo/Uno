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

            elem.innerHTML = `
                <h7>Settings:</h7>

                <div class="row">
                    <div class="col">
                        <input type="checkbox" name="zeros" value="zeros" disabled> 0<br>
                    </div>
                    <div class="col">
                        <input type="checkbox" name="sevens" value="sevens" disabled> 7<br>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <input type="checkbox" name="jump_in" value="jump_in" disabled> Jump in<br>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col">
                        <input type="checkbox" name="chalange" value="chalange" disabled> Challange/Decline<br>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <input type="checkbox" name="jump_in" value="jump_in" disabled> Stacking<br>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col">
                        <input type="checkbox" name="jump_in" value="jump_in" disabled checked> Need to play card if have one<br>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <input type="checkbox" name="jump_in" value="jump_in" disabled checked> Draw till have card to play<br>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <input type="checkbox" name="jump_in" value="jump_in" disabled> Call uno<br>
                    </div>
                </div>


                <button class="btn btn-primary btn-sm" onclick="startGame()">Start</button>
            `;

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
