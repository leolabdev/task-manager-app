import { classNames } from "@/shared/lib/classNames/classNames";
import {memo, MouseEvent, ReactNode, useCallback, useEffect, useRef, useState} from "react";
import { Portal } from "@/shared/ui/Portal/Portal";
import cls from "./Modal.module.scss";

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}
const ANIMATION_DELAY = 300;


/**
 The Modal component displays a modal dialog box on top of the current page.
 @param {object} props - The props object for the Modal component.
 @param {string} [props.className] - The optional CSS class name to apply to the Modal component.
 @param {ReactNode} [props.children] - The optional children of the Modal component.
 @param {boolean} [props.isOpen] - A boolean indicating whether the modal is currently open.
 @param {Function} [props.onClose] - The optional function to call when the modal is closed.
 @param {boolean} [props.lazy] - A boolean indicating whether to render the Modal lazily or not.
 @returns {JSX.Element|null} - The Modal component JSX or null if lazy and not mounted.
 */
export const Modal = memo((props: ModalProps) => {
    const { className='', children, isOpen, onClose , lazy} = props;

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isOpening, setIsOpening] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
      },
      [isOpen]);


    const closeHandler = useCallback(() => {
        if (onClose) {
            // needed for css close animation
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                // invoke callback
                onClose();
                // reset state
                setIsClosing(false);
                // needed for unmounting component
                setIsMounted(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeHandler();
            }
        },
        [closeHandler]
    );

    const onContentClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    // timeout is used to enable onMount animation
    useEffect(() => {
        if (isOpen) {
            timerRef.current = setTimeout(() => {
                setIsOpening(true);
            }, 0);
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            setIsOpening(false);
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);



    const mods: Record<string, boolean> = {
        [cls.isOpening]: isOpening,
        [cls.isClosing]: isClosing,
    };


    if(lazy && !isMounted) {
            return null;
        }


    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <div className={cls.overLay} onClick={closeHandler}>
                    <div className={cls.content} onClick={onContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
});


