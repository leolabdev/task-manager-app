import {Document, ObjectId, Schema} from "mongoose";


interface ITaskCategory extends Document {
    _id?: ObjectId;
    taskCategoryName: string;
    user: Schema.Types.ObjectId;
    tasks?: Schema.Types.ObjectId[];
}

interface ICreateTaskCategory {
    taskCategoryName: string;
    user: Schema.Types.ObjectId;
    // tasks: Schema.Types.ObjectId[];
}

interface IUpdateTaskCategory {
    _id: string;
    taskCategoryName: string;
    // user: Schema.Types.ObjectId;
    // tasks: Schema.Types.ObjectId[];
}



export { ITaskCategory,ICreateTaskCategory,IUpdateTaskCategory}
