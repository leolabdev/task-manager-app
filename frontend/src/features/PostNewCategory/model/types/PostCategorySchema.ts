import {object, string} from "yup";

export interface PostCategorySchema {
  taskCategoryName: string;
}

export const PostCategoryValidation = object().shape({
  taskCategoryName: string().min(3, 'at least 3 symbols').max(30,'max 30 symbols') .required('This field is required'),
});
