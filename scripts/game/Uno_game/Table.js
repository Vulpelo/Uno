class Table {
    constructor() {
        this.colors = ["red", "green", "blue", "yellow", "black"];
        this.startAmountOfCards = 7; // TODO: move to server
        this.blockInteraction = false;
        this.clockwiseQueue = false; // TODO: get from server

        this.center = new Vector2d(RenderData.window.clientWidth/2, RenderData.window.clientHeight/2);

        this.actualCard = null; // TODO: get from server
        this.actualPlayer = 1;
        this.endTurnActualPlayer = 1;

        this.amountOfCardsDraw = 0; // TODO: this instead instant draw cards
        
        this.players = [];

        this.pile = new PileOfCards(this);
        this.pile.Position = new Vector2d(15, 25);
        RenderData.spawnActor(this.pile);

        this.createPlayers(Server.data.users.length);

        this.hud = new MyHUD(new Vector2d(0, 0));
        RenderData.spawnActor(this.hud);

        this.hud.Text = "Player " + this.actualPlayer.toString();


        this.tableController = new TableController(this);
        RenderData.spawnActor(this.tableController);
    }

    get Players() {
        return this.players;
    }

    get ActualPlayer() {
        return this.actualPlayer;
    }

    set ActualPlayer(newActual) {
        this.actualPlayer = newActual;
        this.Hud.Text = Server.data.users[Server.data.board.actual_player].name + "'s turn";
    }

    get Hud() {
        return this.hud;
    }

    get ActualCard() {
        return this.actualCard;
    }
    set ActualCard(newCard) {
        this.actualCard = newCard;
        this.actualCard.Position = this.center;
    }

    createPlayers(amount) {
        this.removePlayers();
        let pos = [new Vector2d(RenderData.window.clientWidth/2, RenderData.window.clientHeight), 
            new Vector2d(RenderData.window.clientWidth*0.95, RenderData.window.clientHeight/2), 
            new Vector2d(RenderData.window.clientWidth/2, 100),
            new Vector2d(RenderData.window.clientWidth*0.05, RenderData.window.clientHeight/2)];

        let rot = [0, Math.PI/2*3, 0, Math.PI/2];
        
        for (let i=0; i<amount; i++) {
            this.createPlayer(pos[(i+pos.length-Server.data.user.player_nr)%pos.length],
                rot[(i+pos.length-Server.data.user.player_nr)%pos.length],
                i,
                Server.data.users[i].name);
        }
    }

    createPlayer(position, rotation, nr, name) {
        let gC = new Player(position, nr, name, this);
        gC.Rotation = rotation;
        this.addPlayer(gC);
    }


    get BlockInteraction() {
        return this.blockInteraction;
    }
    set BlockInteraction(nblock) {
        this.blockInteraction = nblock;
    }

    start() {
        // for (let i=0; i<Server.data.users.length; i++) {
        //     if (i == Server.data.user.player_nr) {
        //         for (let j=0; j<Server.data.cards.length; j++) {
        //             this.giveSpecificCard(i, Server.data.cards[j].symbol, Server.data.cards[j].color);
        //         }
        //     }
        //     else {
        //         for (let j=0; j<Server.data.users[i].card_count; j++) {
        //             this.giveCard(i);
        //         }
        //     }
        // }
    }

    removePlayers() {
        for (let i=0; i<this.players.length; i++) {
            this.players[i].destructor();
            RenderData.Destroy(this.players[i]);
        }
        this.players = [];
    }

    addPlayer(player) {
        RenderData.spawnActor(player);
        this.players.push(player);
    }

    // giveSpecificCard(player_i, symbol, color) {
    //     let card = new Card(color, symbol, this);

    //     RenderData.spawnActor(card);
    //     this.players[player_i].addCard(card);
    // }

    // giveCard(player_i) {
    //     let card = this.randomCard();

    //     RenderData.spawnActor(card);
    //     this.players[player_i].addCard(card);
    // }



    reversePlayersQueue() {
        this.clockwiseQueue = !this.clockwiseQueue;
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
        this.endTurnActualPlayer++; 
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

    isActualPlayerCard(card) {
        return this.players[this.actualPlayer].hasCard(card);
    }

    canThrowCard(card) {
        return this.isActualPlayerCard(card) && (this.actualCard.CardColor == this.colors[4] || card.CardColor == this.colors[4] 
        || this.actualCard.CardColor == card.CardColor || this.actualCard.Symbol == card.Symbol);
    }

    // If the card was thown function return's true.
    throwCard(card) {
        //this.isActualPlayerCard(card) && !this.blockInteraction 
        //&& 
        if ( (this.actualCard.CardColor == this.colors[4] || card.CardColor == this.colors[4] 
            || this.actualCard.CardColor == card.CardColor || this.actualCard.Symbol == card.Symbol) )
        {
            // this.players[this.actualPlayer].removeCard(card);
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
