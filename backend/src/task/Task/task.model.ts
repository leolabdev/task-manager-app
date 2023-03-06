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
            .exec();
        next();
    } catch (error:  any) {
        next(error);
    }
});


// taskSchema.pre<ITask>("findOneAndUpdate", async function (next) {
//     try {
//
//         // console.log("hello")
//         // console.log(this)
//         // if (this.isModified('taskCategory')) { // Only call the hook if the "taskCategory" field has been modified
//             // Remove the task from the old task category's tasks array
//             // await model(SchemaRelationsEnum.TASK_CATEGORY)
//             //     .findByIdAndUpdate(this.taskCategory, { $pull: { tasks: this._id } }).exec()
//             // ;
//             await model(SchemaRelationsEnum.TASK_CATEGORY).findById(this.taskCategory)
//             .updateOne({$pull: {tasks: this._id}})
//             .exec();;
//
//             // Add the task to the new task category's tasks array
//             await model(SchemaRelationsEnum.TASK_CATEGORY)
//             .findByIdAndUpdate(this.taskCategory, {$push: {tasks: this._id}})
//                 .exec();
//         // }
//
//         next();
//     } catch (error:  any) {
//         next(error);
//     }
// });


taskSchema.pre('findOneAndUpdate', async function (next) {
    try {
        // @ts-ignore
        const conditions = this._conditions;

        const oldTask = await model(SchemaRelationsEnum.TASK).findOne({tasks: conditions._id}).exec();
        const oldCategory = oldTask.taskCategory.toString();

        // @ts-ignore
        const updateTask = this._update;
        const updateCategory = updateTask.taskCategory.toString();
        console.log(oldCategory)
        console.log(updateCategory)

        // Only call the hook if the "taskCategory" field has been modified
        if (oldCategory !== updateCategory) {
            // Remove the task from the old task category's tasks array
            // await model(SchemaRelationsEnum.TASK_CATEGORY).findByIdAndUpdate(oldCategory, { $pull: { tasks: conditions._id } }).exec();
            //
            // // Add the task to the new task category's tasks array
            // await model(SchemaRelationsEnum.TASK_CATEGORY).findByIdAndUpdate(updateCategory, { $push: { tasks: conditions._id } }).exec();

            await model(SchemaRelationsEnum.TASK_CATEGORY).findById(oldCategory)
                .updateOne({$pull: {tasks: conditions._id}});

            await model(SchemaRelationsEnum.TASK_CATEGORY).findById(updateCategory)
                .updateOne({$push: {tasks: conditions._id}});

            // Update the task category's tasks array
            // await model(SchemaRelationsEnum.TASK_CATEGORY).findById(this.taskCategory)
            //     .updateOne({$pull: {tasks: this._id}})
            //     .exec();

        }


        next();
    } catch (error) {
        // @ts-ignore
        next(error);
    }
});




export const TaskModel: Model<ITask> = model<ITask>(SchemaRelationsEnum.TASK, taskSchema);

