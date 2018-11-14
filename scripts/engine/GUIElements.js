class GUIElement {
    constructor(position) {
        this.parent = null;
        if (position) {
            this.position = position;
        }
        else {
            this.position = new Vector2d(0,0);
        }
        //this.position = new Vector2d(0,0);
        //this.worldRotation = Vector2d.Up();
        this.relativeRotation = Vector2d.Up();
        this.interactable = true;
        this.color = "#000000";
    }

    set Parent(parent) {
        this.parent = parent;
    }

    set Interactable(is) {
        this.interactable = is;
    }

    get Interactable() {
        return this.interactable;
    }
    
    set setPosition(position) {
        this.position = position;
    }
    
    get getPosition() {
        return this.position;
    }

    set setRelativeRotation(direction) {
        this.relativeRotation = direction;
    }

    set setWorldRotation(direction) {
        this.worldRotation = direction;
    }

    getWorldPosition() {
        if (this.parent) {
            return this.position.add(this.parent.getWorldPosition());
        }
        return this.position;
    }

    set RelativeRotation(relativeRotation) {
        this.relativeRotation = relativeRotation;
    }

    get RelativeRotation() {
        return this.RelativeRotation;
    }

    get getWorldRotation() {
        if (this.parent) {
            return this.relativeRotation.radAngle() + this.parent.Rotation;
        }
        return this.relativeRotation.radAngle();
        //return this.worldRotation.add(this.relativeRotation).normalize();
    }

    set RelativePosition(rPosition) {
        this.position = rPosition;
    }

    get RelativePosition() {
        return this.position;
    }

    set setColor(color) {
        this.color = color;
    }

    render(window) {};
}

class Text extends GUIElement {
    constructor(position) {
        super(position);
        this.interactable = false;
        this.text = "None";
        this.fontStyle ="16px Arial"; 
    }

    set Text(ntext) {
        this.text = ntext;
    }

    render(window) {
        let ctx = window.getContext("2d");

        let pos = this.getWorldPosition();

        ctx.font = this.fontStyle;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, pos.getX, pos.getY);
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
        let tmp = new Rectangle(new Vector2d(this.position.getX, this.position.getY));
        tmp.setDimensions = [this.dimensions[0], this.dimensions[1]];
        tmp.Interactable = this.Interactable;
        tmp.setColor = this.color;

        return tmp;
    }

    render(window) {
        let ctx = window.getContext("2d");
        
        let pos = this.getWorldPosition();
        // let pos = Vector2d.fromAngleLength( this.getWorldRotation, this.position.length());

        if (this.parent) {
            pos.add(this.parent.Position);
        }
        ctx.save();
        ctx.translate(pos.getX, pos.getY);
        //ctx.rotate(this.getWorldRotation);
        ctx.fillStyle = this.color;
        ctx.fillRect(0,0, this.dimensions[0], this.dimensions[1]);
        ctx.restore();
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
