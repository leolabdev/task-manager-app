import Joi from "joi";
import {ICreateTask} from "../Task/task";


export function createTaskValidation(task: ICreateTask){
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });
    return schema.validate(task);
}


export function updateTaskValidation(task: ICreateTask){
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });
    return schema.validate(task);
}


