
class TEST_ACTOR extends Actor {
    constructor(name) {
        super();
        this.name = name;

        let rM = [new Rectangle(new Vector2d(0,0))]
        rM[0].dimensions = [50, 80];
        this.setModel = rM;

        this.chlid = null;
    }

    onMouseClick() {
        console.log( name );
        if (!this.chlid) {
            this.chlid = new TEST_ACTOR("Child");
            this.chlid.Parent = this;
            this.chlid.Rotation = -1/4;
            this.chlid.Position = new Vector2d(100,0);
            RenderData.spawnActor(this.chlid);
        }
    }
} 


class TEST_Angle extends Actor {
    constructor() {
        super();

        let rM = [new Circle(new Vector2d(0,0))]
        rM[0].dimensions = [100];
        rM[0].color = "red";
        this.setModel = rM;
    }

    onMouseClick() {
        let tmpVec = InputController.mousePosition.sub(this.Position);
        console.log(tmpVec.degAngle() + " deg");
    }
}
