class MyHUD extends Actor {
    constructor(pos) {
        super(pos);

        this.direction = "cw1";

        this.setPosition = new Vector2d(0,0);

        let cw = new MImage(new Vector2d(RenderData.window.clientWidth * 0.5, RenderData.window.clientHeight * 0.5),
                            Resources.getImagePathPNG(this.direction));
        cw.setDimensions = [200,200];

        let rM = [cw];

        this.setModel = rM;
    }

    eventTick() {
        this.updateDirection();
    }

    updateDirection() {
        if (Server.data.board.clockwise == 1) {
            if (this.direction == 'cw0') {
                this.direction = 'cw1';
                this.renderModel[0].Image = Resources.getImagePathPNG(this.direction);
            }
        }
        else {
            if (this.direction == 'cw1') {
                this.direction = 'cw0';
                this.renderModel[0].Image = Resources.getImagePathPNG(this.direction);
            }
        }
    }

    set Text(text) {
        this.renderModel[0].Text = text;
    }
}
