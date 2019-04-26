import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Icon from '../../Icon';

class Input extends Component {
    handleChange = event => {
        const {onChange, multiline, maxLength} = this.props;
        const valueFromEvent = event.target.value;

        const haveToTrim = (multiline && maxLength && event.target.value.length > maxLength);
        const value = haveToTrim ? valueFromEvent.substr(0, maxLength) : valueFromEvent;

        if (onChange) onChange(value, event);
    };

    handleKeyPress = event => {
        const {multiline, maxLength, onKeyPress} = this.props;

        if (multiline && maxLength) {
            const isReplacing = event.target.selectionEnd - event.target.selectionStart;
            const {value} = event.target;

            if (!isReplacing && value.length === maxLength) {
                event.preventDefault();
                event.stopPropagation();
                return undefined;
            }
        }

        if (onKeyPress) onKeyPress(event);

        return undefined;
    };

    render() {
        const {
            children, defaultValue, disabled, error, floating, placeHolder, icon,
            name, label: labelText, maxLength, multiline, required, role,
            type, value, onKeyPress, rows = 1, ...props
        } = this.props;
        const length = maxLength && value ? value.length : 0;
        const labelClassName = cn('label', {'fixed': !floating});

        const classNames = cn('ui-input', {
            'disabled': disabled,
            'hasError': error,
            'hidden': type === 'hidden',
            'withIcon': icon
        }, this.props.className);

        const inputElementProps = {
            ...props,
            className: cn('ui-input-element', {'filled': value || defaultValue}),
            onChange: this.handleChange,
            role,
            name,
            defaultValue,
            disabled,
            required,
            type,
            value
        };

        if (!multiline) {
            inputElementProps.maxLength = maxLength;
            inputElementProps.onKeyPress = onKeyPress;
        } else {
            inputElementProps.rows = rows;
            inputElementProps.onKeyPress = this.handleKeyPress;
        }

        return (
            <div data-react-toolbox="input" className={classNames}>
                {React.createElement(multiline ? 'textarea' : 'input', inputElementProps)}
                {icon ? <Icon className="icon" type={icon} styles={{color: 'rgba(33, 33, 33, 0.26)', width: '30px', height: '30px'}}/> : null}
                <span className="bar"/>
                {
                    labelText &&
                    <label className={labelClassName}>
                        {labelText}
                        {required ? <span className="required"> * </span> : null}
                    </label>
                }
                {placeHolder ? <span hidden={labelText} className="ui-placeholder">{placeHolder}</span> : null}
                {error ? <span className="error">{error}</span> : null}
                {
                    maxLength &&
                    <span className="counter">
                        {`${length}/${maxLength}`}
                    </span>
                }
                {children}
            </div>
        );
    }
}

Input.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    floating: PropTypes.bool,
    placeHolder: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    maxLength: PropTypes.number,
    multiline: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func,
    required: PropTypes.bool,
    role: PropTypes.string,
    rows: PropTypes.number,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object,
        PropTypes.string
    ])
};

Input.defaultProps = {
    className: '',
    placeHolder: '',
    disabled: false,
    floating: true,
    multiline: false,
    required: false,
    role: 'input',
    type: 'text'
};

export default Input;
