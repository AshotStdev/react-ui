import React from 'react';
import PropTypes from 'prop-types';
import ICONS from './Icons'

const defaultStyles = {
    userSelect: 'none',
    fill: 'currentColor',
    height: '1em',
    verticalAlign: 'middle',
    width: '1em'
};

function Svg({type, className, color, size, styles, viewBox, ...rest}) {
    const vb = viewBox || '0 0 24 24';

    return (
        ICONS[type] ?
        <svg
            className={className}
            focusable="false"
            style={{
                ...defaultStyles,
                color: color,
                fontSize: `${size}px`,
                ...styles
            }}
            viewBox={vb}
            {...rest}
        >
            <path d={ICONS[type]}/>
        </svg> : <span>Not found</span>
    );
}

Svg.propTypes = {
    type: PropTypes.string,
    color: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.number,
    styles: PropTypes.object,
    viewBox: PropTypes.string
};

Svg.defaultProps = {
    type: 'react',
    color: 'inherit',
    size: 24
};

export default Svg;