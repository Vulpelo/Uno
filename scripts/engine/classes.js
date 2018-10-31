

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

    set setDimensions(dimensions) {
        
        this.dimensions = [ dimensions[0] ];
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

    set setPosition(position) {
        this.renderModel.setPosition = position;
    }

    onMouseClick() {}
}

class RenderData {
    constructor() {
    }

    addObj(obj) {
        RenderData.renderObjects.push(obj);
    }

    static spawnActor(actor, pos=0) {
        let tmp = RenderData.renderObjects;
        if (pos <= 0) {
            tmp.push(actor);
        }
        else {
            tmp = tmp.slice(0, pos).concat([actor]).concat(tmp.slice(pos));
        }
        RenderData.renderObjects = tmp;
    }
}

RenderData.renderObjects = [];
RenderData.window = document.getElementById("window");

class Rendering {
    constructor(renderData) {
        this.renderData = renderData;
        this.window = document.getElementById("window");
    }

    update(){
        let i = 0;
        for(i = 0; i < RenderData.renderObjects.length; i++) {
            RenderData.renderObjects[i].render(this.window);
        }
    }
}

class Physics {
    constructor(data) {
        this.data = data;
    }

    checkOverlaping() {
        this.checkMouseClickActorEvent();
    }

    // checking if mouse has clicked one of the elements on screen
    checkMouseClickActorEvent() {
        if (InputController.leftMouseButtonClicked == true) {
            let i = 0;
            let d = RenderData.renderObjects;

            // finding first element from top to down on which mouse is over
            for (i = d.length-1; i >= 0; i--) {
                if ( this.pointOverRectangle(InputController.mousePosition, d[i].renderModel)
                    || this.pointOverCircle(InputController.mousePosition, d[i].renderModel)) {
                    d[i].onMouseClick();
                    break;
                }
            }
        }
    }

    // check if point is inside Rectangle
    pointOverRectangle(point, rectangle) {
        return (rectangle.dimensions.length == 2 
                && point.getX <= rectangle.position.getX + rectangle.dimensions[0] && point.getX >= rectangle.position.getX 
                && point.getY >= rectangle.position.getY && point.getY <= rectangle.position.getY + rectangle.dimensions[1])
    }

    // check if point is inside Circle
    pointOverCircle(point, circle) {
        if(circle.dimensions.length == 1) {
            let vec = point.sub(circle.position);
            return vec.abs() <= circle.dimensions[0];
        }
        return false;
    }

}
