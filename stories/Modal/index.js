import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

import { Button, Modal } from '../../src/Components';

const stories = storiesOf('Components', module);

stories.addDecorator(withKnobs).addDecorator(jsxDecorator);

stories.add('Modal', () => (
    <div>
        <Modal
            open={boolean('open', true)}
            title={text('title', 'Lorem Ipsum')}
            description={text('description', 'What is Lorem Ipsum?')}
            onClose={() => {}}
            className={text('className', 'custom-class')}
            action={(
                [
                    <Button
                        text="Cancel"
                        type="flat"
                        buttonStyle="default"
                    />,
                    <Button
                        text="Save"
                        type="flat"
                        buttonStyle="danger"
                    />,
                ]
            )}
        >
            <div>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was popularised in
                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
            </div>
        </Modal>
    </div>
));
