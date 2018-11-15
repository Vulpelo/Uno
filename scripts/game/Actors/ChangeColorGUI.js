class ChangeColorGUI extends Actor {
    constructor(table) {
        super();
        this.table = table;

        let rM = [new Rectangle(new Vector2d(-30,30)), new Rectangle(new Vector2d(0,30)),
            new Rectangle(new Vector2d(-30,0)), new Rectangle(new Vector2d(0,0))];
        rM[0].setColor = "red";
        rM[0].setDimensions = [30, 30];

        rM[1].setColor = "green";
        rM[1].setDimensions = [30, 30];

        rM[2].setColor = "blue";
        rM[2].setDimensions = [30, 30];

        rM[3].setColor = "yellow";
        rM[3].setDimensions = [30, 30];

        this.setModel = rM;
        
        this.Position = new Vector2d(RenderData.window.clientWidth/2, RenderData.window.clientHeight/4);

        this.table.BlockInteraction = true;
    }

    onMouseClick(model) {
        let index = this.renderModel.indexOf(model);

        this.table.actualCard.CardColor = this.table.colors[index];

        this.table.BlockInteraction = false;

        this.table.endTurn();

        RenderData.Destroy(this);
    }
}
