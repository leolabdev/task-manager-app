import {Document, ObjectId, Schema} from "mongoose";


interface ITaskCategory extends Document {
    _id?: ObjectId;
    taskCategoryName: string;
    user: Schema.Types.ObjectId;
    tasks?: Schema.Types.ObjectId[];
}

interface ICreateTaskCategory extends Pick<ITaskCategory, 'taskCategoryName'>{}

interface ICreateTaskCategoryWithUserId extends ICreateTaskCategory, Pick<ITaskCategory, 'user'>{}

interface IUpdateTaskCategory extends Pick<ITaskCategory, '_id' | 'taskCategoryName'>{}

interface IDeleteTaskCategory extends Pick<ITaskCategory, '_id'>{}


export { ITaskCategory,ICreateTaskCategory,IUpdateTaskCategory,IDeleteTaskCategory,ICreateTaskCategoryWithUserId}
