class PileOfCards extends Actor {
    constructor(table) {
        super();
        
        let rM = [new Rectangle(new Vector2d(10,10))];
        rM[0].setColor = "#111111";
        rM[0].setDimensions = [30,50];

        this.setModel = rM; 

        this.table = table;
    }

    onMouseClick() {
        if (!this.table.BlockInteraction && !this.table.canThrowAnyCard(this.table.players[this.table.actualPlayer])) {
            this.table.giveActualPlayerCard();
            this.table.unoGuiShow(this.table.players[this.table.actualPlayer]);
        }
    }
}
