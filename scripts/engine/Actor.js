class Actor extends Object {
    constructor() {
        super();

        this.renderModel = [];
    }

    set setModel(model) {
        this.renderModel = model;
        for (let i=0; i<this.renderModel.length; i++) {
            this.renderModel[i].Parent = this;
        }
    }

    get RenderModel() {
        return this.renderModel;
    }

    render(window) {
        for (let i=0; i<this.renderModel.length; i++) {
            this.renderModel[i].render(window);
        }
    }

    onMouseClick() {}

    onMouseOverlap() {}
}
