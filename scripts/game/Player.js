class Player extends Actor {
    constructor(centerPos, nr) {
        super();
        this.arrCards = [];
        this.Position = centerPos;
        this.Rotation = Vector2d.Right();
        this.number = nr;
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
        if (this.number == 1) {
            this.Rotation = Vector2d.Left();
            //newCard.Rotation = Vector2d.Left();
        }
        else if (this.number == 3) {
            this.Rotation = Vector2d.Right();
            //newCard.Rotation = Vector2d.Right();
        }
        this.updateCardsPosition();
    }

    removeCard(card) {
        let pos = this.arrCards.indexOf(card);
        this.arrCards = this.arrCards.slice(0, pos).concat(this.arrCards.slice(pos+1)); 
        this.updateCardsPosition();
    }
}
