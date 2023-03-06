import {CallbackError, CallbackWithoutResultAndOptionalError, model, Model, Schema, Types} from "mongoose";
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

// Add pre middleware to the TaskCategory schema to update the user's taskCategories field
taskCategorySchema.pre('save', async function(next) {
    try {
        // Find the user by taskCategory's creator ID
        const user = await model(SchemaRelationsEnum.USER).findById(this.user);

        // Add the new taskCategory ID to the user's taskCategories array
        user.taskCategories.push(this._id);

        // Save the updated user
        await user.save();

        next();
    } catch (error: any) {
        next(error);
    }
});


taskCategorySchema.pre<ITaskCategory>("remove", async function (next) {

    try {
        // Remove the taskCategory ID from the user's taskCategories array
        await model(SchemaRelationsEnum.USER).findById(this.user)
            .updateOne({$pull: {taskCategories: this._id}});
        // Delete all the tasks associated with the deleted taskCategory document
        await model(SchemaRelationsEnum.TASK).deleteMany({ taskCategory: this._id });
        next();
    }
    catch (error:  any) {
        next(error);
    }
});



export const TaskCategoryModel: Model<ITaskCategory> = model<ITaskCategory>(SchemaRelationsEnum.TASK_CATEGORY, taskCategorySchema);


