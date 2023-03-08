import {ReactNode, useEffect, useLayoutEffect} from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    children: ReactNode;
    element?: HTMLElement;
}

//todo fix this to use wrapper from html directly
export const Portal = (props: PortalProps) => {
    const { children, element = document.body } = props;

    return createPortal(children, element);
};




