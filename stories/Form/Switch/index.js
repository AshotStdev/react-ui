import { Switch } from '../../../src/Components';

import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withState } from '@dump247/storybook-state';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';

const stories = storiesOf('Components/Form', module);

stories.addDecorator(withKnobs).addDecorator(jsxDecorator);

const themeOptions = {
    blue: 'blue',
    pink: 'pink',
};

stories.add('Switch', withState({ checked: false })(({ store }) => (
    <Switch
        name={text('name', 'switch_name')}
        leftLabel={text('leftLabel', 'Left Label')}
        rightLabel={text('rightLabel', 'Right Label')}
        theme={select('theme', themeOptions, 'blue')}
        className={text('className', 'custom-class')}
        disabled={boolean('disabled', false)}
        checked={store.checked}
        onChange={(name, checked) => { store.set({ checked}); }}
    />
)));