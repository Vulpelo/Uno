/*/== == == MAIN == == ==/*/

let data = new RenderData();

let mod = new Rectangle(new Vector2d(50,200));
mod.setDimensions = [30, 50];
let act = new Card( mod , 'green', 4);
act.setPosition = new Vector2d(0,0);
data.addObj(act);


let rend = new Rendering(data);

let controller = new Controller(data, rend);

let lo = function () {
    controller.loop();
}

setInterval(lo, 10);
