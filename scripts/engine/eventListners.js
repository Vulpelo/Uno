
class InputController {
    static keyDownHandler(e) {

    }

    static keyUpHandler(e) {
    
    }
    
    static mouseMoveHandler(e) {
        InputController.mousePosition.setX = e.clientX;
        InputController.mousePosition.setY = e.clientY;
    }
    
    static mouseClickHandler(e) {
        if ("which" in e) {
            document.write("HI");
            InputController.leftMouseButtonClicked = e.which === 3;
            document.write(InputController.leftMouseButtonClicked);
        }
    }
}

InputController.leftMouseButtonClicked = false;
InputController.mousePosition = new Vector2d(0,0);

document.addEventListener("keydown", InputController.keyDownHandler, false);
document.addEventListener("keydown", InputController.keyUpHandler, false);
document.addEventListener("mousemove", InputController.mouseMoveHandler, false);
document.addEventListener("click", InputController.mouseClickHandler, false);
