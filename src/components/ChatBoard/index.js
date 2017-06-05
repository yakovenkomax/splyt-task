import React, { Component } from 'react';
import './styles.css';

export default class ChatBoard extends Component {
    componentDidUpdate(prevProps, prevState) {
        this.chatBoardNode.scrollTop = this.chatBoardNode.scrollHeight;
    }

    render() {
        const { messageHistory } = this.props;

        return (
            <ul className="chat-board" ref={(el) => { this.chatBoardNode = el }}>
                { messageHistory.map(({ time, userName, text }, index) =>
                    <li key={time + index}
                        className="chat-board__message">
                        <span className="chat-board__time">{ `${(new Date(time)).getHours()}:${(new Date(time)).getMinutes()}` }</span>
                        <span className="chat-board__username">{ `${userName}:` }</span>
                        <span className="chat-board__text">{ text }</span>
                    </li>
                ) }
            </ul>
        );
    }
}
