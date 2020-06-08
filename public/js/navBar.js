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

function openIndex() {
    window.location.replace('?page=index');
}

function empty() {}
