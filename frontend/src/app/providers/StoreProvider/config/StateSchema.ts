import { UserSchema } from "@/entities/User";
import {LoginSchema, RegisterSchema} from "@/features/AuthByUsername";

export interface StateSchema {
    user: UserSchema;
    loginForm?: LoginSchema;
    registerForm?: RegisterSchema;
}
