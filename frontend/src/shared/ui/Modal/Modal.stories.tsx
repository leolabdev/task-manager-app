import React, {useState} from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Modal } from "./Modal";
import './Modal.module.scss'
import {AccordionSection} from "@/shared/ui/AccordionSection";

export default {
    title: "shared/Modal",
    component: Modal,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) =>{
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button onClick={() => setIsOpen(true)}>Click to open modal</button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                {args.children}
            </Modal>
        </>
    )
}

export const Primary = Template.bind({});
Primary.args = {
    isOpen: true,
    children:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid commodi consequatur eligendi impedit incidunt necessitatibus possimus quis saepe sunt totam.\n ",
};


export const PrimaryWithAccordionSection= Template.bind({});
PrimaryWithAccordionSection.args = {
    isOpen: true,
    children: <AccordionSection> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid commodi consequatur eligendi impedit incidunt necessitatibus possimus quis saepe sunt totam.</AccordionSection>

};
