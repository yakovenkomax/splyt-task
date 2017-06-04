import React, { Component } from 'react';
import './styles.css';

export default class ChatBoard extends Component {
    render() {
        const { messages } = this.props;

        return (
            <ul className="chat-board">
                { messages.map((message, index) =>
                    <li key={message.time + index}>
                        <span>{ message.time }</span>
                        <span>{ message.author }</span>
                        <span>{ message.text }</span>
                    </li>
                ) }
            </ul>
        );
    }
}
