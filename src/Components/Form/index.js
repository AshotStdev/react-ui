import React from 'react';
import PropTypes from 'prop-types';
import Switch from './Switch';

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
export { Switch };
export default Form;