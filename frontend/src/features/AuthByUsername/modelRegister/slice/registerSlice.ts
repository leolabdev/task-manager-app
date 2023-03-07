import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {registerByUsername} from "../services/registerByUsername/registerByUsername";
import { RegisterSchema } from "../types/registerSchema";

const initialState: RegisterSchema = {
  isLoading: false,
  username: "",
  password: "",
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    clearForm: (state) => {
      state.username = "";
      state.password = "";
      state.isLoading = false;
      state.error = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(registerByUsername.pending, (state) => {
          state.error = undefined;
          state.isLoading = true;
        })
        .addCase(registerByUsername.fulfilled, (state) => {
          state.isLoading = false;
        })
        .addCase(registerByUsername.rejected, (state, action) => {
          state.isLoading = false;
          // @ts-ignore
          state.error = action.payload;
        });
  },
});

// Action creators are generated for each case reducer function
export const { actions: registerActions } = registerSlice;
export const { reducer: registerReducer } = registerSlice;







