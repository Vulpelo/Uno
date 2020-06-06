
function registerUser() {
    let name = document.getElementById("register-name").value;
    let email = document.getElementById("register-email").value;
    let password = document.getElementById("register-password").value;
    let confirm_password = document.getElementById("register-confirm-password").value;

    if (email != "" && name != "" && password != "" && confirm_password != "") {

        if (password == confirm_password) {
            MQuarry.send({
                type: "POST",
                url: "?page=userExists",
                data: "email="+email
                }, function(data) {
                    if (data) {
                        alert("User with this email allready exists!");
                    }
                    else {
                        document.getElementById("register-form").submit();
                    }
                });
        }
        else {
            alert("Passwords aren't matched");
        }
    }
    else {
        alert("One of the field is empty!");
    }

}
