

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
        ctx.beginPath();
        ctx.strokeStyle = "#000000";
        ctx.rect(this.position.getX,this.position.getY, this.dimensions[0], this.dimensions[1]);
        ctx.stroke(); 
        ctx.fillStyle = this.color;
        ctx.fill();

        // ctx.fillStyle = this.color;
        // ctx.strokeStyle = '#FFFFFF';
        // ctx.fillRect(this.position.getX, this.position.getY, this.dimensions[0], this.dimensions[1]); 
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

class IRender {
    constructor() {

    }

    render(window) {
        console.log("RENDER");
    }
}

class Actor extends IRender {
    constructor(renderModel) {
        super();
        this.renderModel = renderModel;
        // this.renderModel = [renderModel];
    }

    render(window) {
        // for (let i=0; i<this.renderModel.length; i++) {
        //     this.renderModel[i].render(window);
        // }

        if (this.renderModel != null){
            this.renderModel.render(window);
        }
    }

    set setPosition(position) {
        if (this.renderModel != null){
            this.renderModel.setPosition = position;

        }        
    }

    onMouseClick() {}
}

class RenderData {
    constructor() {
    }

    addObj(obj) {
        RenderData.renderObjects.push(obj);
    }

    static putObjectInPos(obj, nr) {
        if (nr <= 0) {
            RenderData.renderObjects.push(obj);
        }
        else {
            RenderData.renderObjects = RenderData.renderObjects.slice(0, nr).concat([obj]).concat(RenderData.renderObjects.slice(nr));
        }
    }

    static spawnActor(actor, pos=0) {
        RenderData.putObjectInPos(actor, pos);
    }


    static setElementToRenderLayer(obj, nr) {
        let index = RenderData.renderObjects.indexOf(obj);
        // taking out object
        RenderData.renderObjects = RenderData.renderObjects.slice(0, index).concat(RenderData.renderObjects.slice(index+1));

        RenderData.putObjectInPos(obj, nr);
    }
}

RenderData.renderObjects = [];
RenderData.window = document.getElementById("window");

class Rendering {
    constructor(renderData) {
        this.renderData = renderData;
        this.window = document.getElementById("window");
        this.ctx = this.window.getContext("2d");
    }

    update(){
        this.ctx.clearRect(0,0, this.window.clientWidth, this.window.clientHeight);
        let i = 0;
        for(i = 0; i < RenderData.renderObjects.length; i++) {
            RenderData.renderObjects[i].render(this.window);
        }

        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#FF0F0f";
        this.ctx.fillText("PUBAJA, ", 0,20);
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
                if ( d[i].renderModel != null && ( this.pointOverRectangle(InputController.mousePosition, d[i].renderModel)
                    || this.pointOverCircle(InputController.mousePosition, d[i].renderModel) )) {
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
