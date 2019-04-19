import { Ripple } from '../../src/Components';

import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('Components', module);

stories.addDecorator(withKnobs).addDecorator(jsxDecorator);

const styles = {
    'width': '100px',
    'height': '100px',
    'position': 'relative',
    'border': '1px solid #ddd',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'cursor': 'pointer',
    'margin': '5px',
    'userSelect': 'none'
};

const OverflowComponent = (props) => (
    <div {...props} style={{...styles, 'overflow': 'hidden'}}>
        {props.children}
    </div>
);

const Component = (props) => (
    <div {...props} style={styles}>
        {props.children}
    </div>
);

const CenteredComponent = (props) => (
    <div {...props} style={{...styles, 'overflow': 'hidden'}}>
        {props.children}
    </div>
);

const RippleOverflowComponent = Ripple()(OverflowComponent);
const RippleComponent = Ripple()(Component);
const RippleCenteredComponent = Ripple({centered: true})(CenteredComponent);

stories.add('Ripple', () => (
    <div style={{display: 'flex'}}>
        <RippleOverflowComponent>
            Inner test
        </RippleOverflowComponent>
        <RippleComponent>
            Outer test
        </RippleComponent>
        <RippleCenteredComponent>
            Centered test
        </RippleCenteredComponent>
    </div>
));