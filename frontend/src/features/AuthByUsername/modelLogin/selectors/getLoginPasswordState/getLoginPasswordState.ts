import { createSelector } from "@reduxjs/toolkit";
import { getLoginState } from "../getLoginState/getLoginState";
import { LoginSchema } from "../../types/loginSchema";

export const getLoginPasswordState = createSelector(
  getLoginState,
  (loginForm: LoginSchema) => loginForm.password
);
