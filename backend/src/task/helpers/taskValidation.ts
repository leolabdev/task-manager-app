import Joi from "joi";
import {ICreateTask,IUpdateTask} from "../Task/task";
import {TaskPriorityEnum} from "@/types/schema-enums";


export function createTaskValidation(task: ICreateTask) {
    const schema = Joi.object<ICreateTask>({
        title: Joi.string().required(),
        description: Joi.string().min(3).max(500).allow("").optional(),
        taskCategory: Joi.string().required(),
        user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        priority: Joi.string().valid(...Object.values(TaskPriorityEnum)).required(),
        deadlineTime: Joi.date().required(),
    });
    return schema.validate(task);
}

export function updateTaskValidation(task: IUpdateTask) {
    const schema = Joi.object<IUpdateTask>({
        _id: Joi.string().required(),
        title: Joi.string().optional(),
        description: Joi.string().min(3).max(500).allow("").optional(),
        taskCategory: Joi.string().optional(),
        priority: Joi.string().valid(...Object.values(TaskPriorityEnum)).optional(),
        deadlineTime: Joi.date().optional(),
    });
    return schema.validate(task);
}


