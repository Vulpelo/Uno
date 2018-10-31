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
}
