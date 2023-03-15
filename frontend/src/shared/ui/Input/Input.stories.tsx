import React from 'react';
import { Input, InputTheme, InputSize } from './Input';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'shared/Input',
    component: Input,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    placeholder: 'Type something...',
};

export const Clear = Template.bind({});
Clear.args = {
    placeholder: 'Type something...',
    theme: InputTheme.CLEAR,
};

export const ClearInverted = Template.bind({});
ClearInverted.args = {
    placeholder: 'Type something...',
    theme: InputTheme.CLEAR_INVERTED,
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
    placeholder: 'Type something...',
    theme: InputTheme.BACKGROUND_INVERTED,
};

export const SizeM = Template.bind({});
SizeM.args = {
    placeholder: 'Type something...',
    inputSize: InputSize.M,
};

export const SizeL = Template.bind({});
SizeL.args = {
    placeholder: 'Type something...',
    inputSize: InputSize.L,
};

export const SizeXL = Template.bind({});
SizeXL.args = {
    placeholder: 'Type something...',
    inputSize: InputSize.XL,
};

export const Disabled = Template.bind({});
Disabled.args = {
    placeholder: 'Type something...',
    disabled: true,
};
