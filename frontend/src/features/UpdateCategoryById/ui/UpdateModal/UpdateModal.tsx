import {memo} from "react";
import {classNames} from "@/shared/lib/classNames/classNames";
import {Modal} from "@/shared/ui/Modal/Modal";
import {UpdateCategoryForm} from "../UpdateForm/UpdateForm";

interface UpdateTaskModalProps {
    categoryId: string;
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}


export const UpdateCategoryModal = memo(
    ({ categoryId, className = "", isOpen, onClose }: UpdateTaskModalProps) => {
        return (
            <Modal
                className={classNames("", {}, [className])}
                isOpen={isOpen}
                onClose={onClose}
                lazy
            >
                <UpdateCategoryForm categoryId={categoryId}/>
            </Modal>
        );
    }
);



