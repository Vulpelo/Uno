
function addElement(index, id, name)
{
    let table = document.getElementById("ServerList");
    let row = table.insertRow(index);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);

    cell1.innerHTML = index+1;
    cell2.innerHTML = name;
    cell3.innerHTML = `
    <div class="d-flex">

    <form action="?page=joinGame" method="POST">
        <input type="hidden" name="id_board" value="` + id + `">
        <input type="hidden" name="name" value="` + name + `">
        <button type="submit" class="btn btn-primary">Join</button>
    </form>

    </div>
    `;
}

function createTableList(boardsIds, boardNames) {
    for (let i=0; i<boardNames.length; i++) {
        addElement(i, boardsIds[i], boardNames[i]);
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
