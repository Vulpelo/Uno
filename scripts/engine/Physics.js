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

    // check if point is inside Rectangle. Returns boolean.
    pointOverRectangle(point, rectangle) {

        // to determine one and second side of rectangle
        let additionalAngle = Math.PI/2;
        let dims = [ rectangle.dimensions[1]/2, rectangle.dimensions[0]/2 ];

        for (let i = 0; i < 2; i++) {
			// New perspective vector
            let P = Vector2d.fromAngleLength(rectangle.getWorldRotation() + additionalAngle*i, 1);

            // let rec = new Vector2d(rectangle.getWorldPosition.getX, -rectangle.getWorldPosition.getY);
			let distance = point.sub( rectangle.getWorldPosition() );

            // fabs(distance * P) - distance between circle and rectangle on new perspective
            let dist = Math.abs(distance.dot(P));
			if (dist > dims[i]) {
				//not touching for sure
				return false;
			}
        }
        return true;

        // OLD for not rotated objects
        // return (rectangle.dimensions.length == 2 
        //         && point.getX <= rectangle.getWorldPosition().getX + rectangle.dimensions[0] && point.getX >= rectangle.getWorldPosition().getX 
        //         && point.getY >= rectangle.getWorldPosition().getY && point.getY <= rectangle.getWorldPosition().getY + rectangle.dimensions[1]);
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
