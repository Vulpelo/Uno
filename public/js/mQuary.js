
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

        // telling that data is send

        let vars = params["data"];
        if (vars !== ""){
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                onreadystatechange(this);
            }
        };
        xhttp.send(vars);
    }
}
