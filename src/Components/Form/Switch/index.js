import React from 'react';
import PropTypes from 'prop-types';

const Switch = ({leftLabel, rightLabel, className, disabled, name, checked, theme, onChange, ...props}) => {
    return (
        <div className={`${className} ui-switch-containeer`}>
            {leftLabel && (
                <label htmlFor={name} className={`left-label ${disabled ? 'ui-switch-disabled' : ''}`}>
                    {leftLabel}
                </label>
            )}
            <label htmlFor={name} className='ui-switch'>
                <input
                    {...props}
                    id={name}
                    type='checkbox'
                    disabled={disabled}
                    value={checked}
                    checked={checked}
                    onChange={(e) => {
                        onChange(name, e.target.checked);
                    }}
                />
                <span className={`ui-switch-slider ui-switch-slider-${theme}`}/>
            </label>
            {rightLabel && (
                <label htmlFor={name} className={`right-label ${disabled ? 'ui-switch-disabled' : ''}`}>
                    {rightLabel}
                </label>
            )}
        </div>
    );
};

Switch.defaultProps = {
    className: ''
};

Switch.propTypes = {
    leftLabel: PropTypes.string,
    rightLabel: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    theme: PropTypes.oneOf(['blue', 'red']),
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onChange: PropTypes.func
};

export default Switch;