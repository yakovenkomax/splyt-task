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
        const text = event.target.value;

        this.setState({
            value: text
        });
    }

    _handleKeyPress(event) {
        if (event.charCode === 13 && !event.shiftKey) {
            this._handleSend();
            event.preventDefault();
        }
    }

    _handleSend() {
        const { onSend } = this.props;
        const { value } = this.state;

        onSend(value);

        this.setState({
            value: ''
        });
    }

    render() {
        const { value } = this.state;

        return (
            <div className="input-field">
                <textarea className="input-field__textarea"
                    onChange={this._handleInput.bind(this)}
                    onKeyPress={this._handleKeyPress.bind(this)}
                    placeholder='Type your message here...'
                    tabIndex='1'
                    value={value}>
                </textarea>
                <div className="input-field__button"
                    onClick={this._handleSend.bind(this)}
                    tabIndex='2'>
                    Send
                </div>
            </div>
        );
    }
}
