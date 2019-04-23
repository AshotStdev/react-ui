import { Chip } from '../../src/Components';
import ICONS from '../../src/Components/Icon/Icons';

import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';

const stories = storiesOf('Components', module);

stories.addDecorator(withKnobs).addDecorator(jsxDecorator);

const iconOptions = {};
const IconsList = Object.keys(ICONS);

iconOptions['None'] = null;

IconsList.forEach(val => {
    iconOptions[val] = val;
});

stories.add('Chips', () => (
    <Chip
        text={text('text', 'Lorem ipsum')}
        className={text('className', 'custom-class')}
        avatar={select('avatar', iconOptions, null)}
        deletable={boolean('deletable', true)}
        onDeleteClick={() => {console.log('Cheap delete function callback.')}}
    />
));
