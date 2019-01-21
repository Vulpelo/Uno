class Player extends Actor {
    constructor(centerPos, nr, name, table) {
        super();
        this.table = table;
        this.name = name;
        this.arrCards = [];
        this.Position = centerPos;
        this.rotation = 0;
        this.number = nr;
        
        let dim = [100, 20];
        let rM = [new MImage(new Vector2d(30,-5), Resources.getImagePathPNG("name_background")) , new Text(new Vector2d(0,0))];

        rM[1].Text = this.name;
        rM[0].setDimensions = dim;
        

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
            if (Server.data.user.player_nr == this.number) {
                this.arrCards[i].Position.setX =
                    (i - Math.floor(this.arrCards.length/2)) *
                    0.65*this.arrCards[i].renderModel[0].getDimensions[0] - this.arrCards[i].renderModel[0].getDimensions[0];
            }
            else {
                this.arrCards[i].Position = new Vector2d(
                    (i - Math.floor(this.arrCards.length/2)) *
                    0.4*this.arrCards[i].renderModel[0].getDimensions[0] - this.arrCards[i].renderModel[0].getDimensions[0],
                    -this.arrCards[i].renderModel[0].getDimensions[1]);
            }
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
        this.updatingCards();

        if (this.table.ActualPlayer == this.number && this.RenderModel.length == 2) {
            let tmp = this.RenderModel;
            let mod = new MImage(new Vector2d(0,0), Resources.getImagePathPNG("activePlayer"));
            mod.dimensions = [200,200];

            tmp = [mod].concat(tmp);

            this.setModel = tmp;
        }
        else if (this.table.ActualPlayer != this.number && this.RenderModel.length == 3) {
            let tmp = this.RenderModel;
            tmp = tmp.slice(1);
            this.setModel = tmp;
        }
    }

    updatingCards() {
        // if main player
        if (Server.data.user.player_nr == this.number) {
            this.updateCardsForMainPlayer();
        }
        // other players you cant see cards
        else {
            // if too many cards, discard some
            if (this.arrCards.length > Server.data.users[this.number].card_count) {
                let len = this.arrCards.length - Server.data.users[this.number].card_count;

                for (let i=0; i<len; i++) {
                    RenderData.Destroy(this.arrCards.pop());    
                }
            }
            // if to little cards, add some
            else {
                let len = Server.data.users[this.number].card_count - this.arrCards.length;

                for (let i=0; i<len; i++) {
                    let card = new Card(-1, 'red', -1, this.table);
                    this.addCard(card);
                }
            }
        }
        this.updateCardsPosition();
    }

    updateCardsForMainPlayer() {
        let tmpCards = [];

        for (let i=0; i<Server.data.cards.length; i++) {
            let found = false;
            for (let j=0; j<this.arrCards.length; j++) {
                if (this.arrCards[j].Id == Server.data.cards[i]['id_card']) {
                    tmpCards.push(this.arrCards[j]);
                    this.arrCards = [].concat( this.arrCards.slice(0,j), this.arrCards.slice(j+1) );
                    found = true;
                    break;
                }
            }
            if (!found) {
                let card = new Card(Server.data.cards[i]['id_card'],
                    Server.data.cards[i]['color'],
                    Server.data.cards[i]['symbol'], 
                    this.table );
                card.Parent = this;
                card.Position.setY = -card.renderModel[0].getDimensions[1];
                RenderData.spawnActor(card);
                tmpCards.push(card);
            }
        }

        // deleting cards player dont have
        for (let i=0; i<this.arrCards.length; i++) {
            RenderData.Destroy(this.arrCards[i]);
        }

        this.arrCards = tmpCards;
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
