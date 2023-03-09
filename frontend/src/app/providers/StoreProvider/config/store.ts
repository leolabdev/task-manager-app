import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { userReducer } from "@/entities/User";
import { loginReducer, registerReducer } from "@/features/AuthByUsername";
import { categoriesApi } from "@/entities/Category";
import { StateSchema } from "./StateSchema";
import {tasksApi} from "@/entities/Task";

export function createReduxStore(initialState?: StateSchema) {

    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
        loginForm: loginReducer,
        registerForm: registerReducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
    };

    return configureStore({
        reducer: rootReducers,
        //only in dev mode
        devTools: import.meta.env.DEV,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(categoriesApi.middleware, tasksApi.middleware),
    });
}

