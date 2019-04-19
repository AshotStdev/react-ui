import { Grid, Cell } from '../../src/Components';

import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, text, number } from '@storybook/addon-knobs';

const stories = storiesOf('Components', module);

stories.addDecorator(withKnobs).addDecorator(jsxDecorator);

stories.add('Grid', () => (
    <div>
        <Grid
            className={text('className', 'custom-class')}
        >
            {Array.from(Array(12)).map((_, i) => <Cell key={i} size={number('size', 1)}><span>Grid item</span></Cell>)}
        </Grid>
    </div>
));