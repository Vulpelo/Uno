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

    radAngle() {
        return Math.atan(this.y / this.x);
    }

    degAngle() {
        return Math.atan(this.y / this.x) * Math.PI / 180;
    }

    static Up() {
        return new Vector2d(-1, 0);
    }
    static Right() {
        return new Vector2d(0, 1);
    }
    static Down() {
        return new Vector2d(1, 0);
    }
    static Left() {
        return new Vector2d(0, -1);
    }
}
