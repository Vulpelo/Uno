class TEST {
    constructor() {
        let ac = new TEST_ACTOR("MAIN");
        ac.Position = new Vector2d(80, 80);
        ac.Rotation = 1;

        RenderData.spawnActor(ac);


    }

    start() {

    }

}