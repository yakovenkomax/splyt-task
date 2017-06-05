import React, { Component } from 'react';
import './styles.css';

export default class UserList extends Component {
    render() {
        const { userList } = this.props;

        return (
            <div className="user-list">
                <div className="user-list__heading">Users:</div>
                <ul className="user-list__list">
                    { userList.map((userName, index) =>
                        <li className="user-list__item" key={userName + index}>
                            <span className="user-list__username">{ userName }</span>
                        </li>
                    ) }
                </ul>
            </div>
        );
    }
}
