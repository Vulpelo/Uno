
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
        this.Position = new Vector2d(0, 0);
        this.rotation = Vector2d.Up();
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

    set Rotation(nRot) {
        this.rotation = nRot;
        //for (let i = 0; i<this.renderModel.length; i++) {
        //    this.renderModel[i].setWorldRotation = nRot;
        //}
    }

    get Rotation() {
        if (this.parent) {
            return this.rotation.radAngle() + this.parent.Rotation;
        }
        return this.rotation.radAngle();
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

    render(window) {
        for (let i=0; i<this.renderModel.length; i++) {
            this.renderModel[i].render(window);
        }
    }

    // set setPosition(position) {
    //     for (let i = 0; i<this.renderModel.length; i++) {
    //         this.renderModel[i].setPosition = position;
    //     }
    // }

    onMouseClick() {}
}
