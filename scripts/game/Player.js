class Player extends Actor {
    constructor(centerPos) {
        super();
        this.arrCards = [];
        this.centerPosition = centerPos;
    }

    updateCardsPosition() {
        for (let i=0; i<this.arrCards.length; i++) {
            this.arrCards[i].setPosition =
                new Vector2d(this.centerPosition.getX + (i - Math.floor(this.arrCards.length/2)) *
                1/2*this.arrCards[i].renderModel[0].getDimensions[0] - this.arrCards[i].renderModel[0].getDimensions[0],
                this.centerPosition.getY - this.arrCards[i].renderModel[0].getDimensions[1]);
        }
    }

    hasCard(card) {
        return this.arrCards.includes(card);
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
