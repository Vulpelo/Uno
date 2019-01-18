function logOut() {
    MQuarry.send({
        type: "POST",
        url: "?page=logout",
        data: ""
        }, empty);
}

function logIn() {
    MQuarry.send({
        type: "POST",
        url: "?page=login",
        data: ""
        }, empty);
}

function empty() {}
