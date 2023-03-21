import {memo, ReactNode, useCallback, useEffect, useState} from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import {PostTaskModal} from "../PostModal/PostModal";

interface PostTaskButtonProps {
    className?: string;
    children: ReactNode;
}

export const PostTaskButton = memo(({className, children = 'Add new task' }: PostTaskButtonProps) => {

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
            {children}
        </Button>
        <PostTaskModal  isOpen={isModalOpen} onClose={onCloseModal} />
    </>
)
});
