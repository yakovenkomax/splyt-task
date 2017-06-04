import React, { Component } from 'react';

import ChatBoard from '../ChatBoard';
import UserList from '../UserList';
import InputField from '../InputField';
import LoginGate from '../LoginGate';

import './styles.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: 'Max',
            messages: []
        };

        this.ws = new WebSocket(`ws://${window.location.hostname}:3001`);

        this.ws.onmessage = (message) => {
            const { messages } = this.state;
            console.log(message.data);
            messages.push(JSON.parse(message.data));
            this.setState({ messages });
        };
    }

    _sendMessage(messageText) {
        const { userName } = this.state;
        const id = Math.random().toString(36).substr(2, 9);

        const message = {
            id,
            time: (new Date()).getTime(),
            text: messageText,
            author: userName
        };

        this.ws.send(JSON.stringify(message));
    }

    render() {
        const { messages } = this.state;

        return (
            <div className="app">
                <header className="app__header">
                    splyt
                </header>
                <div className="app__chat">
                    <ChatBoard messages={ messages }/>
                    <InputField onSend={this._sendMessage.bind(this)}/>
                </div>
                <div className="app__users">
                    <UserList/>
                </div>
                <LoginGate/>
            </div>
        );
    }
}
