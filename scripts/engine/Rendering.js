class RenderData {
    constructor() {
    }

    addObj(obj) {
        RenderData.renderObjects.push(obj);
    }

    update() {
        for (let i=0; i<RenderData.destroyObjects.length; i++) {
            if (RenderData.renderObjects.includes(RenderData.destroyObjects[i]))
            {
                this.removeFromPosition(RenderData.renderObjects.indexOf(RenderData.destroyObjects[i]));
            }
        }
        RenderData.destroyObjects = [];
    }

    removeFromPosition(index) {
        RenderData.renderObjects = RenderData.renderObjects.slice(0, index).concat(RenderData.renderObjects.slice(index+1));
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

    static Destroy(object) {
        if (object != null) {
            object.ToBeDestroyed = true;
            RenderData.destroyObjects.push(object);
        }
    }
}

RenderData.renderObjects = [];
RenderData.destroyObjects = [];
RenderData.window = document.getElementById("window");

class Rendering {
    constructor(renderData) {
        this.renderData = renderData;
        this.ctx = RenderData.window.getContext("2d");
    }

    update() {
        this.renderData.update();

        RenderData.window = document.getElementById("window");

        this.ctx.clearRect(0,0, RenderData.window.clientWidth, RenderData.window.clientHeight);
        let i = 0;
        for(i = 0; i < RenderData.renderObjects.length; i++) {
            RenderData.renderObjects[i].render(RenderData.window);
        }
    }
}
