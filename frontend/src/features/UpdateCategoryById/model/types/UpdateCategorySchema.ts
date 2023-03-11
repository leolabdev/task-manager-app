import {object, string} from "yup";

export interface UpdateCategorySchema{
  taskCategoryName: string;
}

export const UpdateCategoryValidation = object().shape({
  taskCategoryName: string().min(3, 'at least 3 symbols').max(30,'max 30 symbols') .required('This field is required'),
});
