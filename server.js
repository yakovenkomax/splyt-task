const path = require('path');
const express = require('express');
const WebSocket = require('ws');

// Web server
const args = process.argv.slice(2);
const isDevMode = args.length > 0 && args[0] === 'devmode';
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
let clients = [];

wss.on('connection', function (ws) {
    clients.push(ws);
    console.log('client connected');

    ws.on('message', function (message) {
        console.log(`received: ${message}`);

        const messageObj = {
            time: (new Date()).getTime(),
            text: message,
            author: 'Max'
        };

        const messageString = JSON.stringify({ type: 'message', data: messageObj });

        clients.forEach((client) => {
            client.send(messageString, function(error) {
                // TODO: handle closed connections
            });
            console.log(`send all: ${messageString}`);
        })
    });
});

console.log('web socket server started');
