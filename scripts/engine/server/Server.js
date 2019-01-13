
class Server {
    constructor() {
        this.time = 300;
        this.started = false;
    }

    set Time(time) {
        this.time = time;
    }

    start() {
        if (!this.started) {
            ask();
            setInterval(ask, this.time);
            this.started = true;
        }
    }
}

function ask() {
    MQuarry.send({
        type: "POST",
        url: Server.quaryAskURL,
        data: ""
      }, this.update);
}

function update(data) {
    Server.data = data;
}

// Server.data: {…}
//     user: {...}
//     ​board: {…}​​
//         actual_player: "0"​​
//         clockwise: "0"​​
//         id_board: "1"
//         ​​name: "Table1"​​
//     cards: (3) […]​​
//         0: Object { id_card: "1", color: "red", symbol: "1", … }​​
//         1: Object { id_card: "2", color: "blue", symbol: "2", … }​​
//         2: Object { id_card: "3", color: "blue", symbol: "4", … }​​
//     ​users: (1) […]​​
//         0: Object { id_user: "2", name: "mateusz", card_count: "2", player_nr: null ,  … }​​
Server.data = null;
Server.quaryAskURL = "?page=gameDataUpdate";
