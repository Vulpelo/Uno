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

    render(window) {
        for (let i=0; i<this.renderModel.length; i++) {
            this.renderModel[i].render(window);
        }
    }

    onMouseClick() {}
}
