let t;
let rend;
let controller;

let MAIN_LOOP = function () {
    controller.loop();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
async function demo() {
    while (Server.data == null) {
        await sleep(1000);
    }
    t = new Table();
    // let t = new TEST();
    t.start();

    rend = new Rendering(data);

    controller = new Controller(data, rend);

    setInterval(MAIN_LOOP, 10);
}
  

/*/== == == MAIN == == ==/*/
let data = new RenderData();

let server = new Server();
server.start();

demo();
