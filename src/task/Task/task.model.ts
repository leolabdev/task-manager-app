import  {model,Model, Schema} from "mongoose";
import {ITask} from "./task";
import {SchemaRelationsEnum, TaskPriorityEnum} from "@/types/schema-enums";


const taskSchema = new Schema<ITask>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    taskCategory: {
        type: Schema.Types.ObjectId,
        ref: SchemaRelationsEnum.TASK_CATEGORY
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: SchemaRelationsEnum.USER
    },

    deadlineTime: {
        type: Date,
        required: true
    },

    priority: {
        type: String,
        enum: [TaskPriorityEnum.low, TaskPriorityEnum.medium, TaskPriorityEnum.high],
        default: TaskPriorityEnum.medium
    }

})


export const TaskModel: Model<ITask> = model<ITask>(SchemaRelationsEnum.TASK, taskSchema);

