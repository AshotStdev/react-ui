import React from 'react';
import PropTypes from 'prop-types';
import cn from "classnames";

export default function Cell({style, size, component: Component, children, className, ...props}) {
    if (typeof children === 'function') {
        return children({style, className});
    }

    let classNames = cn(
        'ui-cell',
        `ui-cell-${size}`,
        className
    );

    return (
        <Component
            {...props}
            style={style}
            className={classNames}
        >
            {children}
        </Component>
    );
}

Cell.defaultProps = {
    component: 'div',
    className: '',
    size: 1
};

Cell.propTypes = {
    size: PropTypes.number,
    style: PropTypes.object,
    children:  PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node,
    ]),
    className: PropTypes.string,
    component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
    ])
};