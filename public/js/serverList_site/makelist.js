
function addElement(index, data)
{
    let table = document.getElementById("ServerList");
    let row = table.insertRow(index);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    cell1.innerHTML = index+1;
    cell2.innerHTML = data['name'];
    cell3.innerHTML = data['nr_of_players'] + "/4";
    
    let text = `
    <div class="d-flex">
    <form action="?page=joinGame" method="POST">
        <input type="hidden" name="id_board" value="` + data['id_board'] + `">
        <input type="hidden" name="name" value="` + data['name'] + `">
        `
    if (data['nr_of_players'] >= 4) {
        text += `<button type="submit" class="btn btn-primary" disabled>Join</button>`;
    }
    else {
        text += `<button type="submit" class="btn btn-primary">Join</button>`;
    }
    text +=`</form></div>`;
    cell4.innerHTML = text;
}


function joinBoard(data) {
    if (!data) {
        alert('Board with this name allready exists');
    }
    // if board was created
    else {
        let form = `
        <form id='newForm' action="?page=joinGame" method="post">
            <input type="hidden" name="id_board" value="` + data['id_board'] + `">
            <input type="hidden" name="name" value="` + data['name'] + `">
        </form>
        `;

        document.body.innerHTML += form;
        document.getElementById("newForm").submit();
    }
}

function createBoard() {
    let board = prompt("Please enter board name:", "");

    if (board != null && board != "") {
        MQuarry.send({
            type: "POST",
            url: "?page=createBoard",
            data: "board_name="+board
        }, joinBoard);

    }
}
