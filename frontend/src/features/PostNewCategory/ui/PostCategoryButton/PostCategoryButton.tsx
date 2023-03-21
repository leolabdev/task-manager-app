import {memo, ReactNode, useCallback, useEffect, useState} from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import {PostCategoryModal} from "../PostModal/PostModal";


interface PostTaskButtonProps {
    className?: string;
    children : ReactNode;
}

export const PostCategoryButton = memo(({className, children='Add new Category' }: PostTaskButtonProps) => {

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
            <span>{children}</span>
        </Button>
        <PostCategoryModal isOpen={isModalOpen} onClose={onCloseModal} />
    </>
)
});
