/*/== == == MAIN == == ==/*/

let data = new RenderData();

let t = new Table();
// let t = new TEST();
t.start();


let rend = new Rendering(data);

let controller = new Controller(data, rend);


let MAIN_LOOP = function () {
    controller.loop();
}

setInterval(MAIN_LOOP, 10);
