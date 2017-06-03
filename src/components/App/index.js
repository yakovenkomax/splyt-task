import React, { Component } from 'react';
import ChatBoard from '../ChatBoard';
import UserList from '../UserList';
import InputField from '../InputField';
import LoginGate from '../LoginGate';
import './styles.css';

export default class App extends Component {
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
