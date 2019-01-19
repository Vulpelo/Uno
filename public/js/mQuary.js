
class MQuarry {
    constructor() {
    }

    //  send({
    //     type: "POST",
    //     url: "some.php",
    //     data: "name=John&id=5"
    //   }, function( msg ) {
    //     alert( "Data Saved: " + msg );
    //   });
    //
    static send(params, onreadystatechange) {
        let xhttp = new XMLHttpRequest();         
        xhttp.open(params["type"], params["url"], true);
        xhttp.responseType = "json";

        let vars = params["data"];
        if (vars !== ""){
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (this.response == null) {
                    onreadystatechange();
                }
                else {
                    onreadystatechange(this.response);
                }
            }
        };
        xhttp.send(vars);
    }
}
