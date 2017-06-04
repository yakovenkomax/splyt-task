import React, { Component } from 'react';

import ChatBoard from '../ChatBoard';
import UserList from '../UserList';
import InputField from '../InputField';
import LoginGate from '../LoginGate';

import logo from '../../splyt.svg';
import './styles.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            userName: null,
            messageHistory: []
        };

        this.ws = new WebSocket(`ws://${window.location.hostname}:3001`);

        this.ws.onmessage = (messageEvent) => {
            const { messageHistory } = this.state;
            let messageObject = JSON.parse(messageEvent.data);
            let { type, userName, isValid, errorText, userList } = messageObject;

            switch (type) {
                case 'nameValidation':
                    if (isValid === true) {
                        this.setState({ userName });
                    } else {
                        console.log(errorText);
                    }
                    break;
                case 'userList':
                    this.setState({ userList });
                    break;
                case 'message':
                    this.setState({ messageHistory: [...messageHistory, messageObject] });
                    break;
                default:
                    break;
            }
        };
    }

    _sendUserName(userName) {
        const message = {
            type: 'nameValidation',
            userName
        };

        console.log('send username for validation: ', message);
        this.ws.send(JSON.stringify(message));
    }

    _sendMessage(text) {
        const { userName } = this.state;
        const id = Math.random().toString(36).substr(2, 9);
        const message = {
            type: 'message',
            time: (new Date()).getTime(),
            id,
            text,
            userName
        };

        console.log('send message: ', message);
        this.ws.send(JSON.stringify(message));
    }

    render() {
        const { messageHistory, userName, userList } = this.state;

        return (
            <div className="app">
                <header className="app__header">
                    <div className="app__logo-box">
                        <img src={ logo } className="app__logo" alt="splyt" />
                        <span className="app__appendix">chat</span>
                    </div>
                    <div className="app__username">{ userName !== null && userName }</div>
                </header>
                <div className="app__body">
                    <div className="app__users">
                        <UserList userList={ userList }/>
                    </div>
                    <div className="app__chat">
                        <ChatBoard messageHistory={ messageHistory }/>
                        <InputField onSend={this._sendMessage.bind(this)}/>
                    </div>
                </div>
                { userName === null &&
                    <LoginGate onSend={this._sendUserName.bind(this)}/>
                }
            </div>
        );
    }
}
