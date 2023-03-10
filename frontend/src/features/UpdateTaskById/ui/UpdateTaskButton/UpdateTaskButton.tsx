import {memo, useCallback, useEffect, useState} from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import {UpdateTaskModal} from "@/features/UpdateTaskById/ui/UpdateModal/UpdateModal";

interface UpdateTaskButtonProps {
    taskId: string;
    className?: string;
}

export const UpdateTaskButton = memo(({ taskId, className }: UpdateTaskButtonProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const onCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

return (
    <>
        <Button theme={ButtonTheme.OUTLINE} className={className} onClick={onShowModal}>
            ⟳
        </Button>
        <UpdateTaskModal taskId={taskId} isOpen={isModalOpen} onClose={onCloseModal} />
    </>
)
});
