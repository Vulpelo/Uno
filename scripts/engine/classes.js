
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
    }

    set setModel(model) {
        this.renderModel = model;
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
