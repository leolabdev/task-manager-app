import Joi from "joi";
import {
    ICreateTaskCategory,
    ICreateTaskCategoryWithUserId,
    IDeleteTaskCategory,
    IUpdateTaskCategory
} from "../TaskCategory/taskCategory";

export function createTaskCategoryValidation(taskCategory: ICreateTaskCategoryWithUserId){
    const schema = Joi.object<ICreateTaskCategoryWithUserId>({
        taskCategoryName: Joi.string().min(3).max(30).required(),
        user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    });
    return schema.validate(taskCategory);
}

export function updateTaskCategoryValidation(taskCategory: IUpdateTaskCategory){
    const schema = Joi.object<IUpdateTaskCategory>({
        _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        taskCategoryName: Joi.string().min(3).max(30).required(),
    });
    return schema.validate(taskCategory);
}

export function deleteTaskCategoryValidation(taskCategory: IDeleteTaskCategory){
    const schema = Joi.object<IDeleteTaskCategory>({
        _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    });
    return schema.validate(taskCategory);
}
