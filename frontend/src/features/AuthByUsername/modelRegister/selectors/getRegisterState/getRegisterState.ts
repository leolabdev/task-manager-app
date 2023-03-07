import {StateSchema} from "@/app/providers/StoreProvider";

export const getRegisterState = (state: StateSchema) => state?.registerForm;
