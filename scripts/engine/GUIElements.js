class GUIElement {
    constructor(position) {
        this.parent = null;

        if (position) {
            this.position = position;
        }
        else {
            this.position = new Vector2d(0,0);
        }

        this.rotation = 0;

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
    

    set Position(position) {
        this.position = position;
    }
    get Position() {
        return this.position;
    }
    getWorldPosition() {
        if (this.parent) {
            return this.position.add(this.parent.getWorldPosition());
        }
        return this.position;
    }


    set Rotation(radians) {
        this.rotation = radians;
    }
    // return's value in radians
    get Rotation() {
        return this.rotation;
    }
    getWorldRotation() {
        if (this.parent) {
            return this.rotation + this.parent.getWorldRotation();
        }
        return this.rotation;
    }


    getHighestParent() {
        if (this.parent) {
            return this.parent.getHighestParent();
        }
        return this;
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

        // calculating offset of model
        let p = this.getWorldPosition().sub(this.getHighestParent().Position);

        // new relative position depending on angle
        let nPos = p.rotate( this.getWorldRotation() );
        let pos = this.getHighestParent().Position.add(nPos); 

        ctx.save();
        ctx.translate(pos.getX, pos.getY);
        ctx.rotate(this.getWorldRotation());
        ctx.font = this.fontStyle;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
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

        // calculating offset of model
        let p = this.getWorldPosition().sub(this.getHighestParent().Position);

        // new relative position depending on angle
        let nPos = p.rotate( this.getWorldRotation() );
        let pos = this.getHighestParent().Position.add(nPos); 

        ctx.save();
        ctx.translate(pos.getX, pos.getY);
        ctx.rotate(this.getWorldRotation());
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
