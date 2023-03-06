import {Document, ObjectId, Schema} from "mongoose";


interface ITaskCategory extends Document {
    _id?: ObjectId;
    taskCategoryName: string;
    user: Schema.Types.ObjectId;
    tasks?: Schema.Types.ObjectId[];
}


interface ICreateTaskCategory {
    taskCategoryName: string;
}

interface ICreateTaskCategoryWithUserId extends ICreateTaskCategory{
    user: Schema.Types.ObjectId;
}

interface IUpdateTaskCategory {
    _id: string;
    taskCategoryName: string;
    // user: Schema.Types.ObjectId;
    // tasks: Schema.Types.ObjectId[];
}

interface IDeleteTaskCategory {
    _id: string;
}



export { ITaskCategory,ICreateTaskCategory,IUpdateTaskCategory,IDeleteTaskCategory,ICreateTaskCategoryWithUserId}
