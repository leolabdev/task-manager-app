import {ReactNode, useCallback, useState} from 'react';
import {ConfirmDialog} from '@/shared/ui/ConfirmDialog/ConfirmDialog';
import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './ActionWithConfirmDialog.module.scss';

export interface ActionWithConfirmDialogProps {
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    onError?: (error: Error) => void;
    children: ReactNode;
    dialogChildren?: ReactNode;
}

export const ActionWithConfirmDialog = (props: ActionWithConfirmDialogProps) => {
    const {
        title = "Confirmation",
        message,
        confirmLabel = "Confirm",
        cancelLabel = "Cancel",
        onConfirm,
        onCancel,
        onError,
        children,
        dialogChildren
    } = props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = useCallback(async () => {
        setIsLoading(true);
        try {
            await onConfirm();
        } catch (error) {
            console.error('An error occurred', error);
            onError && onError(error);
        }
        setIsLoading(false);
        setIsDialogOpen(false);
    }, [onConfirm, onError]);

    const handleCancel = useCallback(() => {
        setIsDialogOpen(false);
        onCancel && onCancel();
    }, [onCancel]);

    const openDialog = useCallback(() => {
        setIsDialogOpen(true);
    }, []);

    return (
        <>
            <div className={classNames(cls.entity, {[cls.disabled]: isLoading})} onClick={openDialog}>
                {children}
            </div>
            <ConfirmDialog
                children={dialogChildren}
                title={title}
                message={message}
                confirmLabel={confirmLabel}
                cancelLabel={cancelLabel}
                isOpen={isDialogOpen}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                className={cls.confirmDialog}
            />
        </>
    );
};
