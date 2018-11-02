
class Card extends Actor {
    constructor(color, symbol, table) {
        super();
        this.played = false;
        this.table = table;
        this.cardColor = color;
        this.symbol = symbol;

        this.renderModel = [new Rectangle(new Vector2d(0,0)), new Text()];
        this.renderModel[0].color = this.cardColor;
        this.renderModel[0].setDimensions = [30,50];

        this.renderModel[1].Text = symbol;
    }

    get Symbol() {
        return this.symbol;
    }

    get CardColor() {
        
        return this.cardColor;
    }
    set CardColor(color) {
        this.cardColor = color;
        this.renderModel[0].color = this.cardColor;
    }

    onMouseClick() {
        if (!this.played && this.table.canBeThrown(this)) {
            this.played = true;
            this.power();
            this.table.endTurn();
        }
    }

    power() {
        //* symbol:
        //    10 - skip;    11 - reverse;   12 - +2 cards
        //    13 - +4 cards and change color;   14 - change color
        switch (this.symbol) {
            case 10:
                this.skipPower();
                break;
            case 11:
                this.reversePower();
                break;
            case 12:
                this.plus2Power();
                break;
            case 13:
                this.plus4Power()
                break;
            case 14:
                this.changeColorPower();
                break;
        }
    }

    skipPower() {
        this.table.skipPlayer();
    }

    reversePower() {
        this.table.reversePlayersQueue();
    }

    plus2Power() {
        for (let i=0; i<2; i++){
            this.table.giveNextPlayerCard();
        }
    }

    plus4Power() {
        for (let i=0; i<4; i++){
            this.table.giveNextPlayerCard();
        }
        this.changeColorPower();
    }

    changeColorPower() {
        let a = new ChangeColorGUI(this.table);
        RenderData.spawnActor(a, 0);
    }

}

class Player extends Actor {
    constructor() {
        super();
        this.arrCards = [];
    }

    updateCardsPosition() {
        for (let i=0; i<this.arrCards.length; i++) {
            this.arrCards[i].setPosition =
                new Vector2d(RenderData.window.clientWidth/2 + (i - Math.floor(this.arrCards.length/2)) *
                1/2*this.arrCards[i].renderModel[0].getDimensions[0] - this.arrCards[i].renderModel[0].getDimensions[0],
                    RenderData.window.clientHeight - this.arrCards[i].renderModel[0].getDimensions[1]);
        }
    }

    addCard(newCard) {
        this.arrCards.push(newCard);
        this.updateCardsPosition();
    }

    removeCard(card) {
        let pos = this.arrCards.indexOf(card);
        this.arrCards = this.arrCards.slice(0, pos).concat(this.arrCards.slice(pos+1)); 
        this.updateCardsPosition();
    }
}

class PileOfCards extends Actor {
    constructor(table) {
        super();
        this.renderModel = [new Rectangle(new Vector2d(10,10))];
        this.renderModel[0].setColor = "#111111";
        this.renderModel[0].setDimensions = [30,50];

        this.table = table;
    }

    onMouseClick() {
        this.table.giveActualPlayerCard();
    }
}

class Table {
    constructor() {
        this.colors = ["red", "green", "blue", "yellow", "black"];
        this.startAmountOfCards = 7;
        this.blockInteraction = false;

        this.center = new Vector2d(RenderData.window.clientWidth/2, RenderData.window.clientHeight/2);

        this.actualCard = null;
        this.actualPlayer = 0;
        this.players = [];

        this.pile = new PileOfCards(this);
        RenderData.spawnActor(this.pile);

        // player 1
        let gC = new Player();
        this.addPlayer(gC);

        this.setNewActualCard(this.randomCard());
    }

    get BlockInteraction() {
        return this.blockInteraction;
    }
    set BlockInteraction(nblock) {
        this.blockInteraction = nblock;
    }

    start() {
        for (let i=0; i<this.players.length * this.startAmountOfCards; i++) {
            this.giveCard(i%this.players.length);
        }
    }

    addPlayer(player) {
        RenderData.spawnActor(player);
        this.players.push(player);
    }

    giveCard(player_i) {
        let card = this.randomCard();
        RenderData.spawnActor(card);
        this.players[player_i].addCard(card);
    }

    reversePlayersQueue() {
        this.players = this.players.reverse();
    }

    giveActualPlayerCard() {
        this.giveCard(this.actualPlayer);
    }

    giveNextPlayerCard() {
        this.giveCard(this.getNextPlayerIndex());
    }

    getNextPlayerIndex() {
        let index = 0;
        index = this.actualPlayer + 1;
        if (index >= this.players.length) {
            index = 0;
        }
        return index;
    }

    skipPlayer() {
        this.actualPlayer = this.getNextPlayerIndex();
    }

    randomCard() {
        let randSymbol = Math.floor(Math.random() * 15);
        let randColor;
        // wild card
        if (randSymbol > 12) {
            randColor = 4;
        }
        else {
            randColor = Math.floor(Math.random() * 4);
        }
        return new Card(this.colors[randColor], randSymbol, this);
    }

    setNewActualCard(card) {
        RenderData.setElementToRenderLayer(card, 0);
        if (this.actualCard != null) {
            this.actualCard.renderModel.pop();
        }
        this.actualCard = card;
        card.setPosition = this.center;
    }

    canBeThrown(card) {
        if ( !this.blockInteraction 
            && (this.actualCard.CardColor == this.colors[4] || card.CardColor == this.colors[4] 
            || this.actualCard.CardColor == card.CardColor || this.actualCard.Symbol == card.Symbol) )
        {
            this.players[0].removeCard(card);
            this.setNewActualCard(card);
            return true;
        } 
        else {
            return false;
        }        
    }

    endTurn() {
        this.actualPlayer = this.getNextPlayerIndex();
    }
}

class ChangeColorGUI extends Actor {
    constructor(table) {
        super();
        this.table = table;

        this.renderModel = [new Rectangle(new Vector2d(-30,30)), new Rectangle(new Vector2d(0,30)),
            new Rectangle(new Vector2d(-30,0)), new Rectangle(new Vector2d(0,0))];
        this.renderModel[0].setColor = "red";
        this.renderModel[0].setDimensions = [30, 30];

        this.renderModel[1].setColor = "green";
        this.renderModel[1].setDimensions = [30, 30];

        this.renderModel[2].setColor = "blue";
        this.renderModel[2].setDimensions = [30, 30];

        this.renderModel[3].setColor = "yellow";
        this.renderModel[3].setDimensions = [30, 30];

        this.setPosition = new Vector2d(RenderData.window.clientWidth/2, RenderData.window.clientHeight/4);

        this.table.BlockInteraction = true;
    }

    onMouseClick(model) {
        let index = this.renderModel.indexOf(model);

        this.table.actualCard.CardColor = this.table.colors[index];

        this.table.BlockInteraction = false;

        RenderData.Destroy(this);
    }
}
