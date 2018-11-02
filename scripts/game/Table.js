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
