import {FC} from 'react';
import {Field, Form, Formik} from 'formik';
import {ITaskUpdate, TaskPriority, useGetTasksQuery, useUpdateTaskMutation} from '@/entities/Task';
import {Select} from '@/shared/ui/Select/Select';
import {Input} from '@/shared/ui/Input/Input';
import {resetCategories, useGetCategoriesQuery} from '@/entities/Category';
import cls from './UpdateForm.module.scss';
import {Button, ButtonTheme} from "@/shared/ui/Button/Button";


interface UpdateTaskSchema {
    _id?: string;
    title: string;
    description?: string;
    taskCategory?: string;
    deadlineTime: string;
    priority: TaskPriority;
}

interface UpdateTaskFormProps {
    taskId: string;
    onSubmit?: () => void;
}

interface TextAreaInputProps {
    field: any;
    form: any;
    value: string;
}

export const UpdateTaskForm: FC<UpdateTaskFormProps> = ({taskId, onSubmit,}) => {
    const {data: tasks} = useGetTasksQuery();
    const task = tasks?.find((task) => task._id === taskId);
    const {data: allCategories} = useGetCategoriesQuery();

    const [updateTask, {error}] = useUpdateTaskMutation();

    const categoriesForSelect = allCategories?.map((category) => ({
        label: category.taskCategoryName,
        value: category._id,
        key: category._id,
    }));

    const prevValues: UpdateTaskSchema | undefined = task
        ? {
            taskCategory: task.taskCategory._id,
            title: task.title,
            description: task.description,
            deadlineTime: task.deadlineTime,
            priority: task.priority,
        }
        : undefined;

    const TextAreaInput: FC<TextAreaInputProps> = ({ field, form, ...props }) => {
        return <textarea {...field} {...props} />;
    };


    const handleUpdateTask = async (values: UpdateTaskSchema) => {
        try {
            const taskUpdate: ITaskUpdate = {
                title: values.title,
                description: values.description,
                taskCategory: values.taskCategory,
                deadlineTime: values.deadlineTime,
                priority: values.priority,
            };
            await updateTask({taskId, task: taskUpdate});
            if (!error) {
                //todo fix this...
                window.location.reload();
            }
            onSubmit && onSubmit();
        } catch (error) {
            alert(error);
            console.error(error);
        }
    };



    return (
        <div className={cls.UpdateForm}>
        <Formik initialValues={prevValues || {} as UpdateTaskSchema} onSubmit={handleUpdateTask}>
            {() => (
                <Form>
                    <div className={cls.updateForm__input}>
                        <label htmlFor="title">Title</label>
                        <Field name="title" as={Input}/>
                    </div>

                    <div className={cls.updateForm__input}>
                        <label htmlFor="description">Description</label>
                        <Field
                            name="description"
                            as={TextAreaInput}
                            // value={prevValues?.description || ''}
                        />
                    </div>

                    <div className={cls.updateForm__input}>
                        <label htmlFor="taskCategory">Task Category</label>
                        <Field
                            name="taskCategory"
                            as={Select}
                            options={categoriesForSelect || []}
                        />
                    </div>

                    <div className={cls.updateForm__input}>
                        <label htmlFor="deadlineTime">Deadline Time</label>
                        <Field
                            name="deadlineTime"
                            as={Input}
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div className={cls.updateForm__input}>
                        <label htmlFor="priority">Priority</label>
                        <Field
                            name="priority"
                            as={Select}
                            options={[
                                {value: TaskPriority.low, label: 'Low'},
                                {value: TaskPriority.medium, label: 'Medium'},
                                {value: TaskPriority.high, label: 'High'},
                            ]}
                        />
                    </div>

                    <Button theme={ButtonTheme.OUTLINE} className={cls.updateForm__submit} type="submit">Update</Button>
                </Form>
            )}
        </Formik>
        </div>
    );


};



