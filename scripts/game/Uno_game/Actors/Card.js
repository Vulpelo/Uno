class Card extends Actor {
    constructor(id, color, symbol, table) {
        super();
        this.overlap = false;
        this.id = id;
        this.played = false;
        this.table = table;
        this.cardColor = color;
        this.symbol = symbol;

        this.defoultPosition = this.Position;

        let tmp;
        if (symbol == -1) {
            tmp = "back";
        }
        else {
            tmp = color[0] + symbol;
        }

        let dim = [40,70];
        let rM = [new Rectangle(new Vector2d(0,0)), 
                new MImage(new Vector2d(0,0), Resources.getImagePath(tmp)),
                new Text(new Vector2d(-dim[0]/2, -dim[1]/2))];

        rM[0].color = this.cardColor;
        rM[0].setDimensions = dim;
            
        rM[1].setDimensions = dim;

        rM[2].Text = symbol;

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
        }
    }

    onMouseOverlap() {
        if (this.Parent != null && this.table.playerTurn() 
                && this.Parent.number == Server.data.user.player_nr) 
        {
            this.Position.setY = -this.renderModel[0].getDimensions[1] - 20;
            this.overlap = true;
        }
    }

    update(data) {
        Server.data = data;
    }

    eventTick() {
        if (this.Parent != null && Server.data.board.actual_player == Server.data.user.player_nr 
                && this.Parent.number == Server.data.user.player_nr
                && !this.overlap)
        {
            this.Position.setY = -this.renderModel[0].getDimensions[1];
        }
        this.overlap = false;
    }

    // plus4Power() {
    //     for (let i=0; i<4; i++){
    //         this.table.giveNextPlayerCard();
    //     }
    //     this.skipPower();
    //     this.changeColorPower();
    // }

    // changeColorPower() {
    //     let a = new ChangeColorGUI(this.table);
    //     RenderData.spawnActor(a, 0);
    // }
}
