import {memo, useCallback, useEffect, useState} from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import {UpdateCategoryModal} from "../UpdateModal/UpdateModal";


interface UpdateTaskButtonProps {
    categoryId: string;
    className?: string;
}

export const UpdateCategoryButton = memo(({ categoryId, className }: UpdateTaskButtonProps) => {

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
            <span>Update Category</span>
        </Button>
        <UpdateCategoryModal categoryId={categoryId} isOpen={isModalOpen} onClose={onCloseModal} />
    </>
)
});
