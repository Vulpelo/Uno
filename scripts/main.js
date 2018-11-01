/*/== == == MAIN == == ==/*/

let data = new RenderData();


let t = new Table();
t.start();

// let gC = new Player();
// data.addObj(gC);

// let mod = new Rectangle(new Vector2d(50,200));
// let act = new Card( mod , 'green', 4); data.addObj(act);
// gC.addCard(act);

// mod = new Rectangle(new Vector2d(50,200));
// act = new Card(mod, 'blue', 1); data.addObj(act);
// gC.addCard(act);

// mod = new Rectangle(new Vector2d(50,200));
// act = new Card(mod, 'yellow', 1); data.addObj(act);
// gC.addCard(act);

// mod = new Rectangle(new Vector2d(50,200));
// act = new Card(mod, 'red', 1); data.addObj(act);
// gC.addCard(act);

let rend = new Rendering(data);

let controller = new Controller(data, rend);

let lo = function () {
    controller.loop();
}

setInterval(lo, 10);
