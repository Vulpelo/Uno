class Physics {
    constructor(data) {
        this.data = data;
    }

    checkOverlaping() {
        this.checkMouseClickActorEvent();
    }

    // checking if mouse has clicked one of the elements on screen
    checkMouseClickActorEvent() {
        if (InputController.leftMouseButtonClicked == true) {
            let i = 0;
            let d = RenderData.renderObjects;

            // finding first element from top to down on which mouse is over
            for (i = d.length-1; i >= 0; i--) {
                for (let j=d[i].renderModel.length-1; j >= 0; j--) {
                    if ( d[i].renderModel[j].Interactable == true 
                        && ( this.pointOverRectangle(InputController.mousePosition, d[i].renderModel[j])
                        || this.pointOverCircle(InputController.mousePosition, d[i].renderModel[j]) )) 
                    {
                        d[i].onMouseClick(d[i].renderModel[j]);
                        return;
                    }
                }

            }
        }
    }

    // check if point is inside Rectangle
    pointOverRectangle(point, rectangle) {
        return (rectangle.dimensions.length == 2 
                && point.getX <= rectangle.position.getX + rectangle.dimensions[0] && point.getX >= rectangle.position.getX 
                && point.getY >= rectangle.position.getY && point.getY <= rectangle.position.getY + rectangle.dimensions[1])
    }

    // check if point is inside Circle
    pointOverCircle(point, circle) {
        if(circle.dimensions.length == 1) {
            let vec = point.sub(circle.position);
            return vec.abs() <= circle.dimensions[0];
        }
        return false;
    }

}
