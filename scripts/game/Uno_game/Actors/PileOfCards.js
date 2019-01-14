class PileOfCards extends Actor {
    constructor(table) {
        super();
        
        let rM = [new Rectangle(new Vector2d(0,0))];
        rM[0].setColor = "#111111";
        rM[0].setDimensions = [30,50];

        this.setModel = rM; 

        this.table = table;
    }

    onMouseClick() {
        if (Server.data.board.actual_player == Server.data.user.player_nr
            && !this.table.canThrowAnyCard(this.table.players[this.table.actualPlayer])) {
            MQuarry.send({
                type: "POST",
                url: "?page=gamePileOfCards",
                data: ""
              }, this.update);

            // this.table.giveActualPlayerCard();
            // this.table.unoGuiShow(this.table.players[this.table.actualPlayer]);
        }
    }
    
    update(data) {
        Server.data = data;
        console.log(data);

    }
}
