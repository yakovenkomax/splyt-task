const path = require('path');
const express = require('express');
const WebSocket = require('ws');

// Web server
const args = process.argv.slice(2);
const isDevMode = args.length > 0 && args[0] === '--dev';
const app = express();
const staticPath = path.join(__dirname, '/build');

if (isDevMode === false) { // Disable for dev mode
    app.use(express.static(staticPath));
    app.listen(3000, () => {
        console.log('Web server started.');
    });
}

// WebSocket server
const wss = new WebSocket.Server({ port: 3001 });
let clients = {};

function validateUserName(clients, userName) {
    let isValid = true;
    let errorText = '';

    Object.keys(clients).forEach((id) => {
        if (clients[id].userName === userName) {
            isValid = false;
            errorText = 'This name is already taken.';
        }
    });

    return {
        userName,
        isValid,
        errorText
    }
}

function send(client, messageObject, messageType) {
    const message = JSON.stringify(Object.assign({}, {type: messageType}, messageObject));

    client.ws.send(message, function(error) {
        // TODO: handle closed connections
    });
    console.log('Send: ', message);
}

wss.on('connection', (ws) => {
    const id = Math.random().toString(36).substr(2, 9);
    let currentClient = {
        id,
        userName: null,
        ws
    }
    clients[id] = currentClient;
    console.log('Client connected.');

    ws.on('message', (messageString) => {
        let messageObject = JSON.parse(messageString);
        let { type, userName } = messageObject;

        console.log('Recieve: ', messageObject);

        switch (type) {
            case 'nameValidation':
                let validationResult = validateUserName(clients, userName);

                send(currentClient, validationResult, 'nameValidation')

                if (validationResult.isValid === true) {
                    currentClient.userName = userName;
                    const userList = Object.keys(clients).map((id) => {
                        if (clients[id].userName !== null) {
                            return clients[id].userName;
                        }
                    });
                    Object.keys(clients).forEach((id) => {
                        if (clients[id].userName !== null) {
                            send(clients[id], { userList }, 'userList')
                        }
                    })
                }

                break;
            case 'message':
                Object.keys(clients).forEach((id) => {
                    if (clients[id].userName !== null) {
                        send(clients[id], messageObject, 'message')
                    }
                })

                break;
            default:
                break;
        }
    });

    ws.on('close', () => {
        delete clients[id];
        console.log('Client disconnected.');
    });
});

console.log('Web socket server started.');
