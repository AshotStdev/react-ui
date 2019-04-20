import { Avatar, Icon } from '../../src/Components';

import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Components', module);

stories.addDecorator(withKnobs).addDecorator(jsxDecorator);

stories.add('Avatars', () => (
    <div>
        <Avatar style={{backgroundColor: 'deepskyblue'}} icon="react" />
        <Avatar icon="github-circle"/>
        <Avatar style={{backgroundColor: 'yellowgreen'}}><Icon type="slack"/></Avatar>
    </div>
));