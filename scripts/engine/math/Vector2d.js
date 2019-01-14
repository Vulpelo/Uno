class Vector2d {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get getX() {
        return this.x;
    }
    set setX(x) {
        this.x = x;
    }
    get getY() {
        return this.y;
    }
    set setY(y) {
        this.y = y;
    }
    coordinate(x, y) {
        this.x = x;
        this.y = y;
    }
    abs() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }
    //substracts two vectors
    sub(vector) {
        return new Vector2d(this.x-vector.getX, this.y-vector.getY);
    }
    // adds two vectors together
    add(vector) {
        return new Vector2d(this.x+vector.getX, this.y+vector.getY);
    }
    // multiplies two vectors. Returns a number
    dot(vector) {
        return this.x*vector.getX + this.y*vector.getY;
    }

    // Angle is 0 when vector points up (-y). Angle rises clockwise from 0 to 2*PI - 0.(0)1
    radAngle() {
        let angle = Math.PI/2;

        if (this.x < 0) {
            angle += Math.PI;
        }

        angle += Math.atan(this.y / this.x);
        return angle;
    }

    // Angle is 0 when vector points up (-y). Angle rises clockwise from 0 to 359.(9)
    degAngle() {
        return this.radAngle() * 180 / Math.PI;
    }

    length() {
        return Math.sqrt( this.x * this.y);
    }

    normalize() {
        return new Vector2d(this.x/this.length(), this.y/this.length());
    }

    rotate(rad) {
        //let rad = angle * Math.PI/180;
        return new Vector2d( Math.cos(rad)*this.x - Math.sin(rad)*this.y , Math.sin(rad)*this.x + Math.cos(rad)*this.y );
    }

    /* Creates vector2d based on it's length and angle. Angle 0 radians points up. Angle is going clockwise. */
    static fromAngleLength(radians, length) {
        // let s = degAngle * Math.PI/180;
        return new Vector2d(length * Math.sin(radians), -length * Math.cos(radians));
    }

    static Up() {
        return new Vector2d(0, -1);
    }
    static Right() {
        return new Vector2d(1, 0);
    }
    static Down() {
        return new Vector2d(0, 1);
    }
    static Left() {
        return new Vector2d(-1, 0);
    }
}
