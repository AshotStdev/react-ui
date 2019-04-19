import React from 'react';
import PropTypes from 'prop-types';
import cn from "classnames";

export default function Grid({style, component: Component, children, container, className, ...props}) {
    if (typeof children === 'function') {
        return children({style, className});
    }

    let classNames = cn(
        'ui-grid',
        {[container]: container},
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

Grid.defaultProps = {
    component: 'div',
    className: ''
};

Grid.propTypes = {
    style: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node,
    ]),
    className: PropTypes.string,
    container: PropTypes.string,
    component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
    ])
};