class TEST {
    constructor() {
        let ac = new TEST_ACTOR("MAIN");
        ac.Position = new Vector2d(80, 200);
        ac.Rotation = 0;

        RenderData.spawnActor(ac);
       
        let c1 = new TEST_ACTOR("MAIN");
        c1.Position = new Vector2d(90, 0);
        c1.Rotation = -Math.PI/2;
        c1.Parent = ac;

        RenderData.spawnActor(c1);

        let c2 = new TEST_ACTOR("MAIN");
        c2.Position = new Vector2d(90, 0);
        c2.Rotation = 0;
        c2.Parent = c1;

        RenderData.spawnActor(c2);

        let ang = new TEST_Angle();
        ang.Position = new Vector2d(400, 300);
        RenderData.spawnActor(ang);
    }

    start() {

    }

}