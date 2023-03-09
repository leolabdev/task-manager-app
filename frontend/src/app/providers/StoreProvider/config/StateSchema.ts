import { UserSchema } from "@/entities/User";
import {LoginSchema, RegisterSchema} from "@/features/AuthByUsername";
import {categoriesApi} from "@/entities/Category";
import {tasksApi} from "@/entities/Task";


export interface StateSchema {
    user: UserSchema;
    loginForm?: LoginSchema;
    registerForm?: RegisterSchema;
    [categoriesApi.reducerPath]: ReturnType<typeof categoriesApi.reducer>;
    [tasksApi.reducerPath]: ReturnType<typeof tasksApi.reducer>;
}
