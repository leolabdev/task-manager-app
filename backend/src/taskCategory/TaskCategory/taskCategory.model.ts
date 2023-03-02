import  {model,Model, Schema} from "mongoose";
import {ITaskCategory} from "./taskCategory";
import {SchemaRelationsEnum} from "@/types/schema-enums";



const taskCategorySchema = new Schema<ITaskCategory>({
    taskCategoryName: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: SchemaRelationsEnum.USER,
        required: true
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: SchemaRelationsEnum.TASK,
        required: true
    }]
})





export const TaskCategoryModel: Model<ITaskCategory> = model<ITaskCategory>(SchemaRelationsEnum.TASK_CATEGORY, taskCategorySchema);

import {ITask} from "@/task";
// // Add the pre-delete middleware function to the category schema todo fix this any
// taskCategorySchema.pre('deleteOne', async function (next) {
//     const taskCategory = this;
//
//     // Find all tasks that reference the category being deleted
//     // const tasks = await model(SchemaRelationsEnum.TASK).find({ category: category._id });
//     const tasks: ITask[] = await model(SchemaRelationsEnum.TASK).find({ taskCategory: taskCategory._id });
//
//     // Delete all tasks that reference the category being deleted
//     await Promise.all(tasks.map(task => task.delete()));
//
//     next();
// });

// //TODO check it , if it works
// taskCategorySchema.pre('deleteOne', { document: true, query: false }, async function (next) {
//     const taskCategory = this;
//
//     try {
//         // Delete all tasks that reference the category being deleted
//         await model<ITask>(SchemaRelationsEnum.TASK).deleteMany({ taskCategory: taskCategory._id });
//         next();
//     } catch (error) {
//         next(error as Error);
//     }
// });
