import {Document } from "mongoose";


interface ITask extends Document {
    // _id?: ObjectId;
    username: string;
    password: string;
    role: string;
    // user: IUser;
    // email?: string;
    // __v?: number;
}

interface ICreateTask {
    username: string;
    password: string;
}

interface IUpdateTask {
    id: string;
    username: string;
    password: string;
}



export { ITask,ICreateTask,IUpdateTask }
