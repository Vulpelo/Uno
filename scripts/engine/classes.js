
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
        this.parent = null;

        this.renderModel = [];
        this.position = new Vector2d(0, 0);
        this.rotation = 0;
    }

    set Parent(parent) {
        this.parent = parent;
    }

    set setModel(model) {
        this.renderModel = model;
        for (let i=0; i<this.renderModel.length; i++) {
            this.renderModel[i].Parent = this;
        }
    }

    set Rotation(radians) {
        this.rotation = radians;
    }
    get Rotation() {
        return this.rotation;
    }
    getWorldRotation() {
        if (this.parent) {
            return this.rotation + this.parent.getWorldRotation();
        }
        return this.rotation;
    }

    get Position() {
        return this.position;
    }
    set Position(position) {
        this.position = position;
    }
    getWorldPosition() {
        if (this.parent) {
            return this.position.add(this.parent.getWorldPosition());
        }
        return this.position;
    }

    getHighestParent() {
        if (this.parent) {
            return this.parent.getHighestParent();
        }
        return this;
    }

    render(window) {
        for (let i=0; i<this.renderModel.length; i++) {
            this.renderModel[i].render(window);
        }
    }

    onMouseClick() {}
}
