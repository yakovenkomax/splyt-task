import React, { Component } from 'react';
import './styles.css';

export default class ChatBoard extends Component {
    render() {
        const { messageHistory } = this.props;

        return (
            <ul className="chat-board">
                { messageHistory.map(({ time, userName, text }, index) =>
                    <li key={time + index}>
                        <span>{ time }</span>
                        <span>{ userName }</span>
                        <span>{ text }</span>
                    </li>
                ) }
            </ul>
        );
    }
}
