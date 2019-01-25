class Model extends Object {
    constructor(position) {
        super();

        if (position) {
            this.position = position;
        }
        else {
            this.position = new Vector2d(0,0);
        }

        this.interactable = true;
        this.color = "#000000";
    }

    set Interactable(is) {
        this.interactable = is;
    }

    get Interactable() {
        return this.interactable;
    }
    
    set setColor(color) {
        this.color = color;
    }

    render(window) {};
}

class Text extends Model {
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

        ctx.save();
        ctx.translate(pos.getX, pos.getY);
        ctx.rotate(this.getWorldRotation());
        ctx.font = this.fontStyle;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
    }
}

class SimpleShape extends Model {
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

        ctx.save();
        ctx.translate(pos.getX , pos.getY);
        ctx.rotate(this.getWorldRotation());
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.dimensions[0]/2, -this.dimensions[1]/2, this.dimensions[0], this.dimensions[1]);
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
        let pos = this.getWorldPosition();

        ctx.save();
        ctx.translate(pos.getX , pos.getY);
        ctx.beginPath();
        ctx.arc(0, 0, this.dimensions[0], 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = '#000000';
        ctx.stroke();
        ctx.restore();
    }
}


class MImage extends SimpleShape {
    constructor(position, imageSorce) {
        super(position);
        this.image = imageSorce;
    }

    set Image(path) {
        this.image = path;
    }

    render(window) {
        let pos = this.getWorldPosition();

        var ctx = window.getContext('2d');
        var img = new Image();
        img.src = this.image;
        

        ctx.save();
        ctx.translate(pos.getX , pos.getY);
        ctx.rotate(this.getWorldRotation());
        ctx.drawImage(img, -this.dimensions[0]/2, -this.dimensions[1]/2, this.dimensions[0], this.dimensions[1]);
        ctx.beginPath();
        ctx.stroke();
        ctx.restore();
    }

}
