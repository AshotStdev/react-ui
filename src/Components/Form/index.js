import React from 'react';
import PropTypes from 'prop-types';
import Switch from './Switch';
import Radio from './Radio';
import CheckBox from './CheckBox';

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
export { Switch, Radio, CheckBox };
export default Form;