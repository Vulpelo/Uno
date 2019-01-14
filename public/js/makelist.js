
function addElement(index, id, name)
{
    let table = document.getElementById("ServerList");
    let row = table.insertRow(index);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);

    cell1.innerHTML = name;
    cell2.innerHTML = "cos";
    // cell3.innerHTML = `<button onclick=join(this.value) value=`+ id +`>join<br>`;
    cell3.innerHTML = `
    <form action="?page=joinGame" method="POST">
        <input type="hidden" name="id_board" value="` + id + `">
        <input type="hidden" name="name" value="` + name + `">
        <input type="submit" value="Join">
    </form>
    `;
}

function createTableList(boardsIds, boardNames) {
    for (let i=0; i<boardNames.length; i++) {
        addElement(i+1, boardsIds[i], boardNames[i]);
    }
}

// function join(name) {
//     MQuarry.send({
//         type: "POST",
//         url: "?page=login",
//         data: ""
//     }, function() {
//         console.log("DONE");
//     });
// }
