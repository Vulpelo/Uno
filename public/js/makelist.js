
function addElement(index, id, name)
{
    let table = document.getElementById("ServerList");
    let row = table.insertRow(index);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);

    cell1.innerHTML = name;
    cell2.innerHTML = "cos";
    cell3.innerHTML = `<button onclick=join(this.value) value=`+ id +`>join<br>`;
}

function createTableList(boardsIds, boardNames) {
    for (let i=0; i<boardNames.length; i++) {
        addElement(i+1, boardsIds[i], boardNames[i]);
    }
}

function join(name) {
    console.log(name);
}
