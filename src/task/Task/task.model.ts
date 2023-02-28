import mongoose, {Model} from "mongoose";
import {ITask} from "./task";
import {SchemaRelationsEnum} from "@/types/schema-relations-enum";



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



export const TaskModel: Model<ITask> = mongoose.model<ITask>(SchemaRelationsEnum.TASK, taskSchema);

