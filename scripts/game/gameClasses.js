
class Card extends Actor {
    constructor(model, color, symbol) {
        super(model);
        this.color = color;
        this.symbol = symbol;
        let tmp = '#000000';
        switch (this.color) {
        case 'red':
            tmp = '#FF0000';
            break;
        case 'green':
            tmp = '#00FF00';
            break;
        case 'blue':
            tmp = '#0000FF';
            break;
        case 'yellow':
            tmp = '#FFFF00';
            break;
        }
        model.color = tmp;
    }

    onMouseClick() {
        let mod = new Circle(new Vector2d(0,0));
        mod.setDimensions = [60];
        mod.setColor = "#FF00FF";
        let nA = new Actor(mod);

        RenderData.spawnActor(nA);
        console.log("I got clicked");
    }
}

class Player {
    constructor() {
        this.arrCards = [];
    }
}

class Table {
    constructor() {
        this.actualCard = null;
        this.clockwiseQueueDirection = true;
        this.actualPlayer = 0;
    }
}
