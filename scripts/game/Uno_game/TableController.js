
class TableController extends Actor {
    constructor(table) {
        super();
        this.table = table;
        this.once = true;
    }

    eventTick() {
        if (this.once) {
            console.log(Server.data);
            this.once = false;
        }
        if (Server.data.users.length != this.table.players.length) {
            this.table.createPlayers(Server.data.users.length); 
        }

        if (this.table.ActualCard == null || this.table.ActualCard.Id !== Server.data.actualCard.id_card 
            || this.table.ActualCard.CardColor !== Server.data.actualCard.color) {
            this.updateCard();
        }

        if (this.table.ActualCard.CardColor == 'wild' && this.table.playerTurn()) {
            this.table.showChangeColorGui(true);
        }
        else {
            this.table.showChangeColorGui(false);
        }

        this.table.ActualPlayer = Server.data.board.actual_player;
    }

    updateCard() {
        if (Server.data.actualCard) {
            RenderData.Destroy(this.table.ActualCard);

            let card = new Card( Server.data.actualCard.id_card, Server.data.actualCard.color, Server.data.actualCard.symbol, this.table );
            RenderData.spawnActor(card);
            this.table.ActualCard = card;
        }

    }
}
