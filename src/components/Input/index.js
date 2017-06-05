import React, { Component } from 'react';
import classnames from 'classnames';

import './styles.css';

export default class Input extends Component {
    render() {
        const {
            multiline,
            isDisabled,
            placeholder,
            changeHandler,
            heyPressHandler,
            value,
            label,
            rows,
            tabIndex } = this.props;
        const InputTag = multiline === true ? 'textarea' : 'input';

        return (
            <label className="input">
                { label &&
                    <div className="input__label">
                        { label }
                    </div>
                }
                <InputTag className={ classnames('input__body', { 'input__body_disabled': isDisabled, 'input__body_multiline': multiline }) }
                    onChange={ changeHandler }
                    onKeyPress={ heyPressHandler }
                    tabIndex={ tabIndex }
                    disabled={ isDisabled }
                    placeholder={ placeholder }
                    value={ value }
                    rows={ rows }>
                </InputTag>
            </label>
        );
    }
}
