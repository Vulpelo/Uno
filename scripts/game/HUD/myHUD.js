class MyHUD extends Actor {
    constructor() {
        super();

        let t = new Text(new Vector2d(RenderData.window.clientWidth * 0.75, RenderData.window.clientHeight * 0.8));
        t.Text = "Player 0";
        this.renderModel = [t];
        this.setPosition = new Vector2d(0,0);
    }

    set Text(text) {
        this.renderModel[0].Text = text;
    }
}
