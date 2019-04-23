import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import { events, autoPrefix, dissoc } from '../../Utils';

const defaults = {
    centered: false,
    className: '',
    multiple: true,
    passThrough: true,
    spread: 2
};

const rippleWrapper = (options = {}) => {
    const {
        centered: defaultCentered,
        className: defaultClassName,
        multiple: defaultMultiple,
        passThrough: defaultPassThrough,
        spread: defaultSpread,
        ...props
    } = {...defaults, ...options};

    return (ComposedComponent) => {
        class RippledComponent extends Component {
            static propTypes = {
                children: PropTypes.node,
                disabled: PropTypes.bool,
                onMouseDown: PropTypes.func,
                onRippleEnded: PropTypes.func,
                onTouchStart: PropTypes.func,
                ripple: PropTypes.bool,
                rippleCentered: PropTypes.bool,
                rippleClassName: PropTypes.string,
                rippleMultiple: PropTypes.bool,
                rippleSpread: PropTypes.number
            };

            static defaultProps = {
                disabled: false,
                ripple: true,
                rippleCentered: defaultCentered,
                rippleClassName: defaultClassName,
                rippleMultiple: defaultMultiple,
                rippleSpread: defaultSpread
            };

            state = {
                ripples: {}
            };

            rippleNodes = {};

            componentDidUpdate(prevProps, prevState) {
                if (Object.keys(prevState.ripples).length < Object.keys(this.state.ripples).length) {
                    this.addRippleRemoveEventListener(this.getLastKey());
                }
            }

            componentWillUnmount() {
                Object.keys(this.state.ripples).forEach((key) => {
                    this.state.ripples[key].endRipple();
                });
            }

            getDescriptor(x, y) {
                const {left, top, height, width} = ReactDOM.findDOMNode(this).getBoundingClientRect();
                const {rippleCentered: centered, rippleSpread: spread} = this.props;

                return {
                    left: centered ? 0 : x - left - (width / 2),
                    top: centered ? 0 : y - top - (height / 2),
                    width: width * spread,
                };
            }

            getNextKey() {
                this.currentCount = this.currentCount ? this.currentCount + 1 : 1;
                return `ripple${this.currentCount}`;
            }

            getLastKey() {
                return `ripple${this.currentCount}`;
            }

            doRipple = () => (!this.props.disabled && this.props.ripple);

            handleMouseDown = (event) => {
                if (this.props.onMouseDown) this.props.onMouseDown(event);

                if (this.doRipple()) {
                    const {x, y} = events.getMousePosition(event);
                    this.animateRipple(x, y, false);
                }
            };

            handleTouchStart = (event) => {
                if (this.props.onTouchStart) this.props.onTouchStart(event);
                if (this.doRipple()) {
                    const {x, y} = events.getTouchPosition(event);
                    this.animateRipple(x, y, true);
                }
            };

            rippleShouldTrigger(isTouch) {
                const shouldStart = isTouch ? true : !this.touchCache;
                this.touchCache = isTouch;
                return shouldStart;
            }

            animateRipple(x, y, isTouch) {
                if (this.rippleShouldTrigger(isTouch)) {
                    const {top, left, width} = this.getDescriptor(x, y);
                    const noRipplesActive = Object.keys(this.state.ripples).length === 0;
                    const key = (this.props.rippleMultiple || noRipplesActive) ? this.getNextKey() : this.getLastKey();
                    const endRipple = this.addRippleDeactivateEventListener(isTouch, key);
                    const initialState = {active: false, restarting: true, top, left, width, endRipple};
                    const runningState = {active: true, restarting: false};

                    this.setState(state => ({
                        ripples: {...state.ripples, [key]: initialState},
                    }), () => {
                        if (this.rippleNodes[key]) this.rippleNodes[key].offsetWidth;

                        this.setState(state => ({
                            ripples: {
                                ...state.ripples,
                                [key]: Object.assign({}, state.ripples[key], runningState),
                            },
                        }));
                    });
                }
            }

            addRippleRemoveEventListener(rippleKey) {
                const self = this;
                const rippleNode = this.rippleNodes[rippleKey];
                events.addEventListenerOnTransitionEnded(rippleNode, function onOpacityEnd(e) {
                    if (e.propertyName === 'transform') {
                        if (self.props.onRippleEnded) self.props.onRippleEnded(e);
                        events.removeEventListenerOnTransitionEnded(self.rippleNodes[rippleKey], onOpacityEnd);
                        delete self.rippleNodes[rippleKey];
                        self.setState({ripples: dissoc(rippleKey, self.state.ripples)});
                    }
                });
            }

            addRippleDeactivateEventListener(isTouch, rippleKey) {
                const eventType = isTouch ? 'touchend' : 'mouseup';
                const endRipple = this.createRippleDeactivateCallback(eventType, rippleKey);
                document.addEventListener(eventType, endRipple);
                return endRipple;
            }

            createRippleDeactivateCallback(eventType, rippleKey) {
                const self = this;
                return function endRipple() {
                    document.removeEventListener(eventType, endRipple);
                    self.setState({
                        ripples: {
                            ...self.state.ripples,
                            [rippleKey]: Object.assign({}, self.state.ripples[rippleKey], {active: false}),
                        },
                    });
                };
            }

            renderRipple(key, className, {active, left, restarting, top, width}) {
                const shift = -width / 2;
                const scale = restarting ? 0 : 1;
                const transform = `translate3d(${shift + left}px, ${shift + top}px, 0) scale(${scale})`;
                const classNames = cn('ripple', {
                    ['rippleActive']: active,
                    ['rippleRestarting']: restarting,
                }, className);

                return (
                    <span key={key} data-react-ui="ripple" className="rippleWrapper" {...props}>
                        <span
                            className={classNames}
                            ref={(node) => {
                                if (node) this.rippleNodes[key] = node;
                            }}
                            style={autoPrefix({transform}, {width, height: width})}
                        />
                    </span>
                );
            }

            render() {
                const {children, disabled, ripple, rippleClassName, ...other} = this.props;
                const {ripples} = this.state;

                const childRipples = Object.keys(ripples).map(key => this.renderRipple(key, rippleClassName, ripples[key]));
                const childProps = {onMouseDown: this.handleMouseDown, onTouchStart: this.handleTouchStart, ...other};
                const finalProps = defaultPassThrough ? {...childProps, disabled} : childProps;
                const childElements = !ripple ? children : [children, childRipples];

                return React.createElement(ComposedComponent, finalProps, childElements);
            }
        }

        return RippledComponent;
    };
};

const Ripple = options => rippleWrapper({...options});

export default Ripple;
