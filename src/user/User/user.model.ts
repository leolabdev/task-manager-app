import {model, Model, Schema} from "mongoose";
import {IUser} from "./user";
import {UserRole} from "./userRole";
import {SchemaRelationsEnum} from "@/types/schema-enums";


const userSchema = new Schema<IUser>({
    username: {
        required: true,
        unique: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    role: {
        type: String,
        enum: [ UserRole.basic,UserRole.moderator, UserRole.admin], default: UserRole.basic
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: SchemaRelationsEnum.TASK
    }],

    taskCategories: [{
        type: Schema.Types.ObjectId,
        ref: SchemaRelationsEnum.TASK_CATEGORY
    }]

})



export const UserModel: Model<IUser> = model<IUser>(SchemaRelationsEnum.USER, userSchema);

