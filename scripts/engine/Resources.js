class Resources {
    constructor() {
    }

    static getImagePath(name) {
        return Resources.path + name + ".jpg";
    }
}

Resources.path = "./resources/cards/";
