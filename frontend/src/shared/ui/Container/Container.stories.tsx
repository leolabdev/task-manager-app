import { Container } from './Container';

export default {
    title: 'shared/Container',
    component: Container,
};

const Template = (args) => (
    <Container {...args}>
        <div style={{ backgroundColor: 'yellow', width: '1000px !important'}}>
            This is an example child element.
        </div>
    </Container>
);

export const Default = Template.bind({});
Default.args = {};

export const Fluid = Template.bind({});
Fluid.args = {
    fluid: true,
};

export const CustomClassname = Template.bind({});
CustomClassname.args = {
    className: 'my-custom-classname',
};
