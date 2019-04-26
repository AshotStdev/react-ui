import { Radio } from '../../../src/Components';

import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { jsxDecorator } from "storybook-addon-jsx";

const stories = storiesOf('Components/Form', module);

stories.addDecorator(withKnobs).addDecorator(jsxDecorator);

const themeOptions = {
    blue: 'blue',
    red: 'red',
};

stories.add('Radio', () => (
    <Radio
        checked={boolean('checked', false)}
        disabled={boolean('disabled', false)}
        text={text('text', 'Label')}
        theme={select('theme', themeOptions, 'blue')}
        name={text('name', 'radio_name')}
        value={text('value', 'value')}
        onChange={ (...arg) => { console.log(arg); } }
    />
));
