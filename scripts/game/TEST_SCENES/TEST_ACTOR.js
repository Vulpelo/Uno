
class TEST_ACTOR extends Actor {
    constructor() {
        super();

        let rM = [new Rectangle(new Vector2d(0,0))]
        rM[0].dimensions = [50, 80];
        this.setModel = rM;
    }

    onMouseClick() {
        console.log("CLICKED");
    }
} 
