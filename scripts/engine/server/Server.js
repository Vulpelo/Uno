
class Server {
    constructor() {
        this.time = 100;
    }

    start() {
        setInterval(this.ask, this.time);
    }

    ask() {
        MQuarry.send({
            type: "POST",
            url: "some.php",
            data: "name=John"
          }, update);
    }

    update(xhttp) {
        
    }
}
