import { Icon } from '../../src/Components';
import ICONS from '../../src/Components/Icon/Icons';

import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, select, text, number, object } from '@storybook/addon-knobs';

const stories = storiesOf('Components', module);

stories.addDecorator(withKnobs).addDecorator(jsxDecorator);

const iconOptions = {};
const IconsList = Object.keys(ICONS);

IconsList.forEach(val => {
    iconOptions[val] = val;
});

stories.add('Icons', () => (
    <Icon
        type={select('type', iconOptions, 'react')}
        color={text('color', '#1EA7FD')}
        className={text('className', 'custom-class')}
        size={number('size', 50)}
        styles={object('styles', {backgroundColor: 'white'})}
        viewBox={text('viewBox', '')}
    />
));