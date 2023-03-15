import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Select, SelectTheme, SelectSize, ISelectOption } from './Select';

export default {
    title: 'shared/Select',
    component: Select,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Select>;

const options: Array<ISelectOption> = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
];

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    options,
};

export const Clear = Template.bind({});
Clear.args = {
    options,
    theme: SelectTheme.CLEAR,
};

export const ClearInverted = Template.bind({});
ClearInverted.args = {
    options,
    theme: SelectTheme.CLEAR_INVERTED,
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
    options,
    theme: SelectTheme.BACKGROUND_INVERTED,
};

export const SizeM = Template.bind({});
SizeM.args = {
    options,
    selectSize: SelectSize.M,
};

export const SizeL = Template.bind({});
SizeL.args = {
    options,
    selectSize: SelectSize.L,
};

export const SizeXL = Template.bind({});
SizeXL.args = {
    options,
    selectSize: SelectSize.XL,
};

export const Disabled = Template.bind({});
Disabled.args = {
    options,
    disabled: true,
};

export const CustomClassName = Template.bind({});
CustomClassName.args = {
    options,
    className: 'custom-class-name',
};
