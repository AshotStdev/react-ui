import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import PropTypes from 'prop-types';

export default class Button extends Component {
    constructor(props) {
        super(props);

        this.state = {
            size: '88px',
            ripples: []
        };
    }

    createRipple = (e) => {
        const button = ReactDOM.findDOMNode(this);
        const size = Math.max(button.offsetWidth, button.offsetHeight) + 'px';

        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.width = size;
        ripple.style.height = size;

        button.insertBefore(ripple, button.firstChild);
        const {pageX, pageY} = e;

        setTimeout(() => {
            ripple.style.left = `${pageX - button.offsetLeft - ripple.offsetWidth / 2}px`;
            ripple.style.top = `${pageY - button.offsetTop - ripple.offsetHeight / 2}px`;
            ripple.classList.add('active');
        }, 1);
        return ripple;
    };

    handleMouseDown = (e) => {
        const {ripples} = this.state;
        ripples.push(this.createRipple(e));
    };

    handleMouseUp = () => {
        const lastRipple = this.state.ripples[0];
        lastRipple.classList.add('leave');
        setTimeout(() => {
            ReactDOM.findDOMNode(this).removeChild(lastRipple);
        }, 300);

        this.setState({ripples: this.state.ripples.slice(1, this.state.ripples.length)});
    };

    render() {
        let {text, className, type, buttonStyle, disabled, href, component, ...props} = this.props;

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
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                {...props}
            >
                {text}
            </Component>
        );
    }
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