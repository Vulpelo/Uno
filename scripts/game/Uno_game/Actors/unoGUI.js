class UnoGUI extends Actor {
    constructor(table) {
        super();
        this.table = table;
        
        let t = new Text(new Vector2d(0,0));
        t.Text = "UNO!";

        this.renderModel = [new Rectangle(new Vector2d(0,0)), t];
        this.renderModel[0].setDimensions = [60, 30];

        this.setPosition = new Vector2d(RenderData.window.clientWidth * 0.9, RenderData.window.clientHeight * 0.9);
    }

    onMouseClick(model) {
        // TODO: When clicked, player can't be made to draw two cards

        RenderData.Destroy(this);
    }
}
