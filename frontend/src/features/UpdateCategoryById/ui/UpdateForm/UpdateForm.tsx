import {FC, memo} from 'react';
import { Field, Form, Formik } from 'formik';
import { useGetCategoriesQuery, useUpdateCategoryMutation } from '@/entities/Category';
import { Input } from '@/shared/ui/Input/Input';
import cls from './UpdateForm.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import {UpdateCategoryValidation, UpdateCategorySchema} from "../../model/types/UpdateCategorySchema";


interface UpdateCategoryFormProps {
    categoryId: string;
    onSubmit?: () => void;
}

export const UpdateCategoryForm: FC<UpdateCategoryFormProps> = memo(({ categoryId, onSubmit }) => {
    const { data: allCategories } = useGetCategoriesQuery();
    const category = allCategories?.find((category) => category._id === categoryId);

    const [updateCategory, { error, isError,isSuccess }] = useUpdateCategoryMutation();

    const prevValues: UpdateCategorySchema | undefined = category
        ? {
            taskCategoryName: category.taskCategoryName,
        }
        : undefined;

    const handleUpdateCategory = async (values: UpdateCategorySchema) => {
        try {
            await updateCategory({ _id: categoryId, taskCategoryName: values.taskCategoryName });
            // if (!isError) {
            //   alert('Category updated successfully')
            // }
            onSubmit && onSubmit();
        } catch (error) {
            alert(error);
            console.error(error);
        }
    };

    return (
        <div className={cls.UpdateForm}>
            {isSuccess && <div className={cls.updateForm__success}>Category updated successfully</div>}
            <Formik initialValues={prevValues || {} as UpdateCategorySchema} onSubmit={handleUpdateCategory} validationSchema={UpdateCategoryValidation}>
                {({ errors, touched }) => (
                    <Form>
                        <div className={cls.updateForm__input}>
                            <label htmlFor="taskCategoryName">Category Name</label>
                            <Field name="taskCategoryName" as={Input} />
                            {errors.taskCategoryName && touched.taskCategoryName && (
                                <div className={cls.updateForm__error}>{errors.taskCategoryName}</div>
                            )}
                        </div>

                        {isError && <div className={cls.updateForm__error}>Error updating category</div>}

                        <Button theme={ButtonTheme.OUTLINE} className={cls.updateForm__submit} type="submit">
                            Update
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
});
