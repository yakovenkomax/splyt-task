import React, { Component } from 'react';
import './styles.css';

export default class ChatBoard extends Component {
    render() {
        const { messageHistory } = this.props;

        return (
            <ul className="chat-board">
                { messageHistory.map(({ time, userName, text }, index) =>
                    <li key={time + index}
                        className="chat-board__message">
                        <span className="chat-board__time">{ time }</span>
                        <span className="chat-board__username">{ userName }</span>
                        <span className="chat-board__text">{ text }</span>
                    </li>
                ) }
            </ul>
        );
    }
}
