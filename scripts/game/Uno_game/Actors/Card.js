class Card extends Actor {
    constructor(id, color, symbol, table) {
        super();
        this.id = id;
        this.played = false;
        this.table = table;
        this.cardColor = color;
        this.symbol = symbol;

        let dim = [30,50];
        let rM = [new Rectangle(new Vector2d(0,0)), new Text(new Vector2d(-dim[0]/2, -dim[1]/2))];
        rM[0].color = this.cardColor;
        rM[0].setDimensions = dim;

        rM[1].Text = symbol;

        this.setModel = rM;
    }
    get Id() {
        return this.id;
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
        if (Server.data.board.actual_player == Server.data.user.player_nr
            && this.table.canThrowCard(this)) {

            MQuarry.send({
                type: "POST",
                url: "?page=gameThrowCard",
                data: "id_card="+this.id
              }, this.update);
        // RenderData.Destroy(this);
        }
    }

    update(data) {
        // Server.data = data;
        console.log(data);
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
