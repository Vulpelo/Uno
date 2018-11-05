class PileOfCards extends Actor {
    constructor(table) {
        super();
        this.renderModel = [new Rectangle(new Vector2d(10,10))];
        this.renderModel[0].setColor = "#111111";
        this.renderModel[0].setDimensions = [30,50];

        this.table = table;
    }

    onMouseClick() {
        if (!this.table.BlockInteraction && !this.table.canThrowAnyCard(this.table.players[this.table.actualPlayer])){
            this.table.giveActualPlayerCard();
        }
    }
}
