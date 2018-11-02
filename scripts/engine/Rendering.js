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
