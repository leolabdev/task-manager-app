import { UserSchema } from "@/entities/User";
import {LoginSchema, RegisterSchema} from "@/features/AuthByUsername";
import {categoriesApi} from "@/entities/Category";


export interface StateSchema {
    user: UserSchema;
    loginForm?: LoginSchema;
    registerForm?: RegisterSchema;
    [categoriesApi.reducerPath]: ReturnType<typeof categoriesApi.reducer>;
}
