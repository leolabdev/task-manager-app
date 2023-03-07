import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import {StoreDecorator} from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { RegisterForm } from './RegisterForm';

export default {
    title: 'features/RegisterForm',
    component: RegisterForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof RegisterForm>;

const Template: ComponentStory<typeof RegisterForm> = (args) => <RegisterForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({
    registerForm: { username: '123', password: 'asd' },
})];

export const withError = Template.bind({});
withError.args = {};
withError.decorators = [StoreDecorator({
    registerForm: { username: '123', password: 'asd', error: 'ERROR' },
})];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [StoreDecorator({
    registerForm: { isLoading: true },
})];
