import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

function Badge({content, children, className, color, component: Component, showZero, max, variant, ...other}) {
    const classNames = cn('ui-badge', {
        [`ui-badge-color-${color}`]: color !== 'default',
        'ui-badge-dot': variant === 'dot',
    });

    let displayValue = variant === 'dot' ? '' : (content > max ? `${max}+` : content);

    return (
        <Component className={cn('ui-badge-wrapper', className)} {...other}>
            {children}
            <span className={classNames}>{displayValue}</span>
        </Component>
    );
}

Badge.defaultProps = {
    color: 'default',
    component: 'span',
    max: 99,
    showZero: false,
    variant: 'standard'
};

Badge.propTypes = {
    content: PropTypes.number,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    color: PropTypes.oneOf(['default', 'primary', 'secondary']),
    component: PropTypes.node,
    max: PropTypes.number,
    showZero: PropTypes.bool,
    variant: PropTypes.oneOf(['standard', 'dot'])
};

export default Badge;
