const http = require('http');
const WebSocketServer = require('websocket').server;

let connections = [];       // These will be our users..

// Create a raw http server (This will help us to create the TCP which will then pass to the websocker )
const httpServer = http.createServer();

const webSocket = new WebSocketServer({ "httpServer": httpServer });

httpServer.listen(8080, () => console.log("My server is listening on port 8080..."));


webSocket.on('request', request => {
    const connection = request.accept(null, request.origin);
    connection.on('message', message => {
        // Someone just sent a message  ==>  tell everybody
        connections.forEach(c => {
            c.send(`User ${connection.socket.remotePort} says ${message}`);
            // NOTE: we're using (remotePort) as a unique identifier for each user.
        })
        console.log(' flag ');
    })
    connections.push(connection);
    // Someone just connected. Just tell everybody..
    connections.forEach(c => c.send(`User ${connection.socket.remotePort} just connected...`));
})
