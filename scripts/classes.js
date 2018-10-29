
class Vector2d {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get getX() {
        return this.x;
    }
    set setX(x) {
        this.x = x;
    }
    get getY() {
        return this.x;
    }
    set setY(x) {
        this.x = x;
    }
    coordinate(x, y) {
        this.x = x;
        this.y = y;
    }
}

class SimpleShape {
    constructor(position) {
       this.position = position;
       this.dimensions = [];
       this.color = '#FF0000';
    }
    set setPosition(position) {
        this.position = position;
    }
    get getPosition() {
        return this.position;
    }
    set setDimensions(dimensions) {
        this.dimensions = dimensions;
    }
    get getDimensions() {
        return this.dimensions;
    }
    set setColor(color) {
        this.color = color;
    }
    render(window) {};
}

class Rectangle extends SimpleShape {
    constructor(position) {
        super(position);
        this.dimensions.push(10);
        this.dimensions.push(10);
    }

    render(window) {
        let ctx = window.getContext("2d");
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.getX, this.position.getY, this.dimensions[0], this.dimensions[1]); 
    }
}

class Circle extends SimpleShape {
    constructor(position) {
        super(position);
        this.dimensions.push(10);
    }

    render(window) {
        var ctx = window.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.position.getX, this.position.getY, this.dimensions[0], 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}

class IRender {
    constructor() {

    }
    render(window) {
        document.write("RENDER");
    }
}

class Actor extends IRender {
    constructor(renderModel) {
        super();
        this.renderModel = renderModel;
    }
    render(window) {
        this.renderModel.render(window);
    }
}

class RenderData {
    constructor() {
        this.renderObjects = [];
        
    }
    addObj(obj) {
        this.renderObjects.push(obj);
    }
}

class Rendering {
    constructor(renderData) {
        this.renderData = renderData;
        this.window = document.getElementById("window");
    } 

    update(){

        let i = 0;
        for(i = 0; i < this.renderData.renderObjects.length; i++) {
            this.renderData.renderObjects[i].render(this.window);
        }

        //var ctx = this.window.getContext("2d");
        //ctx.fillStyle="#FF0000";
        //ctx.fillRect(20,20,1000,1000); 
    }
}
