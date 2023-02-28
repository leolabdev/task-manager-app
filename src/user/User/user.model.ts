import mongoose, {Model} from "mongoose";
import {IUser} from "./user";
import {UserRole} from "./userRole";
import {SchemaRelationsEnum} from "@/types/schema-relations-enum";


const userSchema = new mongoose.Schema<IUser>({
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
    }

})



export const UserModel: Model<IUser> = mongoose.model<IUser>(SchemaRelationsEnum.USER, userSchema);

