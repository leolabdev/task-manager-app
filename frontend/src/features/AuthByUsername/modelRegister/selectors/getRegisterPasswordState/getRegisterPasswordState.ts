import { createSelector } from "@reduxjs/toolkit";
import { getRegisterState } from "../getRegisterState/getRegisterState";
import { RegisterSchema } from "../../types/registerSchema";

export const getRegisterPasswordState = createSelector(
    getRegisterState,
  (registerForm: RegisterSchema) => registerForm.password
);
