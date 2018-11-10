
class IRender {
    constructor() {

    }

    render(window) {
        console.log("RENDER");
    }
}

class Actor extends IRender {
    constructor() {
        super();
        this.renderModel = [];
        this.rotation = Vector2d.Up();
    }

    set setModel(model) {
        this.renderModel = model;
    }

    set Rotation(nRot) {
        this.rotation = nRot;
        for (let i = 0; i<this.renderModel.length; i++) {
            this.renderModel[i].setRotation = nRot;
        }
    }

    get Rotation() {
        return this.rotation;
    }

    render(window) {
        for (let i=0; i<this.renderModel.length; i++) {
            this.renderModel[i].render(window);
        }
    }

    set setPosition(position) {
        for (let i = 0; i<this.renderModel.length; i++) {
            this.renderModel[i].setPosition = position;
        }
    }

    onMouseClick() {}
}
