class Table {
    constructor() {
        this.colors = ["red", "green", "blue", "yellow", "black"];
        this.startAmountOfCards = 7;
        this.blockInteraction = false;
        this.clockwiseQueue = false;

        this.center = new Vector2d(RenderData.window.clientWidth/2, RenderData.window.clientHeight/2);

        this.actualCard = null;
        this.actualPlayer = 0;
        this.endTurnActualPlayer = 1;

        // TODO: this instead instant draw cards
        this.amountOfCardsDraw = 0;
        
        this.players = [];

        this.pile = new PileOfCards(this);
        RenderData.spawnActor(this.pile);

        // player 1
        let gC = new Player(new Vector2d(RenderData.window.clientWidth/2, RenderData.window.clientHeight));
        gC.Rotation = Vector2d.Up();
        this.addPlayer(gC);

        // player 2
        gC = new Player(new Vector2d(RenderData.window.clientWidth*0.8, RenderData.window.clientHeight/2));
        gC.Rotation = Vector2d.Right();
        this.addPlayer(gC);

        // player 3
        gC = new Player(new Vector2d(RenderData.window.clientWidth/2, 100));
        gC.Rotation = Vector2d.Up();
        this.addPlayer(gC);

        // player 4
        gC = new Player(new Vector2d(RenderData.window.clientWidth*0.2, RenderData.window.clientHeight/2));
        gC.Rotation = Vector2d.Left();
        this.addPlayer(gC);

        this.setNewActualCard(this.randomCard());

        this.hud = new MyHUD(new Vector2d(0, 0));
        RenderData.spawnActor(this.hud);

        this.hud.Text = "Player " + this.actualPlayer.toString();
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

    get ActualPlayer() {
        return this.actualPlayer;
    }

    reversePlayersQueue() {
        this.clockwiseQueue = !this.clockwiseQueue;
        //this.players = this.players.reverse();
    }

    giveActualPlayerCard() {
        this.giveCard(this.actualPlayer);
    }

    giveNextPlayerCard() {
        this.giveCard(this.getNextPlayerIndex(this.actualPlayer));
    }

    getNextPlayerIndex(actualIndex) {
        let index = 0;
        if (this.clockwiseQueue) {
            index = actualIndex - 1;
            if (index < 0) {
                index = this.players.length - 1;
            }
        }
        else {
            index = actualIndex + 1;
            if (index >= this.players.length) {
                index = 0;
            }
        }
        return index;
    }

    getPlayerFromToIndex(fromIndex, steps) {
        // removing full loops around queue
        let index = steps%this.players.length;

        if (this.clockwiseQueue) {
            index = fromIndex - index;
            if (index < 0) {
                index += this.players.length;
            }
        }
        else {
            index += fromIndex;
            if (index >= this.players.length) {
                index -= this.players.length;
            }
        }
        return index;
    }

    skipPlayer() {
        // this.actualPlayer = 
        this.endTurnActualPlayer++;// = this.getNextPlayerIndex(this.endTurnActualPlayer); 
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
        let card = new Card(this.colors[randColor], randSymbol, this);
        return card;
    }

    setNewActualCard(card) {
        RenderData.setElementToRenderLayer(card, 0);
        if (this.actualCard != null) {
            this.actualCard.renderModel.pop();
        }
        this.actualCard = card;
        card.setPosition = this.center;
    }

    isActualPlayerCard(card) {
        return this.players[this.actualPlayer].hasCard(card);
    }

    canThrowCard(card) {
        return (this.actualCard.CardColor == this.colors[4] || card.CardColor == this.colors[4] 
        || this.actualCard.CardColor == card.CardColor || this.actualCard.Symbol == card.Symbol);
    }

    // If the card was thown function return's true.
    throwCard(card) {
        if ( this.isActualPlayerCard(card) && !this.blockInteraction 
            && (this.actualCard.CardColor == this.colors[4] || card.CardColor == this.colors[4] 
            || this.actualCard.CardColor == card.CardColor || this.actualCard.Symbol == card.Symbol) )
        {
            this.players[this.actualPlayer].removeCard(card);
            this.setNewActualCard(card);
            return true;
        } 
        else {
            return false;
        }        
    }

    canThrowAnyCard(player) {
        for (let i=0; i<player.arrCards.length; i++) {
            if (this.canThrowCard(player.arrCards[i])) {
                return true;
            } 
        }
        return false;
    }

    canHaveUno(player) {
        if (player.arrCards.length == 2) {
            return this.canThrowAnyCard(player);
        }
        return false;
    }

    // show UnoGUI button if player has two cards and one can be thrown
    unoGuiShow(player) {
        if (this.canHaveUno(player)) {
            let u = new UnoGUI(this);
            RenderData.spawnActor(u);
        }
    }


    endTurn() {
        // if actual player has no cards he won
        if (this.players[this.actualPlayer].arrCards.length == 0) {
            this.hud.Text = "Player " + this.actualPlayer.toString() + " WON";
            return;
        }

        // set next player as new actual player
        this.actualPlayer = this.getPlayerFromToIndex(this.actualPlayer, this.endTurnActualPlayer);
        this.endTurnActualPlayer = 1; //this.getNextPlayerIndex(this.endTurnActualPlayer);

        this.unoGuiShow(this.players[this.actualPlayer]);

        this.hud.Text = "Player " + this.actualPlayer.toString();
    }
}
