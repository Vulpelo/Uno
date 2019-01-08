
class Update {
    constructor() {
    }

    runEventTicks() {
        let i = 0;
        for(i = 0; i < RenderData.renderObjects.length; i++) {
            RenderData.renderObjects[i].eventTick();
        }
    }
}
