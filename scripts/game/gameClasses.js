
class Card extends Actor {
    constructor(color, symbol, table) {
        super(new Rectangle(new Vector2d(0,0)));
        this.played = false;
        this.table = table;
        this.color = color;
        this.symbol = symbol;
        let tmp = '#000000';
        switch (this.color) {
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
        this.renderModel.color = tmp;
        this.renderModel.setDimensions = [30,50];
    }

    onMouseClick() {
        if (!this.played) {
            this.played = true;
            this.table.canBeThrown(this);
        }
    }
}

class Player extends Actor {
    constructor() {
        super(null);
        this.arrCards = [];
    }

    updateCardsPosition() {
        for (let i=0; i<this.arrCards.length; i++) {
            this.arrCards[i].setPosition =
                new Vector2d(RenderData.window.clientWidth/2 + (i - Math.floor(this.arrCards.length/2)) *
                1/2*this.arrCards[i].renderModel.getDimensions[0] - this.arrCards[i].renderModel.getDimensions[0],
                    RenderData.window.clientHeight - this.arrCards[i].renderModel.getDimensions[1]);
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

class Table {
    constructor() {
        this.colors = ["red", "green", "blue", "yellow"];
        this.startAmountOfCards = 7;

        this.center = new Vector2d(RenderData.window.clientWidth/2, RenderData.window.clientHeight/2)

        this.actualCard = null;
        this.clockwiseQueueDirection = true;
        this.actualPlayer = 0;
        this.players = [];

        // player 1
        let gC = new Player();
        this.addPlayer(gC);
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

    randomCard() {
        let randColor = Math.floor(Math.random() * 4);
        let randSymbol = Math.floor(Math.random() * 10);
        return new Card(this.colors[randColor], randSymbol, this);
    }

    setNewActualCard(card) {
        RenderData.setElementToRenderLayer(card, 0);
        this.actualCard = card;
        card.setPosition = this.center;
    }

    canBeThrown(card) {
        console.log("TAK");
        this.players[0].removeCard(card);
        this.setNewActualCard(card);
    }

}
