
class Update {
    constructor() {
    }

    runEventTicks() {
        let i = 0;
        for(i = 0; i < RenderData.renderObjects.length; i++) {
            if (!RenderData.renderObjects[i].ToBeDestroyed) {
                RenderData.renderObjects[i].eventTick();
            }
        }
    }
}
