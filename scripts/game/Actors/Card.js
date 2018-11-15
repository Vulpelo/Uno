class Card extends Actor {
    constructor(color, symbol, table) {
        super();
        this.played = false;
        this.table = table;
        this.cardColor = color;
        this.symbol = symbol;

        let rM = [new Rectangle(new Vector2d(0,0)), new Text(new Vector2d(0,0))];
        rM[0].color = this.cardColor;
        rM[0].setDimensions = [30,50];

        rM[1].Text = symbol;

        this.setModel = rM;
    }

    get Symbol() {
        return this.symbol;
    }

    get CardColor() {       
        return this.cardColor;
    }
    set CardColor(color) {
        this.cardColor = color;
        this.renderModel[0].color = this.cardColor;
    }

    onMouseClick() {
        if (!this.played && this.table.throwCard(this)) {
            this.played = true;
            this.power();
            if (this.cardColor != "black")
                this.table.endTurn();
        }
    }

    power() {
        //* symbol:
        //    10 - skip;    11 - reverse;   12 - +2 cards
        //    13 - +4 cards and change color;   14 - change color
        switch (this.symbol) {
            case 10:
                this.skipPower();
                break;
            case 11:
                this.reversePower();
                break;
            case 12:
                this.plus2Power();
                break;
            case 13:
                this.plus4Power()
                break;
            case 14:
                this.changeColorPower();
                break;
        }
    }

    skipPower() {
        this.table.skipPlayer();
    }

    reversePower() {
        this.table.reversePlayersQueue();
    }

    plus2Power() {
        for (let i=0; i<2; i++){
            this.table.giveNextPlayerCard();
        }
        this.skipPower();
    }

    plus4Power() {
        for (let i=0; i<4; i++){
            this.table.giveNextPlayerCard();
        }
        this.skipPower();
        this.changeColorPower();
    }

    changeColorPower() {
        let a = new ChangeColorGUI(this.table);
        RenderData.spawnActor(a, 0);
    }
}
