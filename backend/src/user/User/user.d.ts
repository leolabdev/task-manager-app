import {ObjectId, Schema} from "mongoose";
import {UserRole} from "./userRole";


interface IUser {
    _id: ObjectId;
    username: string;
    password: string;
    role: UserRole;
    tasks: Schema.Types.ObjectId[];
    taskCategories: Schema.Types.ObjectId[];
    createdAt : Date;
    updatedAt : Date;
}

// interface IUserWithoutPassword {
//     _id: ObjectId;
//     username: string;
//     role: UserRole;
//     tasks: Schema.Types.ObjectId[];
//     taskCategories: Schema.Types.ObjectId[];
//     createdAt: Date;
//     updatedAt: Date;
// }

type IUserWithoutPassword = Omit<IUser , 'password'>

type ICreateUser = Pick<IUser, "username" | "password">;
//
type IUpdateUser = Pick<IUser, "_id" | "username" | "password" | "role"> & {};


export { IUser,ICreateUser,IUpdateUser,IUserWithoutPassword }
