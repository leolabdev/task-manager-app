import {ReactNode, useEffect, useLayoutEffect, useState} from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    children: ReactNode;
    element?: HTMLElement;
    wrapperId?: string;
}





// // //todo for some reason storybook doesn't work with this correctly, it loozes styles
export const Portal = (props: PortalProps) => {

    const { children, element = document.body } = props;

    return createPortal(children, element);
};

// function createWrapperAndAppendToBody(wrapperId) {
//     const wrapperElement = document.createElement('div');
//     wrapperElement.setAttribute("id", wrapperId);
//     document.body.appendChild(wrapperElement);
//     return wrapperElement;
// }
//
// export const Portal = (props: PortalProps) => {
//     const [wrapperElement, setWrapperElement] = useState(null);
//
//     const { children, wrapperId  = "react-portal-wrapper" } = props;
//     useLayoutEffect(() => {
//         let element = document.getElementById(wrapperId);
//         let systemCreated = false;
//         // if element is not found with wrapperId or wrapperId is not provided,
//         // create and append to body
//         if (!element) {
//             systemCreated = true;
//             element = createWrapperAndAppendToBody(wrapperId);
//         }
//         setWrapperElement(element);
//
//         return () => {
//             // delete the programmatically created element
//             if (systemCreated && element.parentNode) {
//                 element.parentNode.removeChild(element);
//             }
//         }
//     }, [wrapperId]);
//
//     // wrapperElement state will be null on very first render.
//     if (wrapperElement === null) return null;
//
//     return createPortal(children, wrapperElement);
// };





