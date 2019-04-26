import { Input } from '../../../src/Components';

import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withState } from '@dump247/storybook-state';
import { withKnobs, text, boolean, select, number } from '@storybook/addon-knobs';

import ICONS from '../../../src/Components/Icon/Icons';

const stories = storiesOf('Components/Form', module);

stories.addDecorator(withKnobs).addDecorator(jsxDecorator);

const iconOptions = {};
const IconsList = Object.keys(ICONS);

iconOptions['None'] = null;

IconsList.forEach(val => {
    iconOptions[val] = val;
});

stories.add('Input', withState({inputValue: ''})(({store}) => (
    <Input
        value={store.state.inputValue}
        type={text('type', 'text')}
        label={text('label', 'Label')}
        name={text('name', '')}
        placeHolder={text('placeHolder', '')}
        maxLength={number('maxLength', 16)}
        error={text('error', '')}
        floating={boolean('floating', true)}
        disabled={boolean('disabled', false)}
        multiline={boolean('multiline', false)}
        icon={select('icon', iconOptions, null)}
        onChange={value => {store.set({inputValue: value})}}
    />
)));
