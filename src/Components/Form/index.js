import React from 'react';
import PropTypes from 'prop-types';
import Switch from './Switch';
import Radio from './Radio';
import Input from './Input';

const Form = ({children, errors}) => {
    return (
        <form>
            {children}
            {errors}
        </form>
    );
};

Form.propTypes = {
    children: PropTypes.element.isRequired,
    errors: PropTypes.object,
};
export { Switch, Radio, Input };
export default Form;
