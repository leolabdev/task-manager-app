import Joi from "joi";
import {ICreateTask,IUpdateTask} from "../Task/task";
import {TaskPriorityEnum} from "@/types/schema-enums";


export function createTaskValidation(task: ICreateTask) {
    const schema = Joi.object<ICreateTask>({
        title: Joi.string().required(),
        description: Joi.string().min(3).max(500).allow("").optional(),
        taskCategory: Joi.string().required(),
        priority: Joi.string().valid(TaskPriorityEnum.low, TaskPriorityEnum.medium, TaskPriorityEnum.high).required(),
        deadlineTime: Joi.date().required(),
    });
    return schema.validate(task);
}

export function updateTaskValidation(task: IUpdateTask) {
    const schema = Joi.object<IUpdateTask>({
        _id: Joi.string().required(),
        title: Joi.string(),
        description: Joi.string().min(3).max(500).allow("").optional(),
        taskCategory: Joi.string(),
        priority: Joi.string().valid(TaskPriorityEnum.low, TaskPriorityEnum.medium, TaskPriorityEnum.high).required(),
        deadlineTime: Joi.date(),

    });
    return schema.validate(task);
}


