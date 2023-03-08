import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { AccordionSection, AccordionSectionProps } from "./AccordionSection";

export default {
    title: "shared/AccordionSection",
    component: AccordionSection,
} as Meta;

const Template: Story<AccordionSectionProps> = (args) => (
    <AccordionSection {...args}>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </AccordionSection>
);

export const Default = Template.bind({});

export const Collapsed = Template.bind({});
Collapsed.args = {
    isCollapsed: true,
};

export const WithTitle = Template.bind({});
WithTitle.args = {
    title: "Click to expand",
};

export const WithClassName = Template.bind({});
WithClassName.args = {
    className: "custom-class",
};

