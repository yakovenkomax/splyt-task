import React, { Component } from 'react';
import Button from '../Button';
import Input from '../Input';

import './styles.css';

export default class ChatField extends Component {
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
            <div className="chat-field">
                <div className="chat-field__input">
                    <Input multiline={ true }
                        changeHandler={this._handleInput.bind(this)}
                        heyPressHandler={this._handleKeyPress.bind(this)}
                        tabIndex='1'
                        rows='1'
                        placeholder='Type your message here...'
                        value={value}/>
                </div>
                <div className="chat-field__button">
                    <Button clickHandler={this._handleSend.bind(this)}
                        isDisabled={ value === '' }
                        tabIndex='2'
                        value='Send'/>
                </div>
            </div>
        );
    }
}
