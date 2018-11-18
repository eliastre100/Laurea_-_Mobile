process.title = 'node-chat';
var webSocketsServerPort = 1337;
var webSocketServer = require('websocket').server;
var http = require('http');

var clients = [ ];
var server = http.createServer(function(request, response) {
  // Not important for us. We're writing WebSocket server,
  // not HTTP server
});
server.listen(webSocketsServerPort, function() {
  console.log((new Date()) + " Server is listening on port "
      + webSocketsServerPort);
});

/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
  httpServer: server
});

wsServer.on('request', function(request) {
  console.log((new Date()) + ' Connection from origin '
      + request.origin + '.');
  var connection = request.accept(null, request.origin); 

  var index = clients.push(connection) - 1;
  console.log((new Date()) + ' Connection accepted.');
  connection.sendUTF(JSON.stringify({author: "Server", message: "Welcome on SimpleChat"}));

  connection.on('message', function(message) {
        for (var i=0; i < clients.length; i++) {
          clients[i].sendUTF(message.utf8Data);
        }
  });

  connection.on('close', function(connection) {
      console.log((new Date()) + " Peer "
          + connection.remoteAddress + " disconnected.");
      clients.splice(index, 1);
    })
});