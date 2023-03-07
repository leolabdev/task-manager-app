import { createSelector } from "@reduxjs/toolkit";
import { getLoginState } from "../getLoginState/getLoginState";
import { LoginSchema } from "../../types/loginSchema";

export const getLoginUsernameState = createSelector(
  getLoginState,
  (loginForm: LoginSchema) => loginForm.username
);
