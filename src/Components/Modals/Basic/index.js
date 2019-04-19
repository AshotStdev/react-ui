import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

class BasicModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.open !== state.open) {
            return {
                open: props.open,
            };
        }
        return null;
    }

    handleClickOutOfModal = () => {
        this.setState({
            open: false,
        }, () => {
            if (this.props.onClose) {
                this.props.onClose();
            }
        });
    };

    render() {
        const {open} = this.state;
        const {
            className,
            children,
            title,
            description,
            action
        } = this.props;

        if (!open) {
            return null;
        }

        let node = document.getElementById('dialog-modals');
        if (!node) {
            node = document.createElement('div');
            node.id = 'dialog-modals';
            document.body.appendChild(node);
        }

        const modal = (
            <div className='ui-basic-modal'>
                <div
                    role='presentation'
                    className='ui-modal-background'
                    onClick={this.handleClickOutOfModal}
                />
                <div className='ui-basic-modal-container'>
                    <div className={`${className} ui-basic-modal-wrapper`}>
                        {
                            (title || description) &&
                            <div className='ui-basic-modal-header'>
                                {
                                    title &&
                                    <div className='ui-basic-modal-title'>
                                        {title}
                                    </div>
                                }
                                {
                                    description &&
                                    <div
                                        dangerouslySetInnerHTML={{__html: description}}
                                        className='ui-basic-modal-description'
                                    />
                                }
                            </div>
                        }
                        {
                            children &&
                            <div className='ui-basic-modal-body'>
                                <div className='ui-basic-modal-outer'>
                                    {children}
                                </div>
                            </div>
                        }
                        <div className='ui-basic-modal-footer self-end flex-1 flex justify-end items-end mt-6'>
                            {action && <div>{action}</div>}
                        </div>
                    </div>
                </div>
            </div>
        );

        return ReactDOM.createPortal(
            modal,
            node
        );
    }
}

BasicModal.defaultProps = {
    className: ''
};

BasicModal.propTypes = {
    className: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.any,
    title: PropTypes.string,
    description: PropTypes.string,
    action: PropTypes.array,
    width: PropTypes.string
};

export default BasicModal;
