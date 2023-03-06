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
        // enum: [ UserRole.basic,UserRole.moderator, UserRole.admin], default: UserRole.basic
        enum: [ ...Object.values(UserRole)], default: UserRole.basic
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: SchemaRelationsEnum.TASK
    }],

    taskCategories: [{
        type: Schema.Types.ObjectId,
        ref: SchemaRelationsEnum.TASK_CATEGORY
    }],
}, {timestamps: true});

// userSchema.virtual('associatedTaskCategories', {
//     // ref: 'TaskCategory',
//     // localField: '_id',
//     // foreignField: 'user'
//
//     ref: SchemaRelationsEnum.TASK_CATEGORY,
//     localField: '_id',
//     foreignField: SchemaRelationsEnum.USER
// });



export const UserModel: Model<IUser> = model<IUser>(SchemaRelationsEnum.USER, userSchema);

