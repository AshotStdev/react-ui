import {Badge, Icon} from '../../src/Components';

import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('Components', module);

stories.addDecorator(withKnobs).addDecorator(jsxDecorator);

stories.add('Badges', () => (
    <div style={{marginTop: '30px'}}>
        <Badge content={54} color="primary" style={{marginRight: '15px'}}>
            <Icon type="facebook-messenger"/>
        </Badge>
        <Badge content={100} color="primary" style={{marginRight: '15px'}}>
            <Icon type="email"/>
        </Badge>
        <Badge content={25} color="secondary" style={{marginRight: '15px'}}>
            <Icon type="bell"/>
        </Badge>
        <Badge color="primary" variant="dot" style={{marginRight: '15px'}}>
            <Icon type="bell"/>
        </Badge>
        <Badge color="secondary" variant="dot" style={{marginRight: '15px'}}>
            <Icon type="bell"/>
        </Badge>
    </div>
));
