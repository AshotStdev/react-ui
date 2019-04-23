import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Icon from '../Icon';
import Avatar from '../Avatar';

const Chip = ({text, avatar, className, deletable, onDeleteClick, ...other}) => {
    const classes = cn('chip', {
        'deletable': deletable,
        'avatar': avatar
    }, className);

    let iconStyles = {
        width: '32px',
        height: '32px',
        lineHeight: '32px'
    };

    return (
        <div data-react-ui="chip" className={classes} {...other}>
            {
                avatar && <Avatar icon={avatar} iconStyles={iconStyles}/>
            }
            {text}
            {
                deletable && <span className="ui-chip-delete" onClick={onDeleteClick}>
                    <Icon type="close-circle" color="rgb(189, 189, 189)"/>
                </span>
            }
        </div>
    );
};

Chip.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    avatar: PropTypes.string,
    deletable: PropTypes.bool,
    onDeleteClick: PropTypes.func
};

Chip.defaultProps = {
    className: '',
    avatar: '',
    deletable: false
};

export default Chip;
