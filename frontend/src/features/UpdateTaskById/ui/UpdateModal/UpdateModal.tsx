import {memo, useState} from "react";
import {classNames} from "@/shared/lib/classNames/classNames";
import {Modal} from "@/shared/ui/Modal/Modal";
import {Button, ButtonTheme} from "@/shared/ui/Button/Button";
import {UpdateTaskForm} from "@/features/UpdateTaskById/ui/UpdateForm/UpdateForm";

interface UpdateTaskModalProps {
    taskId: string;
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}


export const UpdateTaskModal = memo(
    ({ taskId, className = "", isOpen, onClose }: UpdateTaskModalProps) => {
        return (
            <Modal
                className={classNames("", {}, [className])}
                isOpen={isOpen}
                onClose={onClose}
                lazy
            >
                <UpdateTaskForm taskId={taskId}/>
            </Modal>
        );
    }
);



