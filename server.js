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
        console.log('web server started');
    });
}

// WebSocket server
const wss = new WebSocket.Server({ port: 3001 });
let clients = {};

function validateUserName(clients, userName) {
    console.log('clients: ', clients);
    let isValid = true;
    let errorText = '';

    Object.keys(clients).forEach((id) => {
        if (clients[id].userName === userName) {
            isValid = false;
            errorText = 'Имя уже занято';
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
    console.log(`send message: ${message}`);
}

wss.on('connection', (ws) => {
    const id = Math.random().toString(36).substr(2, 9);
    let currentClient = {
        id,
        userName: null,
        ws
    }
    clients[id] = currentClient;
    console.log('client connected');

    ws.on('message', (messageString) => {
        let messageObject = JSON.parse(messageString);
        let { type, userName } = messageObject;

        switch (type) {
            case 'nameValidation':
                let validationResult = validateUserName(clients, userName);
                console.log('client submitted username:', userName);

                send(currentClient, validationResult, 'nameValidation')

                if (validationResult.isValid === true) {
                    currentClient.userName = userName;
                    console.log('client name was valid');
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
                    console.log('send client name to all clients');
                }

                break;
            case 'message':
                Object.keys(clients).forEach((id) => {
                    if (clients[id].userName !== null) {
                        send(clients[id], messageObject, 'message')
                    }
                })
                console.log('send message to all authorized clients:', messageObject);

                break;
        }
    });

    ws.on('close', () => {
        delete clients[id];
        console.log('client disconnected');
    });
});

console.log('web socket server started');
