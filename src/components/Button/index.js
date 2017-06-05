import React, { Component } from 'react';
import classnames from 'classnames';

import './styles.css';

export default class Button extends Component {
    render() {
        const {
            clickHandler,
            value,
            tabIndex,
            isDisabled } = this.props;

        return (
            <button className={ classnames('button', { 'button_disabled': isDisabled }) }
                onClick={ clickHandler }
                tabIndex={ tabIndex }
                disabled={ isDisabled }>
                { value }
            </button>
        );
    }
}
