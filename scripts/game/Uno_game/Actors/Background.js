class Background extends Actor {
    constructor(imageName) {
        super();

        this.Position = new Vector2d(0,0);
        let dim = [600, 600];

        let rM = [new MImage(new Vector2d(RenderData.window.clientWidth/2,RenderData.window.clientHeight/2),
                Resources.getImagePathPNG(imageName))];

        rM[0].setDimensions = dim;

        this.setModel = rM;
    }

}
