import {Document, ObjectId, Schema} from "mongoose";

interface ITask extends Document {
    _id: ObjectId;
    title: string;
    description?: string;
    taskCategory: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    priority: string;
    deadlineTime: Date;
}

interface ICreateTask extends Omit<ITask, '_id'>{}


interface IUpdateTask extends Partial<ITask> {
    _id: ObjectId;
}

export { ITask,ICreateTask,IUpdateTask }
