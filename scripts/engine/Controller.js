
class Controller {
    constructor(model, render) {
        this.model = model;
        this.render = render;
        this.physics = new Physics(this.model);
    }

    loop() {
        this.physics.checkOverlaping();
        this.render.update();
        InputController.reset();
    }

}
