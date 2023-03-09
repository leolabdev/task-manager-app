import {useCallback, useEffect} from 'react';
import {useDeleteCategoryMutation, useGetCategoriesQuery} from '@/entities/Category';
import {ActionWithConfirmDialog} from '@/shared/ui/ActionWithConfirmDialog/ActionWithConfirmDialog';
import {Button, ButtonTheme} from "@/shared/ui/Button/Button";

interface DeleteCategoryProps {
    categoryId: string;
    className?: string;
}

export const DeleteCategoryButton = ({ categoryId, className}: DeleteCategoryProps) => {
    const [deleteCategory, {error }] = useDeleteCategoryMutation();
    const {data} = useGetCategoriesQuery();

    const category = data?.find(category => category._id === categoryId);
    const categoryName = category ? category.taskCategoryName : 'not found';

    const handleDeleteCategory = useCallback(async () => {
        await deleteCategory(categoryId);
    },[deleteCategory, categoryId]);

    useEffect(() => {error && alert(error) }, [error]);

    return (
        <ActionWithConfirmDialog
            title={`Delete Category: ${categoryName}?`}
            message="Are you sure you want to delete this category?"
            confirmLabel="Delete"
            cancelLabel="Cancel"
            onConfirm={handleDeleteCategory}
            children={<Button theme={ButtonTheme.OUTLINE} className={className}>Delete Category</Button>}
        />
    );

}
