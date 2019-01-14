
class TableController extends Actor {
    constructor(table) {
        super();
        this.table = table;
        // this.setNewActualCard(new Card( Server.data.actualCard.id_card, Server.data.actualCard.color, Server.data.actualCard.symbol, this));
    }

    eventTick() {
        if (this.table.ActualCard == null || this.table.ActualCard.Id !== Server.data.actualCard.id_card) {
            this.updateCard();
        }
        this.table.ActualPlayer = Server.data.board.actual_player;
        // this.table.Hud.Text = "Player " + Server.data.board.actual_player + " turn";
    }

    updateCard() {
        RenderData.Destroy(this.table.ActualCard);
        let card = new Card( Server.data.actualCard.id_card, Server.data.actualCard.color, Server.data.actualCard.symbol, this.table );
        RenderData.spawnActor(card);
        this.table.ActualCard = card;
    }
}
