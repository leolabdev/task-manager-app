import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {IUser, userActions} from '@/entities/User';
import {loginActions} from "../../slice/loginSlice";
import {object, string, ValidationError} from "yup";
import {categoriesApi, resetCategories, useGetCategoriesQuery} from "@/entities/Category";

const LoginByUsernameSchema = object().shape({
    username: string().required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(10, 'Username cannot exceed 10 characters')
        .matches(/^[a-zA-Z0-9]+$/, 'Username can only contain alphanumeric characters'),
    password: string().required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(30, 'Password cannot exceed 30 characters')
        .matches(/^[a-zA-Z0-9]+$/, 'Password can only contain alphanumeric characters'),
});

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<IUser, LoginByUsernameProps, { rejectValue: string}>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        try {
            // Validate authData using the LoginByUsernameSchema
            await LoginByUsernameSchema.validate(authData);

            const response = await axios.post<IUser>(`${import.meta.env.VITE_API}/login`, authData);

            if (!response.data) {
                throw new Error();
            }

            thunkAPI.dispatch(userActions.setAuthData(response.data));
            thunkAPI.dispatch(loginActions.clearForm());
            // @ts-ignore
            // await resetCategories();

            return response.data;
        } catch (e) {
            if (e instanceof ValidationError) {
                // If authData is not valid, return validation error using rejectWithValue
                return thunkAPI.rejectWithValue(e.errors[0]);
            }
            if (e.response && e.response.status === 400) {
                return thunkAPI.rejectWithValue(
                    'Invalid username or password'
                );
            }
            return thunkAPI.rejectWithValue('Server error, try again later');
        }
    },
);

