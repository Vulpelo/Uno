class Object {
    constructor() {
        this.parent = null;
        this.position = new Vector2d(0, 0);
        this.rotation = 0;
        this.toBeDestroyed = false;
    }    

    set ToBeDestroyed($bool) {
        this.toBeDestroyed = $bool;
    }

    get ToBeDestroyed() {
        return this.toBeDestroyed;
    }

    set Parent(parent) {
        this.parent = parent;
    }

    get Parent() {
        return this.parent;
    }

    get Position() {
        return this.position;
    }
    set Position(position) {
        this.position = position;
    }
    getWorldPosition() {
        let wPos = new Vector2d(0,0);
        let rot = 0;

        // if has parent then go down in recursion
        if (this.parent) {
            wPos = wPos.add( this.parent.getWorldPosition() );
        }
        else {
            // the Highest parent.
            return this.Position;
        }
        // going up in recursion
        
        // new relative position depending on angle
        let nPos = this.Position.rotate( this.parent.getWorldRotation() );
        return wPos.add(nPos);
    }

    set Rotation(radians) {
        this.rotation = radians;
    }
    get Rotation() {
        return this.rotation;
    }
    getWorldRotation() {
        if (this.parent) {
            return this.rotation + this.parent.getWorldRotation();
        }
        return this.rotation;
    }

    getHighestParent() {
        if (this.parent) {
            return this.parent.getHighestParent();
        }
        return this;
    }

    eventTick() {}

    render(window) {
        console.log("RENDER");
    }
} 
