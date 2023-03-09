import { useCallback, useEffect } from 'react';
import { useGetTasksQuery, useUpdateTaskMutation } from '@/entities/Task';
import { ActionWithConfirmDialog } from '@/shared/ui/ActionWithConfirmDialog/ActionWithConfirmDialog';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { resetCategories } from '@/entities/Category';
import ControllableForm from './ControllableForm';
import {string} from 'yup';

interface UpdateTaskButtonProps {
    taskId: string;
    className?: string;
}

const UpdateTaskForm = ({ onSubmit, initialValues }) => {
    const formFields = [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
        },
    ];

    const validationRules = {
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
    };

    return (
        <ControllableForm
            mutationFn={{
                formFields,
                validationRules,
                useMutation: useUpdateTaskMutation,
            }}
            onSubmit={onSubmit}
            initialValues={initialValues}
        />
    );
};

export const UpdateTaskButton = ({ taskId, className }: UpdateTaskButtonProps) => {
    const { data } = useGetTasksQuery();
    const task = data?.find((task) => task._id === taskId);
    const initialValues = task ? { title: task.title, description: task.description } : {};

    const [updateTask, { isLoading, isError }] = useUpdateTaskMutation();
    const handleUpdateTask = useCallback(
        async (formData) => {
            await updateTask({ ...task, ...formData });
            if (!isError) {
                // todo find a better way to reset the categories
                await resetCategories();
            }
        },
        [updateTask, task, isError]
    );

    useEffect(() => {
        isError && alert(isError);
    }, [isError]);

    const taskTitle = task ? task.title : '';

    return (
        <ActionWithDialog
            title={`Update Task: ${taskTitle}?`}
            message=""
            confirmLabel="Update"
            cancelLabel="Cancel"
            dialogChildren={
                <UpdateTaskForm onSubmit={handleUpdateTask} initialValues={initialValues} />
            }
            children={
                <Button theme={ButtonTheme.OUTLINE} className={className}>
                    Edit
                </Button>
            }
        />
    );
};
