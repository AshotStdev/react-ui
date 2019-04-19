import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Ripple from '../Ripple';

function Button({text, className, type, buttonStyle, disabled, href, component, ...props}) {
    let classNames = cn(
        'ui-button',
        {[`ui-button-${type}`]: type},
        {[`ui-button-${buttonStyle}`]: buttonStyle},
        className
    );

    const Component = component || (href ? 'a' : 'button');

    return (
        <Component
            className={classNames}
            disabled={disabled}
            href={href}
            {...props}
        >
            {text}
            {props.children}
        </Component>
    );
}

Button.defaultProps = {
    text: '',
    className: ''
};

Button.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.oneOf(['flat', 'raised', 'floating']),
    buttonStyle: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'success', 'warning', 'danger']),
    href: PropTypes.string,
    disabled: PropTypes.bool,
    component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
    ]),
    onClick: PropTypes.func
};

export default Ripple()(Button);