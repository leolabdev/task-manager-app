import {memo, useCallback, useEffect} from 'react';
import {resetTasks, useDeleteTaskMutation, useGetTasksQuery} from '@/entities/Task';
import { ActionWithConfirmDialog } from '@/shared/ui/ActionWithConfirmDialog/ActionWithConfirmDialog';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import {resetCategories, useGetCategoriesQuery} from "@/entities/Category";

interface DeleteTaskButtonProps {
    taskId: string;
    className?: string;
}

export const DeleteTaskButton = memo(({ taskId, className }: DeleteTaskButtonProps) => {
    const [deleteTask, { error,isSuccess }] = useDeleteTaskMutation();
    const {refetch} = useGetCategoriesQuery();

    const { data } = useGetTasksQuery();

    const handleDeleteTask = useCallback(async () => {
        await deleteTask(taskId);
        if(!error) {
            refetch();
        }
    }, [deleteTask, taskId]);

    useEffect(() => {
        error && alert(error);
    }, [error]);



    const task = data?.find(task => task._id === taskId);
    const taskTitle = task ? task.title : '';


    return (
        <ActionWithConfirmDialog
            title={`Delete Task: ${taskTitle}?`}
            message="Are you sure you want to delete this task?"
            confirmLabel="Delete"
            cancelLabel="Cancel"
            onConfirm={handleDeleteTask}
            children={<Button theme={ButtonTheme.OUTLINE} className={className}>X</Button>}
            // dialogChildren={} here you can pass a custom dialog component
        />
    );
});
