import React, { Component } from 'react';

import ChatBoard from '../ChatBoard';
import UserList from '../UserList';
import InputField from '../InputField';
import LoginGate from '../LoginGate';

import './styles.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        const ws = new WebSocket(`ws://${window.location.hostname}:3001`);

        ws.onopen = function open(event) {
            ws.send('something');
        };

        ws.onmessage = function incoming(data) {
            console.log(data);
        };
    }

    render() {
        return (
            <div className="app">
                <header className="app__header">
                    splyt
                </header>
                <div className="app__chat">
                    <ChatBoard/>
                    <InputField/>
                </div>
                <div className="app__users">
                    <UserList/>
                </div>
                <LoginGate/>
            </div>
        );
    }
}
