import {memo, ReactNode} from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import cls from "./ConfirmDialog.module.scss";

interface ConfirmDialogProps {
    title?: string;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    className?: string;
    children?: ReactNode;
}

export const ConfirmDialog = memo(
    ({
         title,
         message,
         confirmLabel = "Confirm",
         cancelLabel = "Cancel",
         isOpen,
         onConfirm,
         onCancel,
         className = "",
         children
     }: ConfirmDialogProps) => {
        return (
            <Modal
                className={classNames(cls.ConfirmDialog, {}, [className])}
        isOpen={isOpen}
        onClose={onCancel}
        lazy
        >
                {title && <div className={cls.title}>{title}</div>}
                {message && <div className={cls.message}>{message}</div>}
                {children && <div className={cls.children}>{children}</div>}
                <div className={cls.buttons}>
        <Button
            theme={ButtonTheme.OUTLINE}
        onClick={onCancel}
        className={cls.cancelButton}
            >
            {cancelLabel}
            </Button>
            <Button
        theme={ButtonTheme.PRIMARY}
        onClick={onConfirm}
        className={cls.confirmButton}
            >
            {confirmLabel}
            </Button>
            </div>
            </Modal>
    );
    }
);
