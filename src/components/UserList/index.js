import React, { Component } from 'react';
import './styles.css';

export default class UserList extends Component {
    render() {
        const { userList } = this.props;

        return (
            <ul className="user-list">
                { userList.map((userName, index) =>
                    <li key={userName + index}>
                        <span>{ userName }</span>
                    </li>
                ) }
            </ul>
        );
    }
}
