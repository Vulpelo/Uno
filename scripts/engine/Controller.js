
class Controller {
    constructor(model, render) {
        this.model = model;
        this.render = render;
        this.physics = new Physics(this.model);
        this.update = new Update();
    }

    loop() {
        this.physics.checkOverlaping();
        this.update.runEventTicks();
        this.render.update();

        InputController.reset();
    }

}
