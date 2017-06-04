import React, { Component } from 'react';
import './styles.css';

export default class LoginGate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    _handleInput(event) {
        const messageText = event.target.value;

        this.setState({
            value: messageText
        });
    }

    _handleSend(event) {
        const { onSend } = this.props;
        const text = event.target.value;

        if (event.charCode === 13) {
            onSend(text);
        }
    }

    render() {
        const { value } = this.state;

        return (
            <div className="login-gate">
                <input onChange={this._handleInput.bind(this)}
                    onKeyPress={this._handleSend.bind(this)}
                    value={value}>
                </input>
            </div>
        );
    }
}
