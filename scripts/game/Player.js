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
