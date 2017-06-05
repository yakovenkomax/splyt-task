import React, { Component } from 'react';
import Button from '../Button';
import Input from '../Input';

import './styles.css';

export default class LoginGate extends Component {
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
    }

    render() {
        const { value } = this.state;
        const { errorText } = this.props;

        return (
            <div className="login-gate">
                <div className="login-gate__text">Welcome to Splyt chat</div>
                <div className="login-gate__input">
                    <Input changeHandler={ this._handleInput.bind(this) }
                        heyPressHandler={ this._handleKeyPress.bind(this) }
                        tabIndex='1'
                        label='Your name'
                        value={ value }/>
                </div>
                { errorText &&
                    <div className="login-gate__error-text">{ errorText }</div>
                }
                <div className="login-gate__button">
                    <Button clickHandler={ this._handleSend.bind(this) }
                        isDisabled={ value === '' }
                        tabIndex='2'
                        value='Enter'/>
                </div>
            </div>
        );
    }
}
