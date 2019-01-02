
class MQuarry {
    constructor() {
    }

    //  send({
    //     type: "POST",
    //     url: "some.php",
    //     data: "name=John"
    //   }, function( msg ) {
    //     alert( "Data Saved: " + msg );
    //   });
    //
    static send(params, onreadystatechange) {
        let xhttp = new XMLHttpRequest();         
        xhttp.open(params["type"], params["url"], true);

        let vars = params["data"];

        xhttp.onreadystatechange = onreadystatechange;
        xhttp.send(vars);
    }
}