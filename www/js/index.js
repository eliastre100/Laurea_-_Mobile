$(document).on("ready", () => {
   databaseHandler.createDatabase()
});

function addAccount() {
    const id = $("#id").val();
    const username = $("#username").val();
    const password = $("#password").val();
    const confirmPassword = $("#passwordConfirm").val();

    if (id !== "" && username !== "" && password !== "" && password === confirmPassword) {
        accounttHandler.addAccount(id, username, password).then(() => {
            $("#id").val("");
            $("#username").val("");
            $('#password').val("");
            $('#passwordConfirm').val("");
            alert('Account registered');
        }) .catch(() => {
            alert('Unable to save account');
        })
    } else {
        alert("Invalid parameters");
    }
}

$(document).on("pageshow","#loadpage", async () => {
    const data = await generateDataTable();
    $('#data').html(data);
});

async function generateDataTable() {
    const accounts = await accounttHandler.getAccounts();
    let data = '';
    accounts.forEach((account) => {
        data += ' <tr>' +
            '<th>' + account._id + '</th>' +
            '<td>' + account.username + '</td>' +
            '<td>' + account.password + '</td>' +
            '</tr>'
    });
    return data;
}