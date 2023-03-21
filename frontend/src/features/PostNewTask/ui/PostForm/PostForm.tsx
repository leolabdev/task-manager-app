import {FC} from 'react';
import {Field, Form, Formik} from 'formik';
import {ITaskCreate, TaskPriority, useCreateTaskMutation} from '@/entities/Task';
import {Select} from '@/shared/ui/Select/Select';
import {Input} from '@/shared/ui/Input/Input';
import {useGetCategoriesQuery} from '@/entities/Category';
import cls from './PostForm.module.scss';
import {Button, ButtonTheme} from "@/shared/ui/Button/Button";
import {object,string,date} from 'yup';
import {PostTaskSchema} from "../../model/types/PostTaskSchema";


interface PostTaskFormProps {
    onSubmit?: () => void;
}

interface TextAreaInputProps {
    field: any;
    form: any;
    value: string;
}

const PostTaskValidation = object().shape({
    title: string().min(3).required('Title is required'),
    description: string().max(200, 'Description is too long, max 200 symbols'),
    taskCategory: string().required('Task category is required'),
    deadlineTime: date().required('Deadline time is required'),
    priority: string().required('Priority is required'),
});


export const PostTaskForm: FC<PostTaskFormProps> = ({onSubmit}) => {
    const {data: allCategories , refetch} = useGetCategoriesQuery();

    const [createTask, { error, isError,isSuccess }] = useCreateTaskMutation();

    const categoriesForSelect = allCategories?.map((category) => ({
        label: category.taskCategoryName,
        value: category._id,
        key: category._id,
    }));

    const initialValues: PostTaskSchema = {
        // taskCategory: '',
        taskCategory: allCategories[0]._id,
        title: '',
        description: '',
        deadlineTime: '',
        priority: TaskPriority.low,
    };

    const TextAreaInput: FC<TextAreaInputProps> = ({ field, form, ...props }) => {
        return <textarea {...field} {...props} />;
    };


    const handlePostTask = async (values: PostTaskSchema) => {
        try {
            const taskCreate: ITaskCreate = {
                title: values.title,
                description: values.description,
                taskCategory: values.taskCategory,
                deadlineTime: values.deadlineTime,
                priority: values.priority,
            };
            await createTask(taskCreate);
            if (!isError) {
                refetch();
            }
            onSubmit && onSubmit();
        } catch (error) {
            alert(error);
            console.error(error);
        }
    };

    return (
        <div className={cls.PostForm}>
            {isSuccess && <div className={cls.postForm__success}>Task added successfully</div>}
            {isError && <div className={cls.postForm__error}>Error creating task</div>}
            <Formik
                initialValues={initialValues}
                onSubmit={handlePostTask}
                validationSchema={PostTaskValidation}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className={cls.postForm__input}>
                            <label htmlFor="title">Title</label>
                            <Field name="title" as={Input}/>
                            {errors.title && touched.title && <div className={cls.postForm__error}>{errors.title}</div>}
                        </div>

                        <div className={cls.postForm__input}>
                            <label htmlFor="description">Description</label>
                            <Field
                                name="description"
                                as={TextAreaInput}
                            />
                            {errors.description && touched.description && <div className={cls.postForm__error}>{errors.description}</div>}
                        </div>

                        <div className={cls.postForm__input}>
                            <label htmlFor="taskCategory">Task Category</label>
                            <Field
                                name="taskCategory"
                                as={Select}
                                options={categoriesForSelect || []}
                            />
                            {errors.taskCategory && touched.taskCategory && <div className={cls.postForm__error}>{errors.taskCategory}</div>}
                        </div>

                        <div className={cls.postForm__input}>
                            <label htmlFor="deadlineTime">Deadline Time</label>
                            <Field
                                name="deadlineTime"
                                as={Input}
                                type="date"
                                min={new Date().toISOString().split('T')[0]}
                            />
                            {errors.deadlineTime && touched.deadlineTime && <div className={cls.postForm__error}>{errors.deadlineTime}</div>}
                        </div>

                        <div className={cls.postForm__input}>
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
                            {errors.priority && touched.priority && <div className={cls.postForm__error}>{errors.priority}</div>}
                        </div>



                        <Button theme={ButtonTheme.OUTLINE} className={cls.postForm__submit} type="submit">Add</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );



};



