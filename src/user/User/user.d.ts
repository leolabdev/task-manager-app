import {Document } from "mongoose";


interface IUser extends Document {
    // _id?: ObjectId;
    username: string;
    password: string;
    role: string;
    // email?: string;
    // __v?: number;
}

interface ICreateUser {
    username: string;
    password: string;
}

interface IUpdateUser {
    id: string;
    username: string;
    password: string;
}



export { IUser,ICreateUser,IUpdateUser }
