class Resources {
    constructor() {
    }

    static getImagePath(name) {
        return Resources.path + "cards/" + name + ".jpg";
    }

    static getImagePathPNG(name) {
        return Resources.path + "images/" + name + ".png";
    }
}

Resources.path = "./resources/";
