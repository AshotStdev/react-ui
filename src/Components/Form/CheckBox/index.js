import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { Icon } from '../../';

const CheckBox = ({
   className, color, text, name, checked, onChange, disabled, deselect, ...rest
}) => {
   const iconName = deselect ? 'minus-box' : 'checkbox-marked';
   const outline = disabled ? iconName : 'checkbox-blank-outline';
   return (
      <label className={ ClassNames(
         className,
         'checkbox',
         {
            'checkbos-disabled': disabled,
         }) }
      >
         {text && (
            <span className='checkbox-label'>
               {text}
            </span>
         )}

         <input { ...rest } disabled={ disabled } type='checkbox' checked={ checked } onChange={ (e) => onChange(name, e.target.checked) } />
         <Icon
            color={color}
            type={ checked ? iconName : outline }
            className='checkbox-checkmark'
         />
      </label>
   );
};

CheckBox.defaultProps = {
   className: '',
};

CheckBox.propTypes = {
   className: PropTypes.string,
   deselect: PropTypes.bool,
   disabled: PropTypes.bool,
   text: PropTypes.string,
   checked: PropTypes.bool,
   onChange: PropTypes.func.isRequired,
   name: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
   ]),
};

CheckBox.displayName = 'CheckBox';

export default CheckBox;
