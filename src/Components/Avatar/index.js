import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Icon from '../Icon';

const Avatar = ({alt, children, className, cover, icon, image, title, ...other}) => (
    <div data-react-toolbox="avatar" className={cn('avatar', className)} {...other}>
        {children}
        {typeof image === 'string' ? <img alt={alt} src={image} title={title}/> : image}
        {typeof icon === 'string' ? <Icon type={icon} alt={alt}/> : icon}
    </div>
);

Avatar.propTypes = {
    alt: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

Avatar.defaultProps = {
    alt: ''
};

export default Avatar;