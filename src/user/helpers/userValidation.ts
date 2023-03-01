import Joi from "joi";
import {ICreateUser} from "../User/user";

export function createUserValidation(user: ICreateUser){
    const schema = Joi.object<ICreateUser>({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });
    return schema.validate(user);
}


export function updateUserValidation(user: ICreateUser){
    const schema = Joi.object<ICreateUser>({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });
    return schema.validate(user);
}


