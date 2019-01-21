class Player extends Actor {
    constructor(centerPos, nr, name, table) {
        super();
        this.table = table;
        this.name = name;
        this.arrCards = [];
        this.Position = centerPos;
        this.rotation = 0;
        this.number = nr;
        
        let rM = [new Text(new Vector2d(0,0))];

        rM[0].Text = this.name;

        this.setModel = rM;
    }

    destructor() {
        for (let i=0; i<this.arrCards.length; i++) {
            RenderData.Destroy(this.arrCards[i]);    
        }
        this.arrCards = [];
    }

    updateCardsPosition() {
        for (let i=0; i<this.arrCards.length; i++) {
            this.arrCards[i].Position =
                new Vector2d((i - Math.floor(this.arrCards.length/2)) *
                1/2*this.arrCards[i].renderModel[0].getDimensions[0] - this.arrCards[i].renderModel[0].getDimensions[0],
                -this.arrCards[i].renderModel[0].getDimensions[1]);
        }
    }

    hasCard(card) {
        return this.arrCards.includes(card);
    }

    addCard(newCard) {
        newCard.Parent = this;
        this.arrCards.push(newCard);

        RenderData.spawnActor(newCard);
    }

    eventTick() {
        for (let i=0; i<this.arrCards.length; i++) {
            RenderData.Destroy(this.arrCards[i]);    
        }
        this.arrCards = [];
        
        // if main player
        if (Server.data.user.player_nr == this.number) {
            for (let j=0; j<Server.data.cards.length; j++) {
                this.giveSpecificCard(Server.data.cards[j].id_card, Server.data.cards[j].symbol, Server.data.cards[j].color);
            }
        }
        // other players you cant see cards
        else {
            let nr = this.number;
            if (this.number >= Server.data.users.length) {
                nr = Server.data.users.length-1;
            }
            for (let i=0; i<Server.data.users[nr].card_count; i++) {
                let card = new Card(-1, 'red', -1, this.table);
                this.addCard(card);
            }
        }
        this.updateCardsPosition();

        if (this.table.ActualPlayer == this.number && this.RenderModel.length == 1) {
            let tmp = this.RenderModel;
            let mod = new MImage(new Vector2d(0,0), Resources.getImagePathPNG("activePlayer"));
            mod.dimensions = [200,200];

            tmp = [mod].concat(tmp);

            this.setModel = tmp;
        }
        else if (this.table.ActualPlayer != this.number && this.RenderModel.length == 2) {
            let tmp = this.RenderModel;
            tmp = tmp.slice(1);
            this.setModel = tmp;
        }
    }

    giveSpecificCard(id, symbol, color) {
        let card = new Card(id, color, symbol, this.table);

        this.addCard(card);
    }

    giveCard(player_i) {
        let card = this.randomCard();

        RenderData.spawnActor(card);
        this.players[player_i].addCard(card);
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

    removeCard(card) {
        let pos = this.arrCards.indexOf(card);
        this.arrCards = this.arrCards.slice(0, pos).concat(this.arrCards.slice(pos+1)); 
        this.updateCardsPosition();
    }
}
