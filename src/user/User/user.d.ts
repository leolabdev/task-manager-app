import {Document, ObjectId, Schema} from "mongoose";
import {UserRole} from "@/user";


interface IUser extends Document {
    _id?: ObjectId;
    username: string;
    password: string;
    role: string;
    tasks: Schema.Types.ObjectId[];
    taskCategories: Schema.Types.ObjectId[];
    createdAt : Date;
    updatedAt : Date;
}

interface IUserWithoutPassword {
    id: string;
    username: string;
    role: UserRole;
    tasks: Schema.Types.ObjectId[];
    taskCategories: Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

interface ICreateUser {
    username: string;
    password: string;
}

interface IUpdateUser{
    id?: string;
    username: string;
    password: string;
    role: UserRole;
}

export { IUser,ICreateUser,IUpdateUser,IUserWithoutPassword }
