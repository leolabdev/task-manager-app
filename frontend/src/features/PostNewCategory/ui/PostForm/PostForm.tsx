import {FC, memo} from 'react';
import { Field, Form, Formik } from 'formik';
import {useCreateCategoryMutation} from '@/entities/Category';
import { Input } from '@/shared/ui/Input/Input';
import cls from './PostForm.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import {PostCategoryValidation, PostCategorySchema} from "../../model/types/PostCategorySchema";


interface PostCategoryFormProps {
    onSubmit?: () => void;
}

export const PostCategoryForm: FC<PostCategoryFormProps> = memo(({ onSubmit }) => {

    const [createCategory, {isError, isSuccess }] = useCreateCategoryMutation();

    const handlePostCategory = async (values: PostCategorySchema) => {
        try {
            await createCategory({ taskCategoryName: values.taskCategoryName });
            onSubmit && onSubmit();
        } catch (error) {
            alert(error);
            console.error(error);
        }
    };
    return (
        <div className={cls.PostForm}>
            {isSuccess && <div className={cls.postForm__success}>Category added successfully</div>}
            {isError && <div className={cls.postForm__error}>Error posting category</div>}
            <Formik initialValues={{ taskCategoryName: '' } as PostCategorySchema} onSubmit={handlePostCategory} validationSchema={PostCategoryValidation}>
                {({ errors, touched }) => (
                    <Form>
                        <div className={cls.postForm__input}>
                            <label htmlFor="taskCategoryName">Category Name</label>
                            <Field name="taskCategoryName" as={Input} />
                            {errors.taskCategoryName && touched.taskCategoryName && (
                                <div className={cls.postForm__error}>{errors.taskCategoryName}</div>
                            )}
                        </div>
                        <Button theme={ButtonTheme.OUTLINE} className={cls.postForm__submit} type="submit">
                            Add new
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
});
