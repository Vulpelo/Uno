class GUIElement {
    constructor(position) {
        if (position) {
            this.relativePosition = position;
        }
        else {
            this.relativePosition = new Vector2d(0,0);
        }
        this.position = new Vector2d(0,0);
        this.interactable = true;
        this.color = "#000000";
    }

    set Interactable(is) {
        this.interactable = is;
    }

    get Interactable() {
        return this.interactable;
    }
    
    set setPosition(position) {
        this.position = position.add(this.relativePosition);
    }
    
    get getPosition() {
        return this.position;
    }

    set RelativePosition(rPosition) {
        this.relativePosition = rPosition;
    }

    get RelativePosition() {
        return this.relativePosition;
    }

    set setColor(color) {
        this.color = color;
    }

    render(window) {};
}

class Text extends GUIElement {
    constructor() {
        super();
        this.interactable = false;
        this.text = "None";
        this.fontStyle ="16px Arial"; 
    }

    set Text(ntext) {
        this.text = ntext;
    }

    render(window) {
        let ctx = window.getContext("2d");

        ctx.font = this.fontStyle;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.position.getX, this.getPosition.getY);
    }
}

class SimpleShape extends GUIElement {
    constructor(position) {
        super(position);
        this.dimensions = [];
    }

    set setDimensions(dimensions) {
        this.dimensions = dimensions;
    }
    get getDimensions() {
        return this.dimensions;
    }

    render(window) {};
}

class Rectangle extends SimpleShape {
    constructor(position) {
        super(position);
        this.dimensions = [10,10];
    }

    clone() {
        let tmp = new Rectangle(new Vector2d(this.relativePosition.getX, this.relativePosition.getY));
        tmp.setDimensions = [this.dimensions[0], this.dimensions[1]];
        tmp.Interactable = this.Interactable;
        tmp.setColor = this.color;

        return tmp;
    }

    render(window) {
        let ctx = window.getContext("2d");
        ctx.beginPath();
        ctx.strokeStyle = "#000000";
        ctx.rect(this.position.getX, this.position.getY, this.dimensions[0], this.dimensions[1]);
        ctx.stroke(); 
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class Circle extends SimpleShape {
    constructor(position) {
        super(position);
        this.dimensions.push(10);
    }

    set setDimensions(dimensions) {
        
        this.dimensions = [ dimensions[0] ];
    }
    
    render(window) {
        var ctx = window.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.position.getX, this.position.getY, this.dimensions[0], 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = '#000000';
        ctx.stroke();
    }


}
