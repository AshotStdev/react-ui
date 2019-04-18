import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Radio = ({disabled, text, value, checked, onChange, className, name, theme, ...props}) => {
    return (
        <label className={`${className} ui-radio ui-radio-${theme}`}>
            <span className={cn({'ui-radio-disabled-label': disabled})}>{text}</span>
            <input
                {...props}
                disabled={disabled}
                aria-checked={checked}
                checked={checked}
                type='radio'
                name={name}
                onChange={(e) => onChange(e.target.name, e.target.value, e.target.checked)}
            />
            <span className={cn('ui-radio-checkmark', {'checked': checked})}/>
        </label>
    );
};

Radio.defaultProps = {
    className: '',
    theme: 'blue',
    checked: false
};

Radio.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    text: PropTypes.string,
    theme: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
    ])
};

Radio.contextTypes = {
    radioGroup: PropTypes.object,
};

export default Radio;
