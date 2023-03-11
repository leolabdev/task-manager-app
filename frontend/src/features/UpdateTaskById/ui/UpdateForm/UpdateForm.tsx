import {FC} from 'react';
import {Field, Form, Formik} from 'formik';
import {ITaskUpdate, TaskPriority, useGetTasksQuery, useUpdateTaskMutation} from '@/entities/Task';
import {Select} from '@/shared/ui/Select/Select';
import {Input} from '@/shared/ui/Input/Input';
import {useGetCategoriesQuery} from '@/entities/Category';
import cls from './UpdateForm.module.scss';
import {Button, ButtonTheme} from "@/shared/ui/Button/Button";
import {object,string,date} from 'yup';
import {UpdateTaskSchema} from "../../model/types/UpdateTaskSchema";


interface UpdateTaskFormProps {
    taskId: string;
    onSubmit?: () => void;
}

interface TextAreaInputProps {
    field: any;
    form: any;
    value: string;
}

const UpdateTaskValidation = object().shape({
    title: string().min(3).required('Title is required'),
    description: string().max(200, 'Description is too long, max 200 symbols'),
    taskCategory: string().required('Task category is required'),
    deadlineTime: date().required('Deadline time is required'),
    priority: string().required('Priority is required'),
});


export const UpdateTaskForm: FC<UpdateTaskFormProps> = ({taskId, onSubmit,}) => {
    const {data: tasks} = useGetTasksQuery();
    const task = tasks?.find((task) => task._id === taskId);
    const {data: allCategories} = useGetCategoriesQuery();

    const [updateTask, {error ,isError} ] = useUpdateTaskMutation();

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
            if (!isError) {
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
            <Formik
                initialValues={prevValues || {} as UpdateTaskSchema}
                onSubmit={handleUpdateTask}
                validationSchema={UpdateTaskValidation}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className={cls.updateForm__input}>
                            <label htmlFor="title">Title</label>
                            <Field name="title" as={Input}/>
                            {errors.title && touched.title && <div className={cls.updateForm__error}>{errors.title}</div>}
                        </div>

                        <div className={cls.updateForm__input}>
                            <label htmlFor="description">Description</label>
                            <Field
                                name="description"
                                as={TextAreaInput}
                            />
                            {errors.description && touched.description && <div className={cls.updateForm__error}>{errors.description}</div>}
                        </div>

                        <div className={cls.updateForm__input}>
                            <label htmlFor="taskCategory">Task Category</label>
                            <Field
                                name="taskCategory"
                                as={Select}
                                options={categoriesForSelect || []}
                            />
                            {errors.taskCategory && touched.taskCategory && <div className={cls.updateForm__error}>{errors.taskCategory}</div>}
                        </div>

                        <div className={cls.updateForm__input}>
                            <label htmlFor="deadlineTime">Deadline Time</label>
                            <Field
                                name="deadlineTime"
                                as={Input}
                                type="date"
                                min={new Date().toISOString().split('T')[0]}
                            />
                            {errors.deadlineTime && touched.deadlineTime && <div className={cls.updateForm__error}>{errors.deadlineTime}</div>}
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
                            {errors.priority && touched.priority && <div className={cls.updateForm__error}>{errors.priority}</div>}
                        </div>

                        {isError && <div className={cls.updateForm__error}>Error updating task</div>}

                        <Button theme={ButtonTheme.OUTLINE} className={cls.updateForm__submit} type="submit">Update</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );



};



