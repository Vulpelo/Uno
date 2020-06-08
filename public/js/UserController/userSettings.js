document.title = 'Uno - settings';

function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (newPassword.length < 8) {
        document.getElementById('response').innerText = 'Password must contain at least 8 characters.';
        document.getElementById('response').style.color = '#A11401'
    }
    else if (newPassword === confirmPassword) {
        MQuarry.send({
            type: 'POST',
            url: '?page=changePassword',
            data: `currentPassword=${currentPassword}&newPassword=${newPassword}`
            }, function(data) {
                if (data.status === 'success') {
                    document.getElementById('response').innerText = 'Password changed successfully.';
                    document.getElementById('response').style.color = '#1CA347'
                }
                else if (data.status === 'incorrect password') {
                    document.getElementById('response').innerText = 'Incorrect password';
                    document.getElementById('response').style.color = '#A11401'
                }
                console.log(data);
            });
    } else {
        document.getElementById('response').innerText = "Passwords aren't matched";
        document.getElementById('response').style.color = '#A11401'
    }
}