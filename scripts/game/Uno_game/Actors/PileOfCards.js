class PileOfCards extends Actor {
    constructor(table) {
        super();
        
        let dim = [40,70];

        let rM = [new Rectangle(new Vector2d(0,0)),
            new MImage(new Vector2d(0,0), Resources.getImagePath("back"))];
        rM[0].setColor = "#111111";
        rM[0].setDimensions = dim;

        rM[1].setDimensions = dim;

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
    }
}
