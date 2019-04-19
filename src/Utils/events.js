export default {
    getMousePosition(event) {
        return {
            x: event.pageX - (window.scrollX || window.pageXOffset),
            y: event.pageY - (window.scrollY || window.pageYOffset),
        };
    },
    getTouchPosition(event) {
        return {
            x: event.touches[0].pageX - (window.scrollX || window.pageXOffset),
            y: event.touches[0].pageY - (window.scrollY || window.pageYOffset),
        };
    },
    addEventListenerOnTransitionEnded(element, fn) {
        const eventName = transitionEventNamesFor(element);
        if (!eventName) return false;
        element.addEventListener(eventName, fn);
        return true;
    },
    removeEventListenerOnTransitionEnded(element, fn) {
        const eventName = transitionEventNamesFor(element);
        if (!eventName) return false;
        element.removeEventListener(eventName, fn);
        return true;
    }
};

const TRANSITIONS = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
};

function transitionEventNamesFor(element) {
    return Object.keys(TRANSITIONS).reduce((result, transition) => (
        !result && (element && element.style[transition] !== undefined) ? TRANSITIONS[transition] : result
    ), null);
}