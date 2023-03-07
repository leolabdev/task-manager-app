import { createSelector } from "@reduxjs/toolkit";
import { getRegisterState } from "../getRegisterState/getRegisterState";
import { RegisterSchema } from "../../types/registerSchema";

export const getRegisterUsernameState = createSelector(
    getRegisterState,
  (registerForm: RegisterSchema) => registerForm.username
);
