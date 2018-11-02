
class Card extends Actor {
    constructor(color, symbol, table) {
        super();
        this.played = false;
        this.table = table;
        this.cardColor = color;
        this.symbol = symbol;
        let tmp = '#000000';
        switch (color) {
        case 'red':
            tmp = '#FF0000';
            break;
        case 'green':
            tmp = '#00FF00';
            break;
        case 'blue':
            tmp = '#0000FF';
            break;
        case 'yellow':
            tmp = '#FFFF00';
            break;
        }
        this.renderModel = [new Rectangle(new Vector2d(0,0)), new Text()];
        this.renderModel[0].color = tmp;
        this.renderModel[0].setDimensions = [30,50];

        this.renderModel[1].Text = symbol;
    }

    get Symbol() {
        return this.symbol;
    }

    get CardColor() {
        return this.cardColor;
    }

    onMouseClick() {
        if (!this.played && this.table.canBeThrown(this)) {
            this.played = true;
        }
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
        this.colors = ["red", "green", "blue", "yellow"];
        this.startAmountOfCards = 7;

        this.center = new Vector2d(RenderData.window.clientWidth/2, RenderData.window.clientHeight/2)

        this.actualCard = null;
        this.clockwiseQueueDirection = true;
        this.actualPlayer = 0;
        this.players = [];

        this.pile = new PileOfCards(this);
        RenderData.spawnActor(this.pile);

        // player 1
        let gC = new Player();
        this.addPlayer(gC);

        this.setNewActualCard(this.randomCard());
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

    giveActualPlayerCard() {
        this.giveCard(this.actualPlayer);
    }

    randomCard() {
        let randColor = Math.floor(Math.random() * 4);
        let randSymbol = Math.floor(Math.random() * 10);
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
        if (this.actualCard.CardColor == card.CardColor || this.actualCard.Symbol == card.Symbol) {
            console.log("TAK");
            this.players[0].removeCard(card);
            this.setNewActualCard(card);
            return true;
        } 
        else {
            console.log("NIE");
            return false;
        }        
    }

}
