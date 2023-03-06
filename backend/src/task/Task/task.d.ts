import {Document, ObjectId, Schema} from "mongoose";


interface ITask extends Document {
    _id?: ObjectId;
    title: string;
    description?: string;
    taskCategory: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    priority: string;
    deadlineTime: Date;
    // user: IUser;
    // email?: string;
    // __v?: number;
}

interface ICreateTask {
    title: string;
    description?: string;
    taskCategory: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    priority: string;
    deadlineTime: Date;
}

interface IUpdateTask {
    _id: string;
    title?: string;
    description?: string;
    taskCategory?: Schema.Types.ObjectId;
    priority?: string;
    deadlineTime?: Date;
}



export { ITask,ICreateTask,IUpdateTask }
