class Table {
    constructor() {
        this.colors = ["red", "green", "blue", "yellow", "black"];
        this.blockInteraction = false;
        this.clockwiseQueue = false; // TODO: get from server

        this.center = new Vector2d(RenderData.window.clientWidth/2, RenderData.window.clientHeight/2);

        this.actualCard = null; // TODO: get from server
        this.actualPlayer = 1;
        this.endTurnActualPlayer = 1;

        this.amountOfCardsDraw = 0; // TODO: this instead instant draw cards
        
        this.players = [];

        this.background = new Background("background");
        RenderData.spawnActor(this.background);

        this.pile = new PileOfCards(this);
        this.pile.Position = new Vector2d(30, 40);
        RenderData.spawnActor(this.pile);

        this.createPlayers(Server.data.users.length);

        this.hud = new MyHUD(new Vector2d(0, 0));
        RenderData.spawnActor(this.hud);

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

    removePlayers() {
        for (let i=0; i<this.players.length; i++) {
            this.players[i].destructor();
            RenderData.Destroy(this.players[i]);
        }
        this.players = [];
    }

    get BlockInteraction() {
        return this.blockInteraction;
    }
    set BlockInteraction(nblock) {
        this.blockInteraction = nblock;
    }

    start() {
    }

    addPlayer(player) {
        RenderData.spawnActor(player);
        this.players.push(player);
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
}
