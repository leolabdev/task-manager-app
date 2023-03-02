import Joi from "joi";
import {ICreateUser, IUpdateUser} from "../User/user";
import {UserRole} from "@/user";

export function createUserValidation(user: ICreateUser){
    const schema = Joi.object<ICreateUser>({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });
    return schema.validate(user);
}


export function updateUserValidation(user: IUpdateUser){
    const schema = Joi.object<IUpdateUser>({
        username: Joi.string().alphanum().min(3).max(30),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        role: Joi.string().valid(... Object.values(UserRole))
    });
    return schema.validate(user);
}



export function getUserByUsernameValidation(username: string){
    const schema = Joi.string().alphanum().min(3).max(30).required()
        .error(new Error('Invalid username provided'));

    return schema.validate(username);
}


