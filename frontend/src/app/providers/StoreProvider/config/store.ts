import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { userReducer } from "@/entities/User";
import {loginReducer,registerReducer} from "@/features/AuthByUsername";
import { StateSchema } from "./StateSchema";

export function createReduxStore(initialState?: StateSchema) {

    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
        loginForm: loginReducer,
        registerForm: registerReducer,
    };

    return configureStore<StateSchema>({
        reducer: rootReducers,
        //only in dev mode
        devTools: import.meta.env.DEV,
        preloadedState: initialState,
    });
}
