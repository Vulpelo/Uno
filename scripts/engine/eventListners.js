
class InputController {
    static reset() {
        InputController.leftMouseButtonClicked = false;
    }

    static keyDownHandler(e) {

    }

    static keyUpHandler(e) {
    
    }
    
    static mouseMoveHandler(e) {
        InputController.mousePosition.setX = e.clientX - RenderData.window.offsetLeft;
        InputController.mousePosition.setY = e.clientY - RenderData.window.offsetTop;
    }
    
    static mouseClickHandler(e) {
        if ("which" in e) {
            InputController.leftMouseButtonClicked = (e.which == 1);
        }
    }
}

InputController.leftMouseButtonClicked = false;
InputController.mousePosition = new Vector2d(0,0);

document.addEventListener("keydown", InputController.keyDownHandler, false);
document.addEventListener("keydown", InputController.keyUpHandler, false);
document.addEventListener("mousemove", InputController.mouseMoveHandler, false);
document.addEventListener("click", InputController.mouseClickHandler, false);
