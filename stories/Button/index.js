import { Button } from '../../src/Components';

import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';

const stories = storiesOf('Components', module);

stories.addDecorator(withKnobs).addDecorator(jsxDecorator);

const typeOptions = {
    Flat: 'flat',
    Raised: 'raised',
    Floating: 'floating'
};

const buttonStyleOptions = {
    Default: 'default',
    Primary: 'primary',
    Secondary: 'secondary',
    Info: 'info',
    Success: 'success',
    Warning: 'warning',
    Danger: 'danger'
};

stories.add('Buttons', () => (
    <Button
        text={text('text', 'Hello button')}
        type={select('type', typeOptions, 'flat')}
        buttonStyle={select('buttonStyle', buttonStyleOptions, 'primary')}
        className={text('className', 'custom-class')}
        disabled={boolean('disabled', false)}
    />
));