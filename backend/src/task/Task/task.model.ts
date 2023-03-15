import  {model,Model, Schema} from "mongoose";
import {ITask} from "./task";
import {SchemaRelationsEnum, TaskPriorityEnum} from "@/types/schema-enums";
import {TaskCategoryModel} from "@/taskCategory/TaskCategory/taskCategory.model";


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
        enum: [...Object.values(TaskPriorityEnum)],
        default: TaskPriorityEnum.medium
    }
});


taskSchema.pre<ITask>("save", async function (next) {
    try {
        // Update the user's tasks array
        await model(SchemaRelationsEnum.USER)
            .findByIdAndUpdate(this.user, {$push: {tasks: this._id}}).exec();

        // Update the task category's tasks array
        await model(SchemaRelationsEnum.TASK_CATEGORY)
            .findByIdAndUpdate(this.taskCategory, {$push: {tasks: this._id}}).exec();
        next();
    } catch (error:  any) {
        next(error);
    }
});

taskSchema.pre<ITask>("remove", async function (next) {
    try {

        await model(SchemaRelationsEnum.USER).findById(this.user)
            .updateOne({$pull: {tasks: this._id}});

        // Update the task category's tasks array
        await model(SchemaRelationsEnum.TASK_CATEGORY).findById(this.taskCategory)
            .updateOne({$pull: {tasks: this._id}})
            // .exec();
        next();
    } catch (error:  any) {
        next(error);
    }
});


taskSchema.pre('findOneAndUpdate', async function (next) {
    try {
        // Get the conditions and update object from the query
        const { _id: taskId } = this.getQuery();
        const update = this.getUpdate();

        // Find the task document to get the old task category
        const task = await TaskModel.findById(taskId);
        // @ts-ignore
        const oldCategory = task.taskCategory.toString();

        // Only call the hook if the "taskCategory" field has been modified
        // @ts-ignore
        if (update && update.taskCategory && update.taskCategory.toString() !== oldCategory) {
            // Remove the task from the old task category's tasks array
            await model(SchemaRelationsEnum.TASK_CATEGORY).findByIdAndUpdate(oldCategory, { $pull: { tasks: taskId } });
            // Add the task to the new task category's tasks array
            // @ts-ignore
            await model(SchemaRelationsEnum.TASK_CATEGORY).findByIdAndUpdate(update.taskCategory.toString(), { $push: { tasks: taskId } });
        }
        next();
    } catch (error : any) {
        next(error);
    }
});




export const TaskModel: Model<ITask> = model<ITask>(SchemaRelationsEnum.TASK, taskSchema);

