class ChangeColorGUI extends Actor {
    constructor(table) {
        super();
        this.table = table;

        this.renderModel = [new Rectangle(new Vector2d(-30,30)), new Rectangle(new Vector2d(0,30)),
            new Rectangle(new Vector2d(-30,0)), new Rectangle(new Vector2d(0,0))];
        this.renderModel[0].setColor = "red";
        this.renderModel[0].setDimensions = [30, 30];

        this.renderModel[1].setColor = "green";
        this.renderModel[1].setDimensions = [30, 30];

        this.renderModel[2].setColor = "blue";
        this.renderModel[2].setDimensions = [30, 30];

        this.renderModel[3].setColor = "yellow";
        this.renderModel[3].setDimensions = [30, 30];

        this.setPosition = new Vector2d(RenderData.window.clientWidth/2, RenderData.window.clientHeight/4);

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
