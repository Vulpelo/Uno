/*/== == == MAIN == == ==/*/

let data = new RenderData();

let mod = new Rectangle(new Vector2d(10,0));
mod.setColor = "#6dff6d";
mod.setDimensions = [30, 20];
let act = new Actor( mod );
data.addObj(act);

mod = new Circle(new Vector2d(80,50));
mod.setColor = "#0000ff";
mod.setDimensions = [40];
act = new Actor( mod );
data.addObj(act);

let rend = new Rendering(data);

rend.update();
