let id_table = null;
let len=0;
let oldPlayers;

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
    }
}

function updatePlayerList() {
    MQuarry.send({
        type: "POST", //?page=nazwa // powinno działać przez Routing.php
        url: "?page=userList",//"./public/js/game_site/updateTableHandler.php",
        data: "id_table="+id_table
        }, updateTable);
}

function startUpdatePlayerList(idTable) {
    id_table = idTable;
    updatePlayerList();
    setInterval(updatePlayerList, 2000);
}
