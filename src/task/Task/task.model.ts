import mongoose, {Model} from "mongoose";
import {ITask} from "./task";



const taskSchema = new mongoose.Schema<ITask>({
    username: {
        required: true,
        unique: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
})



export const TaskModel: Model<ITask> = mongoose.model<ITask>("Task", taskSchema);

