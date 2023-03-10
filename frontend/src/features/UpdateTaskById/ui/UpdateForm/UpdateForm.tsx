import {FC} from 'react';
import { Formik, Form, Field } from 'formik';
import { TaskPriority, useGetTasksQuery } from '@/entities/Task';
import { Select } from '@/shared/ui/Select/Select';
import { Input } from '@/shared/ui/Input/Input';
import { useGetCategoriesQuery } from '@/entities/Category';

interface UpdateTaskSchema {
    title: string;
    description?: string;
    taskCategory: {
        _id: string;
        taskCategoryName: string;
    };
    deadlineTime: string;
    priority: TaskPriority;
}

interface UpdateTaskFormProps {
    taskId: string;
    onSubmit?: (values: UpdateTaskSchema) => void;
}

interface TextAreaInputProps {
    field: any;
    form: any;
    value: string;
}

export const UpdateTaskForm: FC<UpdateTaskFormProps> = ({taskId, onSubmit,}) => {
    const { data: tasks } = useGetTasksQuery();
    const task = tasks?.find((task) => task._id === taskId);
    const { data: allCategories } = useGetCategoriesQuery();
    const categoriesForSelect = allCategories?.map((category) => ({
        label: category.taskCategoryName,
        value: category._id,
        key: category._id,
    }));

    const prevValues: UpdateTaskSchema | undefined = task
        ? {
            taskCategory: task.taskCategory,
            title: task.title,
            description: task.description,
            deadlineTime: task.deadlineTime,
            priority: task.priority,
        }
        : undefined;

    const TextAreaInput: FC<TextAreaInputProps> = ({field, form, value, ...props}) => {
        return <textarea {...field} {...props} value={value} />;
    };

    return (
        <Formik initialValues={prevValues || {} as UpdateTaskSchema} onSubmit={onSubmit}>
            {() => (
                <Form>
                    <div>
                        <label htmlFor="title">Title</label>
                        <Field name="title" as={Input} />
                    </div>

                    <div>
                        <label htmlFor="description">Description</label>
                        <Field
                            name="description"
                            as={TextAreaInput}
                            rows={4}
                            cols={30}
                            value={prevValues?.description || ''}
                        />
                    </div>

                    <div>
                        <label htmlFor="taskCategory">Task Category</label>
                        <Field
                            name="taskCategory"
                            as={Select}
                            options={categoriesForSelect || []}
                        />
                    </div>

                    <div>
                        <label htmlFor="deadlineTime">Deadline Time</label>
                        <Field
                            name="deadlineTime"
                            as={Input}
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div>
                        <label htmlFor="priority">Priority</label>
                        <Field
                            name="priority"
                            as={Select}
                            options={[
                                { value: TaskPriority.low, label: 'Low' },
                                { value: TaskPriority.medium, label: 'Medium' },
                                { value: TaskPriority.high, label: 'High' },
                            ]}
                        />
                    </div>

                    <button type="submit">Update</button>
                </Form>
            )}
        </Formik>
    );
};
