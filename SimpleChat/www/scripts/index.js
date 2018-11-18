// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();

var connection;

(function () {
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    connection = new WebSocket('ws://127.0.0.1:1337');

    connection.onopen = function () {
        console.log("connected to the server");
    };

    connection.onerror = function (error) {
        alert('Unable to connect to server');
    };

    connection.onmessage = function (message) {
        try {
            var json = JSON.parse(message.data);
            appendMessage(json.author, json.message);
            console.log(json);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ',
                message.data);
            return;
        }
    };
})();

function send(user, message) {
    if (connection) {
        connection.send(JSON.stringify({ author: user, message: message }));
    }
}

function sendMessage() {
    var name = $('#name');
    var message = $('#message');
    if (name.val() != "" && message.val() != "") {
        send(name.val(), message.val());
        message.val("");
    }
}

function appendMessage(author, message) {
    messages = $('#messages');

    messages.prepend("<li class=\"collection-item\"><strong>" + author + "</strong>: " + message + "</li>");
}