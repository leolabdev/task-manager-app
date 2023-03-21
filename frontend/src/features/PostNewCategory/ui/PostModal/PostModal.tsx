import {memo} from "react";
import {classNames} from "@/shared/lib/classNames/classNames";
import {Modal} from "@/shared/ui/Modal/Modal";
import {PostCategoryForm} from "../PostForm/PostForm";

interface PostTaskModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}


export const PostCategoryModal = memo(
    ({ className = "", isOpen, onClose }: PostTaskModalProps) => {
        return (
            <Modal
                className={classNames("", {}, [className])}
                isOpen={isOpen}
                onClose={onClose}
                lazy
            >
                <PostCategoryForm/>
            </Modal>
        );
    }
);



