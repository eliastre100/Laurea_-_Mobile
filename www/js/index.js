include('page','login');

function login() {
    loadingElement('loginBtn', 'Please wait...');
    setTimeout(function () {
            if ($('#username').val() === 'admin' && $('#password').val() == 'azerty') {
            openPage('home');
        } else {
            alert('Bad username or password. Hint: admin && french keyboard');
        }
        closeLoading('loginBtn');
    }, 1000);
}