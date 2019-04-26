import { CheckBox, Switch } from '../../../src/Components';

import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { jsxDecorator } from "storybook-addon-jsx";

const stories = storiesOf('Components/Form', module);

stories.addDecorator(withKnobs).addDecorator(jsxDecorator);

stories.add('CheckBox', () => (
    <CheckBox
        checked={boolean('checked', true)}
        deselect={boolean('deselect', true)}
        color={text('color', '#1EA7FD')}
        disabled={boolean('disabled', false)}
        text={text('text', 'Label text')}
        className={text('className', 'custom className')}
        name={text('name', 'checkbox_name')}
        onChange={ (...arg) => { console.log(arg); } }
    />
));
