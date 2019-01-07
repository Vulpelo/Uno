let id_table = null;
let len=0;
let oldPlayers;

function updateTable(xhttp) {
    let players = xhttp.responseText.split(';');

    if (players.length > 0) {
        let table = document.getElementById("PlayerList");
        
        console.log(players);


        for (let i=0; i<len-1; i++) {
            table.deleteRow(1);
        }

        for (let i=0; i<players.length-1; i++) {
            let row = table.insertRow(i+1);
            let cell1 = row.insertCell(0);
        
            cell1.innerHTML = players[i].split(',')[1];
        }

        len = players.length;
        oldPlayers = players;
    }
}

function updatePlayerList() {
    console.log(id_table);

    MQuarry.send({
        type: "POST",
        url: "./public/js/game_site/updateTableHandler.php",
        data: "id_table="+id_table
        }, updateTable);
}

function startUpdatePlayerList(idTable) {
    id_table = idTable;
    updatePlayerList();
    setInterval(updatePlayerList, 2000);
}

