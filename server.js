const path = require('path');
const express = require('express');
const WebSocket = require('ws');

// Web server
const args = process.argv.slice(2);
const isDevMode = args.length > 0 && args[0] === '--dev';
const app = express();
const staticPath = path.join(__dirname, '/build');

if (isDevMode === false) {
    app.use(express.static(staticPath));
    app.listen(3000, () => {
        console.log('web server started');
    });
}

// WebSocket server
const wss = new WebSocket.Server({ port: 3001 });
let clients = {};

wss.on('connection', function (ws) {
    const id = Math.random().toString(36).substr(2, 9);
    clients[id] = ws;
    console.log('client connected');

    ws.on('message', function (message) {
        for (var key in clients) {
            clients[key].send(message, function(error) {
                // TODO: handle closed connections
            });
            console.log(`send all: ${message}`);
        }
    });

    ws.on('close', function() {
        delete clients[id];
        console.log('client disconnected');
    });
});

console.log('web socket server started');
