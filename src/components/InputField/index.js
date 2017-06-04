import React, { Component } from 'react';
import './styles.css';

export default class InputField extends Component {
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
        const messageText = event.target.value;

        if (event.charCode === 13) {
            onSend(messageText);

            this.setState({
                value: ''
            });
        }
    }

    render() {
        const { value } = this.state;

        return (
            <div className="input-field">
                <input onChange={this._handleInput.bind(this)}
                    onKeyPress={this._handleSend.bind(this)}
                    value={value}>
                </input>
            </div>
        );
    }
}
